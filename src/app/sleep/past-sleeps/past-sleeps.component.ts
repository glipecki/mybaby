import {Component, OnInit} from '@angular/core';
import {faBed} from '@fortawesome/free-solid-svg-icons/faBed';
import {faMoon} from '@fortawesome/free-solid-svg-icons/faMoon';
import {faQuestion} from '@fortawesome/free-solid-svg-icons/faQuestion';
import {faSun} from '@fortawesome/free-solid-svg-icons/faSun';
import {faVolleyballBall} from '@fortawesome/free-solid-svg-icons/faVolleyballBall';
import moment from 'moment';
import {Observable} from 'rxjs';
import {Sleep} from 'src/app/sleep/sleep';
import {SleepType} from 'src/app/sleep/sleep-type';
import {SleepService} from 'src/app/sleep/sleep.service';

@Component({
  selector: 'bb-past-sleeps',
  template: `
    <bb-list-with-day-grouping [data]="sleeps|async"
                               [dateExtractor]="sleepDateExtractor">
      <ng-template #header let-day>
        <div>{{day.dateString}}</div>
        <div class="stats">
          <div>
            <div></div>
            <div>sen nocny: {{day | sleepSumNightTime}}</div>
          </div>
          <div>
            <div>Σ snu: {{day | sleepSumTime}}</div>
            <div>Σ drzemek: {{day | sleepSumDayTime}}</div>
          </div>
        </div>
      </ng-template>
      <ng-template #rowsHeader>
        <div class="row">
          <div class="column"></div>
          <div class="column"></div>
          <div class="column">
            <fa-icon [icon]="faBed"></fa-icon>
          </div>
          <div class="column">
            <fa-icon [icon]="faVolleyballBall"></fa-icon>
          </div>
        </div>
      </ng-template>
      <ng-template #row let-row>
        <div class="row">
          <div class="column">{{row.startHour}} - {{row.endHour ? row.endHour : '...'}}</div>
          <div class="column">
            <fa-icon [icon]="iconBasedOnSleepType(row)"></fa-icon>
          </div>
          <div class="column">{{row.sleep?.text || '...'}}</div>
          <div class="column">{{row.activityBefore?.text  || '...'}}</div>
        </div>
      </ng-template>
    </bb-list-with-day-grouping>
  `,
  styleUrls: ['./past-sleeps.component.scss']
})
export class PastSleepsComponent implements OnInit {

  // noinspection JSUnusedGlobalSymbols - used by template
  readonly faBed = faBed;
  // noinspection JSUnusedGlobalSymbols - used by template
  readonly faVolleyballBall = faVolleyballBall;
  sleeps: Observable<Sleep[]>;
  sleepDateExtractor = (sleep: Sleep) => moment(sleep.start);

  constructor(private sleepService: SleepService) {
  }

  ngOnInit() {
    this.sleeps = this.sleepService.getSleeps();
  }

  iconBasedOnSleepType(row: Sleep) {
    if (row.type) {
      switch (row.type) {
        case SleepType.current:
          return faBed;
        case SleepType.day:
          return faSun;
        case SleepType.night:
          return faMoon;
      }
    }
    return faQuestion;
  }

}
