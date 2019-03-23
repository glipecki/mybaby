import {Injectable} from '@angular/core';
import moment, {Moment} from 'moment';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Baby} from '../babies/baby';
import {BabyService} from '../babies/baby.service';
import {NutritionService} from '../nutrition/nutrition.service';
import {Sleep} from '../sleep/sleep';
import {SleepService} from '../sleep/sleep.service';
import {Meal} from './meal';

@Injectable({
  providedIn: 'root'
})
export class WeanService {

  constructor(private sleeps: SleepService, private nutrition: NutritionService, private babies: BabyService) {
  }

  suppressFeedUntil$(): Observable<string> {
    return combineLatest(
      this.sleeps.lastSleep$(),
      this.nutrition.getLastMeal(),
      this.babies.currentBaby$()
    ).pipe(
      map(([sleep, meal, baby]) => this.suppressFeedUntil(sleep, meal, baby))
    );
  }

  private suppressFeedUntil(sleep: Sleep, meal: Meal, baby: Baby): string {
    const now = moment();

    const suppressTime = this.suppressTime(now, baby);
    if (!suppressTime) {
      return undefined;
    }

    const validFeedTime = moment(sleep.start).add(suppressTime, 'minutes');
    const shouldSuppressFeeding =
      this.isSleeping(sleep) &&
      this.isSleepingTime(now) &&
      this.isNotFeedFromSleep(meal, sleep) &&
      this.isBeforeValidFeedTime(now, validFeedTime);

    if (shouldSuppressFeeding) {
      return validFeedTime.format('HH:mm');
    } else {
      return undefined;
    }
  }

  private isBeforeValidFeedTime(now: Moment, validFeedTime: Moment) {
    return now.isBefore(validFeedTime);
  }

  private isNotFeedFromSleep(meal: Meal, sleep: Sleep) {
    return moment(meal.date).isBefore(moment(sleep.start));
  }

  private isSleepingTime(date: Moment) {
    return date.hour() >= 19 || date.hour() <= 7;
  }

  private isSleeping(sleep: Sleep) {
    return sleep.end === undefined;
  }

  private suppressTime(date: Moment, baby: Baby): number {
    return baby.wean.schedule[date.format('YYYY-MM-DD')];
  }

}
