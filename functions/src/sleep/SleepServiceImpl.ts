import {inject, injectable} from 'inversify';
import {CurrentUser} from '../auth/CurrentUser';
import {FirebaseService} from '../firebase/FirebaseService';
import {Sleep} from './Sleep';
import {SleepService} from './SleepService';
import * as admin from 'firebase-admin';
import * as firestore from '@google-cloud/firestore';

@injectable()
export class SleepServiceImpl implements SleepService {

  private sleeps: firestore.CollectionReference;

  constructor(
    @inject(FirebaseService) private firebase: FirebaseService,
    @inject(CurrentUser) private currentUser: CurrentUser) {
    this.sleeps =  admin.firestore().collection('sleeps');
  }

  async add(babyId: string, date: string): Promise<Sleep> {
    // const doc = this.sleeps.add({
    //   babyId: babyId,
    //   userId: this.currentUser.getId(),
    //   type: 'current',
    //   start: {
    //     date: date,
    // //     timestamp: startDate.valueOf()
      // },
    // });

    return Promise.resolve({
      id: '0'
    });
  }

  cancel(uuid: string): Promise<Sleep> {
    return Promise.resolve({
      id: '0'
    });
  }

  end(uuid: string, date: string): Promise<Sleep> {
    return Promise.resolve({
      id: '0'
    });
  }

  resume(uuid: string): Promise<Sleep> {
    return Promise.resolve({
      id: '0'
    });
  }

}
