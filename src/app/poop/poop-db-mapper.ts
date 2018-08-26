import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {Poop} from './poop';

@Injectable({
  providedIn: 'root'
})
export class PoopDbMapper {

  fromDocumentSnapshot(doc: firebase.firestore.DocumentSnapshot): Poop {
    return {
      id: doc.id,
      date: doc.data().date,
      size: doc.data().size
    };
  }

}
