import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component} from '@angular/core';
import {faBirthdayCake} from '@fortawesome/free-solid-svg-icons/faBirthdayCake';
import {faChild} from '@fortawesome/free-solid-svg-icons/faChild';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faIdCard} from '@fortawesome/free-solid-svg-icons/faIdCard';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {BabyService} from '../baby.service';
import {Observable} from 'rxjs';
import {Baby} from '../baby';

@Component({
  selector: 'bb-baby-info-widget',
  template: `
    <ng-container *ngIf="user$ | async; let user">
      <div class="header">
        <div class="name">{{user?.firstName}} {{user?.secondName}} {{user?.surname}}</div>
        <div>
          <fa-icon [icon]="viewState === 'visible' ? iconClose : iconExpand" (click)="expandToggleClicked()"></fa-icon>
        </div>
      </div>
      <div class="details" [@shrinkInOut]="viewState">
        <div class="row">
          <div class="icon">
            <fa-icon [icon]="faBirthdayCake"></fa-icon>
          </div>
          <div class="data">{{ user?.birthday  }}</div>
        </div>
        <div class="row">
          <div class="icon">
            <fa-icon [icon]="faChild"></fa-icon>
          </div>
          <div class="data">
            <div>{{ user?.birthday | daysSince }}</div>
            <div>{{ user?.birthday  | weekSince }}</div>
          </div>
        </div>
        <div class="row">
          <div class="icon">
            <fa-icon [icon]="faIdCard"></fa-icon>
          </div>
          <div class="data">{{user?.personalId}}</div>
        </div>
      </div>
    </ng-container>
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
  viewState: 'visible' | 'hidden' = 'hidden';
  user$: Observable<Baby>;

  constructor(private babyService: BabyService) {
    this.user$ = babyService.currentBaby$();
  }

  onChangeChildClicked() {
    console.log('change child!');
  }

  expandToggleClicked() {
    this.viewState = this.viewState === 'visible' ? 'hidden' : 'visible';
  }

}
