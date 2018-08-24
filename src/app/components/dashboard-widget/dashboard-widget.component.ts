import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, Input} from '@angular/core';
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';

@Component({
  selector: 'bb-dashboard-widget',
  template: `
    <div *ngIf="header" class="header">
      <div class="text">{{header}}</div>
      <div class="expand" *ngIf="hasExpandableContent" (click)="onExpandedClicked()">
        <fa-icon [icon]="faEllipsisV"></fa-icon>
      </div>
    </div>
    <div class="body">
      <div class="icon" *ngIf="icon">
        <fa-icon [icon]="icon"></fa-icon>
      </div>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
    <div class="expandable-content" [@shrinkInOut]="expanded">
      <div class="expandable-content-content">
        <ng-content select="[expandable-content]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard-widget.component.scss'],
  animations: [
    trigger('shrinkInOut', [
      state('true', style({height: '*'})),
      state('false', style({height: 0})),
      transition('true => false', [
        style({height: '*'}),
        animate('250ms ease-in', style({height: 0}))
      ]),
      transition('false => true', [
        style({height: 0}),
        animate('250ms ease-in', style({height: '*'}))
      ])
    ])
  ]
})
export class DashboardWidgetComponent {

  @Input() header: string;
  @Input() icon: IconDefinition;
  @Input() hasExpandableContent = false;
  expanded = false;
  faEllipsisV = faEllipsisV;

  onExpandedClicked() {
    this.expanded = !this.expanded;
  }

  hideExpandableContent() {
    this.expanded = false;
  }
  
}
