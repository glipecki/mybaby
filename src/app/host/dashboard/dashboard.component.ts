import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'bb-dashboard',
  template: `
    <bb-nutrition-dashboard-widget>
    </bb-nutrition-dashboard-widget>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
