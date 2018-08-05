import {Breast} from './breast';

export interface Meal {
  date: string;
  breasts: Breast[];
  lastBreast: Breast,
  lastBreastString: string,
  breastsString: string;
}
