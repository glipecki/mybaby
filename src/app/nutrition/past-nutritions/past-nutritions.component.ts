import {Component, OnInit} from '@angular/core';
import moment from 'moment';
import {Breast} from '../breast';
import {Meal} from '../meal';
import {NutritionService} from '../nutrition.service';

@Component({
  selector: 'bb-past-nutritions',
  template: `
    <div *ngFor="let mealDay of meals" class="day-group">
      <div class="header">
        <div>
          {{mealDay.date}}
        </div>
      </div>
      <div class="body">
        <div *ngFor="let meal of mealDay.meals; let index = index" class="meal-row">
          <div class="meal-number">{{mealDay.meals.length - index}}.</div>
          <div>{{meal.date}} - pierś: {{meal.breastsString}}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./past-nutritions.component.scss']
})
export class PastNutritionsComponent implements OnInit {

  // noinspection JSUnusedGlobalSymbols - used by template
  Breast = Breast;
  meals: { date: string, meals: Meal[] }[] = [];

  constructor(private nutritionService: NutritionService) {
  }

  ngOnInit() {
    this.nutritionService.getMeals().subscribe(
      meals => {
        const groupByDate = meals.reduce(
          (prev, meal) => {
            const day = moment(meal.date).format('YYYY-MM-DD');
            return {
              ...prev,
              [day]: prev[day] ? [...prev[day], meal] : [meal]
            };
          },
          {}
        );
        this.meals = Object.keys(groupByDate)
          .map(key => ({
            date: key,
            meals: groupByDate[key]
          }));
      }
    )
  }

  trackByDate(index: number, item: Meal) {
    return item.date;
  }


}
