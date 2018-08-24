import {CallableContext} from 'firebase-functions/lib/providers/https';
import {inject, injectable} from 'inversify';
import {CallableHandler} from '../api/CallableHandler';
import {ObjectUtil} from '../util/ObjectUtil';
import {SleepService} from './SleepService';

interface SleepResumeRequest {
  id?: string;
}

interface SleepResumeResult {
}

@injectable()
export class SleepResumeHandler implements CallableHandler<SleepResumeRequest, SleepResumeResult> {

  constructor(@inject(SleepService) private service: SleepService) {
  }

  getName(): string {
    return 'sleepResume';
  }

  async handle(data: SleepResumeRequest, context: CallableContext): Promise<SleepResumeResult> {
    console.info(`Resume sleep [${JSON.stringify(data)}]`);

    const id = ObjectUtil.requireNonEmpty(data.id, 'Missing required sleep id at data.id');

    const sleep = await this.service.resume(id);

    console.info(`Sleep resumed [id=${sleep.id}]`);
    return {
      sleep
    };
  }

}
