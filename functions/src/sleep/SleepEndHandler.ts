import {CallableContext} from 'firebase-functions/lib/providers/https';
import {inject, injectable} from 'inversify';
import {CallableHandler} from '../api/CallableHandler';
import {ObjectUtil} from '../util/ObjectUtil';
import {Sleep} from './Sleep';
import {SleepService} from './SleepService';

interface SleepEndRequest {
  id?: string;
  date?: string;
}

interface SleepEndResult {
  sleep: Sleep;
}

@injectable()
export class SleepEndHandler implements CallableHandler<SleepEndRequest, Promise<SleepEndResult>> {

  constructor(@inject(SleepService) private service: SleepService) {
  }

  getName(): string {
    return 'sleepEnd';
  }

  async handle(data: SleepEndRequest, context: CallableContext): Promise<SleepEndResult> {
    console.info(`End sleep [${data}]`);

    const id = ObjectUtil.requireNonEmpty(data.id, 'Missing required sleep id at data.id');
    const date = ObjectUtil.requireNonEmpty(data.date, 'Missing required sleep end date at data.date');
    if (!/^\d\d\d\d-\d\d-\d\d$/.test(date)) {
      throw new Error('Date should match yyyy-mm-dd pattern');
    }

    const sleep = await this.service.end(id, date);

    console.info(`Sleep ended [id=${sleep.id}]`);
    return {
      sleep
    };
  }

}
