import {Component, OnInit} from '@angular/core';
import moment from 'moment';
import {Observable} from 'rxjs';
import {Sleep} from 'src/app/sleep/sleep';
import {SleepService} from 'src/app/sleep/sleep.service';

@Component({
  selector: 'bb-past-sleeps',
  template: `
    <bb-list-with-day-grouping [data]="sleeps|async"
                               [dateExtractor]="sleepDateExtractor">
      <ng-template #header let-day>
        {{day.dateString}}
      </ng-template>
      <ng-template #row let-row>
        <div>{{row.startHour}} - {{row.endHour ? row.endHour : '...'}}</div>
        <div class="stats">
          <div *ngIf="row.sleep">Czas snu: {{row.sleep.text}}</div>
          <div *ngIf="row.activityBefore">Aktywność przed snem: {{row.activityBefore.text}}</div>
        </div>
      </ng-template>
    </bb-list-with-day-grouping>
  `,
  styleUrls: ['./past-sleeps.component.scss']
})
export class PastSleepsComponent implements OnInit {

  sleeps: Observable<Sleep[]>;
  sleepDateExtractor = (sleep: Sleep) => moment(sleep.start);

  constructor(private sleepService: SleepService) {
  }

  ngOnInit() {
    this.sleeps = this.sleepService.getSleeps();
  }

}
