import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'hoursSince'
})
export class HoursSincePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const duration = moment.duration(moment().diff(moment(value)));
    return this.asLocalizedText(duration);
  }

  asLocalizedText(duration: moment.Duration) {
    if (duration.hours() > 0) {
      return `${duration.hours()} godzin i ${duration.minutes()} minut`;
    } else {
      return `${duration.minutes()} minut`;
    }
  }

  asTime(duration: moment.Duration) {
    const hours = duration.hours() > 9 ? duration.hours() : `0${duration.hours()}`;
    const minutes = duration.minutes() > 9 ? duration.minutes() : `0${duration.minutes()}`;
    return `${hours}:${minutes}`;
  }

}
