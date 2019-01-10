import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Baby} from './baby';
import {BabyDb} from './baby-db';

@Injectable({
  providedIn: 'root'
})
export class BabyDbMapper {

  fromDocumentSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Baby {
    const id = snapshot.id;
    const data = snapshot.data() as BabyDb;
    return {
      id,
      ...data
    };
  }

}
