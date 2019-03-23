import {Injectable} from '@angular/core';
import moment from 'moment';
import {BabyService} from '../babies/baby.service';
import {NutritionService} from '../nutrition/nutrition.service';
import {SleepService} from '../sleep/sleep.service';

@Injectable({
  providedIn: 'root'
})
export class WeanService {

  constructor(private sleeps: SleepService, private nutrition: NutritionService, private babies: BabyService) {
  }

  async nextValidFeedTime(): Promise<string> {
    const validFeedTime = this.validFeedTime();

    const shouldSuppressFeeding =
      await this.isSleeping() &&
      this.isSleepingTime() &&
      this.isNotFeedFromSleep() &&
      this.isBeforeValidFeedTime(validFeedTime);

    if (shouldSuppressFeeding) {
      return validFeedTime;
    } else {
      return undefined;
    }
  }

  private isBeforeValidFeedTime(validFeedTime: string) {
    return true;
  }

  private validFeedTime() {
    return '21:00';
  }

  private isNotFeedFromSleep() {
    return true;
  }

  private isSleepingTime() {
    const time = moment();
    return time.hour() >= 19 || time.hour() <= 7;
  }

  private async isSleeping() {
    const sleep = await this.sleeps.lastSleep$().toPromise();
    return sleep.end === undefined;
  }

}
