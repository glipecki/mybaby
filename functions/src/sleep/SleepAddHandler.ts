import {CallableContext} from 'firebase-functions/lib/providers/https';
import {inject, injectable} from 'inversify';
import {CallableHandler} from '../api/CallableHandler';
import {FirebaseService} from '../firebase/FirebaseService';
import {ObjectUtil} from '../util/ObjectUtil';
import {Sleep} from './Sleep';
import {SleepService} from './SleepService';

interface SleepAddRequest {
  date?: string;
  baby?: string;
}

interface SleepAddResult {
  sleep: Sleep;
}

@injectable()
export class SleepAddHandler implements CallableHandler<SleepAddRequest, Promise<SleepAddResult>> {

  constructor(
    @inject(SleepService) private sleepService: SleepService,
    @inject(FirebaseService) private firebaseService: FirebaseService) {
  }

  getName(): string {
    return 'sleepAdd';
  }

  async handle(data: SleepAddRequest, context: CallableContext): Promise<SleepAddResult> {
    console.info(`Add sleep [${JSON.stringify(data)}]`);

    const babyId = ObjectUtil.requireNonEmpty(data.baby, 'Missing required sleep baby id at data.baby');
    const date = ObjectUtil.requireNonEmpty(data.date, 'Missing required sleep start date at data.date');
    if(!/^\d\d\d\d-\d\d-\d\d \d\d:\d\d$/.test(date)) {
      throw new Error('Date should match "yyyy-mm-dd hh:mm" pattern');
    }

    const sleep = await this.sleepService.add(babyId, date);

    console.info(`Sleep added [id=${sleep.id}]`);
    return {
      sleep
    };
  }

}
