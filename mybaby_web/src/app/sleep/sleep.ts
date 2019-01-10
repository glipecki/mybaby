import {SleepType} from 'src/app/sleep/sleep-type';
import {TimeDuration} from 'src/app/sleep/time-duration';

export interface Sleep {
  id: string;
  type: SleepType;
  typeString?: string;
  start: string;
  startHour: string;
  end?: string;
  endHour?: string;
  sleep?: TimeDuration;
  activityBefore?: TimeDuration;
}
