import {Component, OnInit} from '@angular/core';
import {Breast} from '../breast';
import {Meal} from '../meal';
import {NutritionService} from '../nutrition.service';

@Component({
  selector: 'bb-past-nutritions',
  template: `
    <div *ngFor="let meal of meals; trackBy:trackByDate">
      {{meal.date}} - pierś: {{meal.breastString}}
    </div>
  `,
  styleUrls: ['./past-nutritions.component.scss']
})
export class PastNutritionsComponent implements OnInit {

  // noinspection JSUnusedGlobalSymbols - used by template
  Breast = Breast;
  meals: Meal[];

  constructor(private nutritionService: NutritionService) {
  }

  ngOnInit() {
    this.nutritionService.getMeals().subscribe(
      meals => this.meals = meals
    )
  }

  trackByDate(index: number, item: Meal) {
    return item.date;
  }

}
