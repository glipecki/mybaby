import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {Observable, Subject} from 'rxjs';
import {CurrentBabyService} from '../common/baby/current-baby.service';
import {FirebaseService} from '../firebase/firebase.service';
import {LoggerFactory} from '../logger/logger-factory';
import {Poop, PoopSize} from './poop';
import {PoopDb} from './poop-db';
import {PoopDbMapper} from './poop-db-mapper';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PoopService {

  private static readonly log = LoggerFactory.getLogger('PoopService');
  private static readonly DATE_FORMAT = 'YYYY-MM-DD HH:mm';
  private poops: firebase.firestore.CollectionReference;
  private poopsQuery: firebase.firestore.Query;

  constructor(firebase: FirebaseService, baby: CurrentBabyService, private poopDbMapper: PoopDbMapper) {
    this.poops = firebase.collection(`/babies/${baby.id()}/poops`);
    this.poopsQuery = this.poops.orderBy('date', 'desc');
  }

  poops$(): Observable<Poop[]> {
    PoopService.log.trace('Request for all poops');
    const subject = new Subject<Poop[]>();
    this.poopsQuery.onSnapshot(
      snapshot => {
        subject.next(snapshot.docs.map(doc => this.poopDbMapper.fromDocumentSnapshot(doc)));
      }
    );
    return subject.asObservable();
  }

  lastPoop$(): Observable<Poop> {
    PoopService.log.trace('Request for last poop');
    const subject = new Subject<Poop>();
    this.poopsQuery.limit(1).onSnapshot(
      snapshot => {
        if (snapshot.docs.length > 0) {
          subject.next(this.poopDbMapper.fromDocumentSnapshot(snapshot.docs[0]))
        }
      }
    );
    return subject.asObservable();
  }

  async add(size: PoopSize, date: moment.Moment): Promise<Poop> {
    PoopService.log.info('Add poop [size={}, date={}]', size, date.format(PoopService.DATE_FORMAT));
    const poop: PoopDb = {
      date: date.format(PoopService.DATE_FORMAT),
      size: size
    };
    const document = await this.poops.add(poop);
    return this.poopDbMapper.fromDocumentSnapshot(await document.get());
  }

}
