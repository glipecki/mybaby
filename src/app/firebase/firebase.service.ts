import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private readonly app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp({
      apiKey: 'AIzaSyDSHLNEIAum979wzcwywkwUQqqGBOh559k',
      authDomain: 'mybaby-fd205.firebaseapp.com',
      databaseURL: 'https://mybaby-fd205.firebaseio.com',
      projectId: 'mybaby-fd205',
      storageBucket: 'mybaby-fd205.appspot.com',
      messagingSenderId: '830840439048'
    });
    this.app.firestore().settings({
      timestampsInSnapshots: true
    });
  }

  getApp(): firebase.app.App {
    return this.app;
  }

}
