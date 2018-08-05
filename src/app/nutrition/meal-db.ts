import {BreastDb} from 'src/app/nutrition/breast-db';

export interface MealDb {
  babyId: string;
  userId: string;
  timestamp: number;
  date: string;
  breasts: BreastDb[];
}
