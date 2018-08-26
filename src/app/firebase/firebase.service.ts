import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import {merge, Observable, of, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {FirebaseLogAppender} from '../logger/firebase-log-appender';
import {LoggerFactory} from '../logger/logger-factory';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private static readonly log = LoggerFactory.getLogger('FirebaseService');
  private readonly _app: firebase.app.App;
  private readonly online = new Subject<boolean>();

  constructor() {
    this._app = firebase.initializeApp({
      apiKey: 'AIzaSyDSHLNEIAum979wzcwywkwUQqqGBOh559k',
      authDomain: 'mybaby-fd205.firebaseapp.com',
      databaseURL: 'https://mybaby-fd205.firebaseio.com',
      projectId: 'mybaby-fd205',
      storageBucket: 'mybaby-fd205.appspot.com',
      messagingSenderId: '830840439048'
    });
    this._app.firestore().settings({
      timestampsInSnapshots: true
    });
    this._app.firestore().enablePersistence().then(() => {
      FirebaseService.log.info('Offline persistence enabled');
    }, () => {
      FirebaseService.log.warn('Offline persistence not available');
    });
    if (true || environment.production) {
      LoggerFactory.addAppender(
        new FirebaseLogAppender(
          this.app().firestore().collection('logs'),
          window.location.host
        )
      );
    }
    window.addEventListener('offline', () => this.online.next(false));
    window.addEventListener('online', () => this.online.next(true));
  }

  isOnline(): Observable<boolean> {
    return merge(
      of(window.navigator.onLine),
      this.online
    );
  }

  app(): firebase.app.App {
    return this._app;
  }

  firestore(): firebase.firestore.Firestore {
    return this.app().firestore()
  }

  collection(path: string): firebase.firestore.CollectionReference {
    return this.firestore().collection(path);
  }

}
