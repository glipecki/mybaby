import {BreastDb} from 'src/app/nutrition/breast-db';

export interface MealDb {
  babyId: string;
  userId: string;
  date: string;
  breasts: BreastDb[];
}
