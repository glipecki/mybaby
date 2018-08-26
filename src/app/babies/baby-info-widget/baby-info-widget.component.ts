import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component} from '@angular/core';
import {faBirthdayCake} from '@fortawesome/free-solid-svg-icons/faBirthdayCake';
import {faChild} from '@fortawesome/free-solid-svg-icons/faChild';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faIdCard} from '@fortawesome/free-solid-svg-icons/faIdCard';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
  selector: 'bb-baby-info-widget',
  template: `
    <div class="header">
      <div class="name">Oskar Tomasz Lipecki</div>
      <div>
        <fa-icon [icon]="viewState === 'visible' ? iconClose : iconExpand" (click)="expandToggleClicked()"></fa-icon>
      </div>
    </div>
    <div class="details" [@shrinkInOut]="viewState">
      <div class="row">
        <div class="icon">
          <fa-icon [icon]="faBirthdayCake"></fa-icon>
        </div>
        <div class="data">30.03.2018</div>
      </div>
      <div class="row">
        <div class="icon">
          <fa-icon [icon]="faChild"></fa-icon>
        </div>
        <div class="data">
          <div>{{ '2018-03-30' | daysSince }}</div>
          <div>{{ '2018-03-30' | weekSince }}</div>
        </div>
      </div>
      <div class="row">
        <div class="icon">
          <fa-icon [icon]="faIdCard"></fa-icon>
        </div>
        <div class="data">123456789</div>
      </div>
    </div>
  `,
  styleUrls: [
    './baby-info-widget.component.scss'
  ],
  animations: [
    trigger('shrinkInOut', [
      state('visible', style({height: '*'})),
      state('hidden', style({height: 0})),
      transition('visible => hidden', [
        style({height: '*'}),
        animate('250ms ease-in', style({height: 0}))
      ]),
      transition('hidden => visible', [
        style({height: 0}),
        animate('250ms ease-in', style({height: '*'}))
      ])
    ])
  ]
})
export class BabyInfoWidgetComponent {

  iconExpand = faEllipsisV;
  iconClose = faTimes;
  faChild = faChild;
  faBirthdayCake = faBirthdayCake;
  faIdCard = faIdCard;
  viewState: 'visible'|'hidden' = 'hidden';

  onChangeChildClicked() {
    console.log('change child!');
  }

  expandToggleClicked() {
    this.viewState = this.viewState === 'visible' ? 'hidden' : 'visible';
  }

}
