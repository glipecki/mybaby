import {Component, OnDestroy, OnInit} from '@angular/core';
import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
import {interval, Subscription} from 'rxjs';
import {TimeSincePipe} from '../../components/time-since/time-since.pipe';
import {Breast} from '../breast';
import {Meal} from '../meal';
import {NutritionService} from '../nutrition.service';

@Component({
  selector: 'bb-nutrition-dashboard-widget',
  template: `
    <bb-dashboard-widget [header]="'Karmienie'" [icon]="icon">
      <div *ngIf="lastMeal; else lastMealWaiting" class="stats">
        <div>Od ostatniego karmienia: <em>{{sinceLastMeal}}</em></div>
        <div>Ostatnia pierś: <em>{{lastMeal.breastsString}}</em></div>
      </div>
      <div class="actions">
        <ng-container *ngIf="!actionStatus && !adding">
          <bb-button (click)="leftBreastClicked()" [class.recommended]="lastMeal?.lastBreast === Breast.right">
            lewa
          </bb-button>
          <bb-button (click)="rightBreastClicked()" [class.recommended]="lastMeal?.lastBreast === Breast.left">
            prawa
          </bb-button>
        </ng-container>
        <ng-container *ngIf="adding">
          dodawanie...
        </ng-container>
        <div class="action-status" *ngIf="actionStatus">
          {{actionStatus}}
        </div>
      </div>
    </bb-dashboard-widget>
    <ng-template #lastMealWaiting>
      ...
    </ng-template>
  `,
  styleUrls: ['./nutrition-dashboard-widget.component.scss']
})
export class NutritionDashboardWidgetComponent implements OnInit, OnDestroy {

  // noinspection JSUnusedGlobalSymbols - used by template
  Breast = Breast;
  icon = faUtensils;
  lastMeal: Meal;
  sinceLastMeal: string;
  actionStatus: string;
  adding: boolean;
  private timeSinceSubscription: Subscription;
  private lastMealSubscription: Subscription;

  constructor(private service: NutritionService, private timeSince: TimeSincePipe) {
  }

  ngOnInit(): void {
    this.lastMealSubscription = this.service.getLastMeal().subscribe(
      meal => {
        this.lastMeal = meal;
        this.sinceLastMeal = this.timeSince.transform(this.lastMeal.date);
      }
    );
    this.timeSinceSubscription = interval(1000).subscribe(
      () => this.sinceLastMeal = this.lastMeal ? this.timeSince.transform(this.lastMeal.date) : undefined
    )
  }

  leftBreastClicked() {
    this.adding = true;
    this.service.addMeal(Breast.left).subscribe(
      () => {
        this.flashActionStatus('dodano!', 1000)
        this.adding = false;
      }
    );
  }

  rightBreastClicked() {
    this.adding = true;
    this.service.addMeal(Breast.right).subscribe(
      () => {
        this.flashActionStatus('dodano!', 1000)
        this.adding = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.timeSinceSubscription) {
      this.timeSinceSubscription.unsubscribe();
    }
    if (this.lastMealSubscription) {
      this.lastMealSubscription.unsubscribe();
    }
  }

  private flashActionStatus(message: string, timeout: number) {
    this.actionStatus = message;
    setTimeout(
      () => this.actionStatus = undefined,
      timeout
    );
  }
}
