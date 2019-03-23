import {Injectable} from '@angular/core';
import {LoggerFactory} from '../logger/logger-factory';
import * as firebase from 'firebase';
import {FirebaseService} from '../firebase/firebase.service';
import {CurrentBabyService} from '../common/baby/current-baby.service';
import {BabyDbMapper} from './baby-db-mapper';
import {Observable, Subject} from 'rxjs';
import {Baby} from './baby';

@Injectable({
  providedIn: 'root'
})
export class BabyService {

  private static readonly log = LoggerFactory.getLogger('SleepService');
  private readonly babyCollection: firebase.firestore.CollectionReference;

  constructor(
    firebaseService: FirebaseService,
    private babyDbMapper: BabyDbMapper,
    private currentBaby: CurrentBabyService) {
    this.babyCollection = firebaseService.app()
      .firestore()
      .collection('babies');
  }

  currentBaby$(): Observable<Baby> {
    BabyService.log.trace('Request for current baby');
    const subject = new Subject<Baby>();
    (this.babyCollection.doc(this.currentBaby.id())).onSnapshot(
      snapshot => {
        if (snapshot.data()) {
          subject.next(this.babyDbMapper.fromDocumentSnapshot(snapshot));
        }
      }
    );
    return subject.asObservable();
  }

}
