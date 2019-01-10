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
  `,
  styleUrls: ['./past-nutritions.component.scss']
})
export class PastNutritionsComponent implements OnInit {

  meals: Observable<Meal[]>;
  mealDateExtractor = (meal: Meal) => moment(meal.date);

  constructor(private nutritionService: NutritionService) {
  }

  ngOnInit() {
    this.meals = this.nutritionService.getMeals();
  }

}
