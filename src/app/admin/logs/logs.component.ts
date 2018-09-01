import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LogRow} from './log-row';
import {LogsService} from './logs.service';

@Component({
  selector: 'bb-logs',
  template: `
    <div class="filter">
    </div>
    <div class="data">
      <div class="row" *ngFor="let log of logs$ | async">
        <div class="column" 
             *ngFor="let column of columns" 
             [class.light]="column.color === 'light'"
             [style.width]="column.width" 
             [style.min-width]="column.width">
          {{column.data(log)}}
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    'logs.component.scss'
  ]
})
export class LogsComponent implements OnInit {

  logs$: Observable<LogRow[]>;
  columns: {title: string, data: (row) => string, color?: string, width?: string}[] = [
    {title: 'Data', data: row => row.date.substring(0, 19), color: 'light', width: '15  0px'},
    {title: 'Treść', data: row => row.message},
    {title: 'Sesja', data: row => `@ ${row.context.session}`, color: 'light'},
  ];

  constructor(private service: LogsService) {
  }

  ngOnInit(): void {
    this.logs$ = this.service.lastLogs();
  }

}
