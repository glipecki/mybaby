import {Breast} from './breast';

export interface Meal {
  date: string;
  breasts: Breast[];
  lastBreastString: string,
  breastString: string;
}
