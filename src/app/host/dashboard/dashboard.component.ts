import {Component} from '@angular/core';

@Component({
  selector: 'bb-dashboard',
  template: `
    <bb-nutrition-dashboard-widget></bb-nutrition-dashboard-widget>
    <bb-sleep-dashboard-widget></bb-sleep-dashboard-widget>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
}
