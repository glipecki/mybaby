import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {Observable, Subject} from 'rxjs';
import {FirebaseService} from '../../firebase/firebase.service';
import {LoggerFactory} from '../../logger/logger-factory';
import {LogRow} from './log-row';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private static readonly log = LoggerFactory.getLogger('LogsService');

  private logsCollection: firebase.firestore.CollectionReference;
  private logsQuery: firebase.firestore.Query;

  constructor(firebase: FirebaseService) {
    this.logsCollection = firebase.collection(`/logs`);
    this.logsQuery = this.logsCollection.orderBy('date', 'desc');
  }


  lastLogs(): Observable<LogRow[]> {
    LogsService.log.trace('Request for all logs');
    const subject = new Subject<LogRow[]>();
    this.logsQuery.limit(50).onSnapshot(
      snapshot => {
        subject.next(snapshot.docs.map(doc => doc.data()));
      }
    );
    return subject.asObservable();
  }

}
