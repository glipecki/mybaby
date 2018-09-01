import {Injectable} from '@angular/core';
import firebase from 'firebase/auth';
import {concat, Observable, of, Subject} from 'rxjs';
import {FirebaseService} from '../../firebase/firebase.service';
import {LoggerFactory} from '../../logger/logger-factory';
import {UserWrapper} from './user-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly log = LoggerFactory.getLogger('AuthService');
  private authenticatedSubject = new Subject<boolean>();
  private userSubject = new Subject<{}>();
  private userWrapper: UserWrapper = {
    user: undefined,
    authenticated: undefined,
    loading: true
  };

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.app().auth().onAuthStateChanged(
      (user: firebase.User) => {
        if (user.uid) {
          LoggerFactory.addContext('user', user.email);
        } else {
          LoggerFactory.removeContext('user');
        }
        this.userWrapper.user = user;
        this.userWrapper.authenticated = user !== undefined && user !== null;
        this.userWrapper.loading = false;
        AuthService.log.info('User authentication result [authenticated={}]', this.userWrapper.authenticated);
        this.userSubject.next(this.userWrapper.user);
        this.authenticatedSubject.next(this.userWrapper.authenticated);
      }
    );
  }

  getUserWrapper(): UserWrapper {
    return this.userWrapper;
  }

  getUser(): Observable<firebase.User> {
    if (this.userWrapper.loading) {
      return this.userSubject.asObservable();
    } else {
      return concat(
        of(this.userWrapper.user),
        this.userSubject.asObservable()
      )
    }
  }

  isAuthenticated(): Observable<boolean> {
    if (this.userWrapper.loading) {
      return this.authenticatedSubject.asObservable();
    } else {
      return concat(
        of(this.userWrapper.authenticated),
        this.authenticatedSubject.asObservable()
      )
    }
  }

  // TODO: change boolean to status with error message
  login(username: string, password: string): Observable<boolean> {
    const loginSubject = new Subject<boolean>();
    this.firebaseService.app()
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(
        user => {
          loginSubject.next(true);
          loginSubject.complete();
        },
        error => {
          loginSubject.next(false);
          loginSubject.complete();
        }
      )
    return loginSubject.asObservable();
  }

}
