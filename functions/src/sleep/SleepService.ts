import {Sleep} from './Sleep';

export abstract class SleepService {

  abstract add(babyId: string, date: string): Promise<Sleep>;

  abstract end(uuid: string, date: string): Promise<Sleep>;

  abstract resume(uuid: string): Promise<Sleep>;

  abstract cancel(uuid: string): Promise<Sleep>;

}
