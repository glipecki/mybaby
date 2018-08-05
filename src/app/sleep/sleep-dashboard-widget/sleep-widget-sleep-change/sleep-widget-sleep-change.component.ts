import {Component, EventEmitter, Input, Output} from '@angular/core';
import moment from 'moment';
import {SleepDateSelected} from 'src/app/sleep/sleep-dashboard-widget/sleep-widget-sleep-change/sleep-date-selected';

@Component({
  selector: 'bb-sleep-widget-sleep-change',
  template: `
    <bb-operation-with-confirm [operationText]="text"
                               [confirmText]="'dodaj'"
                               [cancelText]="'anuluj'"
                               (confirm)="onConfirm()"
                               (confirmOpen)="initDatePicker()">
      <bb-date-time-picker *ngIf="date" 
                           [date]="date.date"
                           [time]="date.time"
                           (dateChange)="onDateChanged($event)"
                           (timeChange)="onTimeChanged($event)">
      </bb-date-time-picker>
    </bb-operation-with-confirm>
  `,
  styleUrls: [
    './sleep-widget-sleep-change.component.scss'
  ]
})
export class SleepWidgetSleepChangeComponent {

  @Input() text: string;
  @Output() select = new EventEmitter<SleepDateSelected>();
  date: SleepDateSelected;

  onConfirm(): void {
    this.select.next(this.date);
  }

  initDatePicker(): void {
    const currentDate = moment();
    this.date = {
      date: currentDate.format('YYYY-MM-DD'),
      time: currentDate.format('HH:mm')
    }
  }

  onDateChanged($event: string) {
    this.date.date = $event;
  }

  onTimeChanged($event: string) {
    this.date.time = $event;
  }

}
