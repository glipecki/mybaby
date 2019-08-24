import {BabyWean} from './baby-wean';

export interface Baby {
  id: string;
  firstName: string;
  secondName: string;
  surname: string;
  birthday: string;
  personalId: string;
  wean: BabyWean;
}
