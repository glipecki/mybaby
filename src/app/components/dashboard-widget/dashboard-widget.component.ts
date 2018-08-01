import {Component, Input} from '@angular/core';
import {IconDefinition} from '@fortawesome/fontawesome-common-types'

@Component({
  selector: 'bb-dashboard-widget',
  template: `
    <div *ngIf="header" class="header">{{header}}</div>
    <div class="body">
      <div class="icon" *ngIf="icon">
        <fa-icon [icon]="icon"></fa-icon>
      </div>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent {

  @Input() header;
  @Input() icon: IconDefinition;

}
