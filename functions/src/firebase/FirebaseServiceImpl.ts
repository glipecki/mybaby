import * as admin from 'firebase-admin';
import {injectable} from 'inversify';
import {FirebaseService} from './FirebaseService';

@injectable()
export class FirebaseServiceImpl implements FirebaseService {

  constructor() {
    admin.initializeApp();
    admin.firestore().settings({
      timestampsInSnapshots: true
    });
  }

  firestore(): admin.firestore.Firestore {
    return admin.firestore();
  }

}
