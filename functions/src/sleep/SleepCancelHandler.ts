import {CallableContext} from 'firebase-functions/lib/providers/https';
import {inject, injectable} from 'inversify';
import {CallableHandler} from '../api/CallableHandler';
import {ObjectUtil} from '../util/ObjectUtil';
import {Sleep} from './Sleep';
import {SleepService} from './SleepService';

interface SleepCancelRequest {
  id?: string;
}

interface SleepCancelResult {
  sleep: Sleep;
}

@injectable()
export class SleepCancelHandler implements CallableHandler<SleepCancelRequest, Promise<SleepCancelResult>> {

  constructor(@inject(SleepService) private service: SleepService) {
  }

  getName(): string {
    return 'sleepCancel';
  }

  async handle(data: SleepCancelRequest, context: CallableContext): Promise<SleepCancelResult> {
    console.info(`Cancel sleep [${JSON.stringify(data)}]`);

    const id = ObjectUtil.requireNonEmpty(data.id, 'Missing required sleep id at data.id');

    const sleep = await this.service.cancel(id);

    console.info(`Sleep canceled [id=${sleep.id}]`);
    return {
      sleep
    };
  }

}
