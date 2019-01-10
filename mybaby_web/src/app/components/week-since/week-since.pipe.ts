import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'weekSince'
})
export class WeekSincePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const duration = moment.duration(moment().diff(moment(value)));
    return `${Math.floor(duration.asWeeks())} tygodni`;
  }

}
