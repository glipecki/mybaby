import {Pipe, PipeTransform} from '@angular/core';
import {duration} from 'moment';
import {GroupedRow} from 'src/app/components/list-with-day-groupping/grouped-row';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
import {Sleep} from 'src/app/sleep/sleep';

@Pipe({
  name: 'sleepSumTime',
  pure: true
})
export class PastSleepsSumSleepPipe implements PipeTransform {

  constructor(private hoursSince: HoursSincePipe) {
  }

  transform(value: any, args?: any): any {
    return this.sumSleepTime(value);
  }

  sumSleepTime(day: GroupedRow<Sleep>) {
    const sleeps = day.rows.filter(s => s.sleep);
    const summaryDaySleepTime = sleeps.reduce((prev, curr) => prev + curr.sleep.time, 0);
    if (summaryDaySleepTime > 0) {
      return this.hoursSince.asTime(duration(summaryDaySleepTime, 's'));
    } else {
      return '...';
    }
  }

}
