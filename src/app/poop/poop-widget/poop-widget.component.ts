import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPoo} from '@fortawesome/free-solid-svg-icons/faPoo';
import moment from 'moment';
import {interval, Subscription} from 'rxjs';
import {TimeSincePipe} from '../../components/time-since/time-since.pipe';
import {Poop, PoopSize} from '../poop';
import {PoopService} from '../poop.service';

@Component({
  selector: 'bb-poop-widget',
  template: `
    <bb-dashboard-widget [header]="'Kupy'" [icon]="icon">
      <div *ngIf="lastPoop" class="stats">
        <div>Od ostatniej kupy: <em>{{sinceLastPoop}} ({{keys[lastPoop.size]}})</em></div>
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
export class PoopWidgetComponent implements OnInit, OnDestroy {

  readonly icon = faPoo;
  readonly keys = {
    [PoopSize.mega]: 'mega',
    [PoopSize.big]: 'duża',
    [PoopSize.abundant]: 'obfita',
    [PoopSize.medium]: 'średnia',
    [PoopSize.small]: 'mała'
  };
  readonly sizes = [PoopSize.small, PoopSize.medium, PoopSize.abundant, PoopSize.big, PoopSize.mega];
  sinceLastPoop: string = 'n/a';
  adding: boolean = false;
  actionStatus: string = undefined;
  lastPoop: Poop;
  private timeSinceSubscription: Subscription;
  private lastPoopSubscription: Subscription;

  constructor(private service: PoopService, private timeSince: TimeSincePipe) {
  }

  ngOnInit(): void {
    this.lastPoopSubscription = this.service.lastPoop$().subscribe(
      poop => {
        this.lastPoop = poop;
        this.sinceLastPoop = this.timeSince.transform(this.lastPoop.date);
      }
    );
    this.timeSinceSubscription = interval(1000).subscribe(() => {
      if (this.lastPoop) {
        this.sinceLastPoop = this.timeSince.transform(this.lastPoop.date)
      } else {
        this.sinceLastPoop = '';
      }
    });
  }

  ngOnDestroy() {
    this.lastPoopSubscription.unsubscribe();
    this.timeSinceSubscription.unsubscribe();
  }

  async add(size: PoopSize) {
    this.adding = true;
    await this.service.add(size, moment());
    this.adding = false;
  }

}
