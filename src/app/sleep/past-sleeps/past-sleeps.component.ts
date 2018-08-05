import {Component, OnInit} from '@angular/core';
import moment from 'moment';
import {Sleep} from 'src/app/sleep/sleep';
import {SleepService} from 'src/app/sleep/sleep.service';

@Component({
  selector: 'bb-past-sleeps',
  template: `
    <div *ngFor="let sleepDay of sleeps" class="day-group">
      <div class="header">
        <div>
          {{sleepDay.date}}
        </div>
      </div>
      <div class="body">
        <div *ngFor="let sleep of sleepDay.sleeps; let index = index" class="sleep-row">
          <div class="sleep-number">{{sleepDay.sleeps.length - index}}.</div>
          <div>
            <div>{{sleep.startHour}} - {{sleep.endHour ? sleep.endHour : '...'}}</div>
            <div class="stats">
              <div *ngIf="sleep.sleep">Czas snu: {{sleep.sleep.text}}</div>
              <div *ngIf="sleep.activityBefore">Aktywność przed snem: {{sleep.activityBefore.text}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./past-sleeps.component.scss']
})
export class PastSleepsComponent implements OnInit {

  sleeps: { date: string, sleeps: Sleep[] }[] = [];

  constructor(private sleepService: SleepService) {
  }

  ngOnInit() {
    this.sleepService.getSleeps().subscribe(
      sleeps => {
        const groupByDate = sleeps.reduce(
          (prev, sleep) => {
            const day = moment(sleep.start).format('YYYY-MM-DD');
            return {
              ...prev,
              [day]: prev[day] ? [...prev[day], sleep] : [sleep]
            };
          },
          {}
        );
        this.sleeps = Object.keys(groupByDate)
          .map(key => ({
            date: key,
            sleeps: groupByDate[key]
          }));
      }
    )
  }

}
