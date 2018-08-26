import {Component, OnInit} from '@angular/core';
import {faPoo} from '@fortawesome/free-solid-svg-icons/faPoo';
import {Observable} from 'rxjs';
import {Poop, PoopSize} from '../poop';
import {PoopService} from '../poop.service';
import moment from 'moment';

@Component({
  selector: 'bb-poop-widget',
  template: `
    <bb-dashboard-widget [header]="'Kupy'" [icon]="icon">
      <div *ngIf="lastPoop$ | async as lastPoop" class="stats">
        <div>Od ostatniej kupy: <em>{{lastPoop.date | hoursSince}} ({{keys[lastPoop.size]}})</em></div>
      </div>
      <div class="actions">
        <ng-container *ngIf="!actionStatus && !adding">
          <bb-button *ngFor="let size of sizes" (click)="add(size)">{{keys[size]}}</bb-button>
        </ng-container>
        <ng-container *ngIf="adding">
          dodawanie...
        </ng-container>
        <div class="action-status" *ngIf="actionStatus">
          {{actionStatus}}
        </div>
      </div>
    </bb-dashboard-widget>
  `,
  styleUrls: [
    './poop-widget.component.scss'
  ]
})
export class PoopWidgetComponent implements OnInit {

  readonly icon = faPoo;
  readonly keys = {
    [PoopSize.mega]: 'mega',
    [PoopSize.big]: 'duża',
    [PoopSize.abundant]: 'obfita',
    [PoopSize.medium]: 'średnia',
    [PoopSize.small]: 'mała'
  };
  readonly sizes = [PoopSize.small, PoopSize.medium, PoopSize.abundant, PoopSize.big, PoopSize.big];
  sinceLastPoop: string = 'n/a';
  adding: boolean = false;
  actionStatus: string = undefined;
  lastPoop$: Observable<Poop>;

  constructor(private service: PoopService) {
  }

  ngOnInit(): void {
    this.lastPoop$ = this.service.lastPoop$();
  }

  async add(size: PoopSize) {
    this.adding = true;
    await this.service.add(size, moment());
    this.adding = false;
  }

}
