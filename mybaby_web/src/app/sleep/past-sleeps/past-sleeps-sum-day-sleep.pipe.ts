import {Pipe, PipeTransform} from '@angular/core';
import {duration} from 'moment';
import {GroupedRow} from 'src/app/components/list-with-day-groupping/grouped-row';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
import {Sleep} from 'src/app/sleep/sleep';
import {SleepType} from 'src/app/sleep/sleep-type';

@Pipe({
  name: 'sleepSumDayTime'
})
export class PastSleepsSumDaySleepPipe implements PipeTransform {

  constructor(private hoursSince: HoursSincePipe) {
  }

  transform(value: any, args?: any): any {
    return this.sumDaySleepTime(value);
  }

  sumDaySleepTime(day: GroupedRow<Sleep>) {
    const daySleeps = day.rows.filter(s => s.type === SleepType.day);
    const summaryDaySleepTime = daySleeps.reduce((prev, curr) => prev + curr.sleep.time, 0);
    if (summaryDaySleepTime > 0) {
      return this.hoursSince.asTime(duration(summaryDaySleepTime, 's'));
    } else {
      return '...';
    }
  }

}
