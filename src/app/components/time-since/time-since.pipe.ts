import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const duration = moment.duration(moment().diff(moment(value)));
    if (duration.hours() > 0) {
      return `${duration.hours()} godzin i ${duration.minutes()} minut`;
    } else {
      return `${duration.minutes()} minut`;
    }
  }

}
