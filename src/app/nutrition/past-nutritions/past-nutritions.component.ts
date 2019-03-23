import {Component, OnInit} from '@angular/core';
import moment from 'moment';
import {Observable} from 'rxjs';
import {Meal} from '../meal';
import {NutritionService} from '../nutrition.service';

@Component({
  selector: 'bb-past-nutritions',
  template: `
    <bb-list-with-day-grouping [data]="meals|async"
                               [dateExtractor]="mealDateExtractor">
      <ng-template #header let-day>
        {{day.dateString}}
      </ng-template>
      <ng-template #row let-row>
        {{row.date}} - pierś: {{row.breastsString}}
      </ng-template>
    </bb-list-with-day-grouping>
    <button *ngIf="!allLoaded" (click)="loadAll()">kolejne</button>
  `,
  styleUrls: ['./past-nutritions.component.scss']
})
export class PastNutritionsComponent implements OnInit {

  meals: Observable<Meal[]>;
  allLoaded = false;

  constructor(private nutritionService: NutritionService) {
  }

  mealDateExtractor = (meal: Meal) => moment(meal.date);

  ngOnInit() {
    this.meals = this.nutritionService.getMeals(moment().subtract(7, 'days').format('YYYY-MM-DD'));
  }

  loadAll() {
    this.allLoaded = true;
    this.meals = this.nutritionService.getMeals();
  }

}
