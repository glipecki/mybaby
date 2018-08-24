import {Pipe, PipeTransform} from '@angular/core';
import {duration} from 'moment';
import {GroupedRow} from 'src/app/components/list-with-day-groupping/grouped-row';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
import {Sleep} from 'src/app/sleep/sleep';
import {SleepType} from 'src/app/sleep/sleep-type';

@Pipe({
  name: 'sleepSumNightTime'
})
export class PastSleepsSumNightSleepPipe implements PipeTransform {

  constructor(private hoursSince: HoursSincePipe) {
  }

  transform(value: any, args?: any): any {
    return this.sumNightSleepTime(value);
  }

  sumNightSleepTime(day: GroupedRow<Sleep>) {
    const nightSleeps = day.rows.filter(s => s.type === SleepType.night);
    const summaryNightSleepTime = nightSleeps.reduce((prev, curr) => prev + curr.sleep.time, 0);
    if (summaryNightSleepTime > 0) {
      return this.hoursSince.asTime(duration(summaryNightSleepTime, 's'));
    } else {
      return '...';
    }
  }

}
