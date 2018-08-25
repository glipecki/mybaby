import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import moment from 'moment';
import {Sleep} from './sleep';
import {SleepDb} from './sleep-db';
import {SleepType} from './sleep-type';

@Injectable({
  providedIn: 'root'
})
export class SleepDbMapper {

  fromDocumentSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Sleep {
    const id = snapshot.id;
    const data = snapshot.data() as SleepDb;
    return {
      id: id,
      type: SleepType[data.type],
      typeString: undefined,
      start: data.start.date,
      startHour: moment(data.start.date).format('HH:mm'),
      end: data.end ? data.end.date : undefined,
      endHour: data.end ? moment(data.end.date).format('HH:mm') : undefined,
      sleep: data.sleep ? {
        text: data.sleep.text,
        time: data.sleep.time
      } : undefined,
      activityBefore: data.activityBefore ? {
        text: data.activityBefore.text,
        time: data.activityBefore.time
      } : undefined
    };
  }

}
