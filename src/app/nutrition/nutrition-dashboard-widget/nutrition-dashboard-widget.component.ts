import {Component, OnDestroy, OnInit} from '@angular/core';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
import {Optional} from '@glipecki/optional';
import moment from 'moment';
import {interval, Subscription} from 'rxjs';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
import {Breast} from 'src/app/nutrition/breast'
import {Meal} from 'src/app/nutrition/meal';
import {NutritionService} from 'src/app/nutrition/nutrition.service';
import {LoggerFactory} from '../../logger/logger-factory';
import {UserInteractionService} from '../../user-interaction/user-interaction.service';
import {WeanService} from '../wean.service';

@Component({
  selector: 'bb-nutrition-dashboard-widget',
  template: `
    <bb-dashboard-widget [header]="'Karmienie'" [icon]="icon" [hasExpandableContent]="true"
                         (expand)="customizeWindowExpanded($event)">
      <div *ngIf="lastMeal; else lastMealWaiting" class="stats">
        <div>Od ostatniego karmienia: <em>{{sinceLastMeal}}</em></div>
        <div>Ostatnia pierś: <em>{{lastMeal.breastsString}}</em></div>
      </div>
      <div *ngIf="weanNextValidFeedTime">
        <div class="wean-not-yet">
          Wstrzymaj się z cycuchem do {{weanNextValidFeedTime}}&nbsp;<fa-icon [icon]="weanWaitIcon"></fa-icon>
        </div>
      </div>
      <div class="actions">
        <ng-container *ngIf="!actionStatus && !adding">
          <bb-button (click)="leftBreastClicked()" [class.recommended]="recommendedBreast === Breast.left">
            lewa
          </bb-button>
          <bb-button (click)="rightBreastClicked()" [class.recommended]="recommendedBreast === Breast.right">
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
      <ng-container expandable-content>
        <div class="custom-date-panel">
          <bb-date-time-picker *ngIf="date"
                               [date]="date.date"
                               [time]="date.time"
                               (dateChange)="onDateChanged($event)"
                               (timeChange)="onTimeChanged($event)">
          </bb-date-time-picker>
        </div>
      </ng-container>
    </bb-dashboard-widget>
    <ng-template #lastMealWaiting>
      ...
    </ng-template>
  `,
  styleUrls: ['./nutrition-dashboard-widget.component.scss']
})
export class NutritionDashboardWidgetComponent implements OnInit, OnDestroy {

  private static readonly log = LoggerFactory.getLogger('NutritionDashboardWidgetComponent');

  // noinspection JSUnusedGlobalSymbols - used by template
  Breast = Breast;
  icon = faUtensils;
  weanWaitIcon = faExclamationTriangle;
  lastMeal: Meal;
  sinceLastMeal: string;
  actionStatus: string;
  adding: boolean;
  recommendedBreast: Breast;
  date: {
    date: string,
    time: string
  };
  weanNextValidFeedTime = '20:15';
  private hoursSinceSubscription: Subscription;
  private weanSubscription: Subscription;
  private lastMealSubscription: Subscription;
  private readonly userTracker: (interaction: string) => void;

  constructor(
    private service: NutritionService,
    private hoursSince: HoursSincePipe,
    private wean: WeanService,
    userInteractionService: UserInteractionService) {
    this.userTracker = userInteractionService.getTracker('NutritionDashboardWidgetComponent');
  }

  ngOnInit(): void {
    this.lastMealSubscription = this.service.getLastMeal().subscribe(
      meal => {
        this.lastMeal = meal;
        this.sinceLastMeal = this.hoursSince.transform(this.lastMeal.date);
        this.recommendedBreast = this.getRecommendedBreast(this.lastMeal.breasts);
      }
    );
    this.hoursSinceSubscription = interval(1000).subscribe(
      () => this.sinceLastMeal = this.lastMeal ? this.hoursSince.transform(this.lastMeal.date) : undefined
    );
    this.wean.nextValidFeedTime().then(time => this.weanNextValidFeedTime = time);
    this.weanSubscription = interval(1000).subscribe(
      async () => this.weanNextValidFeedTime = await this.wean.nextValidFeedTime()
    );
  }

  leftBreastClicked() {
    this.userTracker('User selected left breast meal');
    this.addMeal(Breast.left);
  }

  rightBreastClicked() {
    this.userTracker('User selected right breast meal');
    this.addMeal(Breast.right);
  }

  customizeWindowExpanded(open: boolean) {
    if (open) {
      this.date = {
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm')
      };
    } else {
      this.date = undefined;
    }
  }

  ngOnDestroy(): void {
    if (this.hoursSinceSubscription) {
      this.hoursSinceSubscription.unsubscribe();
    }
    if (this.weanSubscription) {
      this.weanSubscription.unsubscribe();
    }
    if (this.lastMealSubscription) {
      this.lastMealSubscription.unsubscribe();
    }
  }

  onDateChanged($event: string) {
    this.date.date = $event;
  }

  onTimeChanged($event: string) {
    this.date.time = $event;
  }

  private addMeal(brest) {
    this.adding = true;
    const date = Optional.of(this.date).flatMap(d => `${d.date} ${d.time}`);
    this.service.addMeal(brest, date).subscribe(
      () => {
        this.flashActionStatus('dodano!', 1000)
        this.adding = false;
      }
    );
  }

  private flashActionStatus(message: string, timeout: number) {
    this.actionStatus = message;
    setTimeout(
      () => this.actionStatus = undefined,
      timeout
    );
  }

  private getRecommendedBreast(breasts: Breast[]): Breast {
    if (breasts.length === 1) {
      return breasts[0] === Breast.left ? Breast.right : Breast.left;
    } else {
      return breasts[breasts.length - 1];
    }
  }

}
