import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bb-date-time-picker',
  template: `
    <input type="date" [value]="date" (input)="onDateChanged($event.currentTarget.data)"/>
    <input type="time" [value]="time" (input)="onTimeChanged($event.currentTarget.data)"/>
  `,
  styleUrls: [
    './date-time-picker.component.scss'
  ]
})
export class DateTimePickerComponent {

  @Input() date: string;
  @Input() time: string;
  @Output() dateChange = new EventEmitter<string>();
  @Output() timeChange = new EventEmitter<string>();

  onDateChanged($event) {
    this.dateChange.emit($event);
  }

  onTimeChanged($event) {
    this.timeChange.emit($event);
  }

}
