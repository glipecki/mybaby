import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const duration = moment.duration(moment().diff(moment(value)));
    const parts = [];
    if (duration.years() > 0) {
      parts.push(`${duration.years()} lat`)
    }
    if (duration.months() > 0) {
      parts.push(`${duration.months()} miesięcy`)
    }
    if (duration.days() > 0) {
      parts.push(`${duration.days()} dni`)
    }
    if (duration.hours() > 0) {
      parts.push(`${duration.hours()} godzin`)
    }
    if (duration.minutes() > 0) {
      parts.push(`${duration.minutes()} minut`)
    }
    if (parts.length === 0) {
      parts.push('teraz');
    }
    return parts.join(' i ');
  }

}
