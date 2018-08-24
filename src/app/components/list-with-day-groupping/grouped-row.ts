import {Moment} from 'moment';

export interface GroupedRow<T> {
  date: Moment;
  dateString: string;
  rows: T[];
}
