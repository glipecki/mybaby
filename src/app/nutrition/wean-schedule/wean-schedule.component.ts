import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BabyWean} from '../../babies/baby-wean';
import {BabyService} from '../../babies/baby.service';

@Component({
  selector: 'bb-wean-schedule',
  template: `
    <div *ngIf="wean$ | async as wean">
      <div>Start: <input [value]="wean.scheduleConfig.start" /> min</div>
      <div>Step: <input [value]="wean.scheduleConfig.step" /> min</div>
      <div>Target: <input [value]="wean.scheduleConfig.target" /> min</div>
      <div>Aktywny: <input type="checkbox" [value]="wean.scheduleConfig.active" /></div>
    </div>
    <div>
      <button>stwórz harmonogram</button>
    </div>
  `,
  styleUrls: [
    'wean-schedule.component.scss'
  ]
})
export class WeanScheduleComponent implements OnInit {

  wean$: Observable<BabyWean>;

  constructor(private babies: BabyService) {
  }

  ngOnInit(): void {
    this.wean$ = this.babies.currentBaby$().pipe(
      map(baby => baby.wean)
    );
  }

}
