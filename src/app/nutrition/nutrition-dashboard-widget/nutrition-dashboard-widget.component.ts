import {Component, OnDestroy, OnInit} from '@angular/core';
import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
import {interval, Subscription} from 'rxjs';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
import {Breast} from 'src/app/nutrition/breast'
import {Meal} from 'src/app/nutrition/meal';
import {NutritionService} from 'src/app/nutrition/nutrition.service';
import {LoggerFactory} from '../../logger/logger-factory';
import {UserInteractionService} from '../../user-interaction/user-interaction.service';

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
    </bb-dashboard-widget>
    <ng-template #lastMealWaiting>
      ...
    </ng-template>
  `,
  styleUrls: ['./nutrition-dashboard-widget.component.scss']
})
export class NutritionDashboardWidgetComponent implements OnInit, OnDestroy {

  private static  readonly log = LoggerFactory.getLogger('NutritionDashboardWidgetComponent');

  // noinspection JSUnusedGlobalSymbols - used by template
  Breast = Breast;
  icon = faUtensils;
  lastMeal: Meal;
  sinceLastMeal: string;
  actionStatus: string;
  adding: boolean;
  recommendedBreast: Breast;
  private hoursSinceSubscription: Subscription;
  private lastMealSubscription: Subscription;
  private readonly userTracker: (interaction: string) => void;

  constructor(
    private service: NutritionService,
    private hoursSince: HoursSincePipe,
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
    )
  }

  leftBreastClicked() {
    this.userTracker( 'User selected left breast meal');
    this.adding = true;
    this.service.addMeal(Breast.left).subscribe(
      () => {
        this.flashActionStatus('dodano!', 1000)
        this.adding = false;
      }
    );
  }

  rightBreastClicked() {
    this.userTracker( 'User selected right breast meal');
    this.adding = true;
    this.service.addMeal(Breast.right).subscribe(
      () => {
        this.flashActionStatus('dodano!', 1000)
        this.adding = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.hoursSinceSubscription) {
      this.hoursSinceSubscription.unsubscribe();
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

  private getRecommendedBreast(breasts: Breast[]): Breast {
    if (breasts.length === 1) {
      return breasts[0] === Breast.left ? Breast.right : Breast.left;
    } else {
      return breasts[breasts.length - 1];
    }
  }

}
