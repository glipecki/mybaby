import {Component, OnInit} from '@angular/core';
import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
import {interval} from 'rxjs';
import {TimeSincePipe} from '../../components/time-since/time-since.pipe';
import {Breast} from '../breast';
import {Meal} from '../meal';
import {NutritionService} from '../nutrition.service';

@Component({
  selector: 'bb-nutrition-dashboard-widget',
  template: `
    <bb-dashboard-widget [header]="'Karmienie'" [icon]="icon">
      <ng-container *ngIf="lastMeal; else noLastMeal">
        <div>Od ostatniego karmienia: <em>{{sinceLastMeal}}</em>.</div>
        <div>Ostatnia pierś: <em>{{lastMeal.breastString}}</em>.</div>
      </ng-container>
      <div class="actions">
        <ng-container *ngIf="!actionStatus && !addingMeal">
          <bb-button (click)="leftBreastClicked()" [class.recomended]="lastMeal?.lastBreastString === Breast.RIGHT">
            lewa
          </bb-button>
          <bb-button (click)="rightBreastClicked()" [class.recomended]="lastMeal?.lastBreastString === Breast.LEFT">
            prawa
          </bb-button>
        </ng-container>
        <ng-container *ngIf="addingMeal">
          dodawanie...
        </ng-container>
        <div class="action-status" *ngIf="actionStatus">
          {{actionStatus}}
        </div>
      </div>
    </bb-dashboard-widget>
    <ng-template #noLastMeal>
      Brak danych ostatniego karmienia
    </ng-template>
  `,
  styleUrls: ['./nutrition-dashboard-widget.component.scss']
})
export class NutritionDashboardWidgetComponent implements OnInit {

  // noinspection JSUnusedGlobalSymbols - used by template
  Breast = Breast;
  icon = faUtensils;
  lastMeal: Meal;
  sinceLastMeal: string;
  actionStatus: string;
  addingMeal: boolean;

  constructor(private service: NutritionService, private timeSince: TimeSincePipe) {
  }

  ngOnInit(): void {
    this.service.getLastMeal().subscribe(
      meal => {
        this.lastMeal = meal;
        this.sinceLastMeal = this.timeSince.transform(this.lastMeal.date);
      }
    );
    interval(1000).subscribe(
      () => this.sinceLastMeal = this.lastMeal ? this.timeSince.transform(this.lastMeal.date) : undefined
    )

  }

  leftBreastClicked() {
    this.addingMeal = true;
    this.service.addMeal(Breast.LEFT).subscribe(
      () => {
        this.flashActionStatus('dodano!', 1000)
        this.addingMeal = false;
      }
    );
  }

  rightBreastClicked() {
    this.addingMeal = true;
    this.service.addMeal(Breast.RIGHT).subscribe(
      () => {
        this.flashActionStatus('dodano!', 1000)
        this.addingMeal = false;
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
}
