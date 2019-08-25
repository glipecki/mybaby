import {Component, HostBinding, OnInit} from '@angular/core';
import {faMoon} from '@fortawesome/free-solid-svg-icons/faMoon';
import {faSun} from '@fortawesome/free-solid-svg-icons/faSun';
import moment from 'moment';

@Component({
  selector: 'bb-dashboard',
  template: `
    <bb-baby-info-widget *ngIf="day" class="widget"></bb-baby-info-widget>
    <bb-nutrition-dashboard-widget class="widget"></bb-nutrition-dashboard-widget>
    <bb-sleep-dashboard-widget *ngIf="day" class="widget"></bb-sleep-dashboard-widget>
    <div class="night-day-switch">
      <fa-icon (click)="switchToNight()" [icon]="dayIcon" *ngIf="day"></fa-icon>
      <fa-icon (click)="switchToDay()" [icon]="nightIcon" *ngIf="night"></fa-icon>
    </div>
    <div class="night-dim-mask">
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly dayIcon = faSun;
  readonly nightIcon = faMoon;

  private state: 'day' | 'night' = 'day';

  @HostBinding('class.night')
  get hostClassNight() {
    return this.night;
  }

  ngOnInit(): void {
    const current = moment();
    this.state = current.hour() >= 21 || current.hour() <= 6 ? 'night' : 'day';
  }

  get day() {
    return this.state === 'day';
  }

  get night() {
    return this.state === 'night';
  }

  switchToNight() {
    this.state = 'night';
  }

  switchToDay() {
    this.state = 'day';
  }

}
