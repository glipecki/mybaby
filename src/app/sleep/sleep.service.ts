import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import moment, {duration} from 'moment';
import {Observable, of, Subject, timer} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {flatMap, map} from 'rxjs/operators';
import {AuthService} from 'src/app/common/auth/auth.service';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
import {FirebaseService} from 'src/app/firebase/firebase.service';
import {Sleep} from 'src/app/sleep/sleep';
import {SleepDb} from 'src/app/sleep/sleep-db';
import {SleepType} from 'src/app/sleep/sleep-type';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  private readonly sleeps: firebase.firestore.Query;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private hoursSince: HoursSincePipe) {
    this.sleeps = this.firebaseService.getApp()
      .firestore()
      .collection('sleeps')
      .where('userId', '==', this.authService.getUserWrapper().user.uid)
      .orderBy('start.date', 'desc');
  }

  getLastSleep(): Observable<Sleep> {
    const subject = new Subject<Sleep>();
    this.sleeps
      .limit(1)
      .onSnapshot(
        snapshot => {
          if (snapshot.docs.length > 0) {
            subject.next(this.sleepDbToSleep(snapshot.docs[0].data() as SleepDb))
          }
        }
      );
    return subject.asObservable();
  }

  getSleeps(): Observable<Sleep[]> {
    const subject = new Subject<Sleep[]>();
    this.sleeps.onSnapshot(
      snapshot => {
        subject.next(snapshot.docs.map(doc => this.sleepDbToSleep(doc.data() as SleepDb)));
      }
    );
    return subject.asObservable();
  }

  startSleep(date: string, time: string): Observable<Sleep> {
    // TODO: jeżeli sen szybciej niż po X minutach to odwołaj datę end poprzedniego (z potwierdzeniem?
    const startDate = moment(`${date} ${time}`);
    return fromPromise(
      this.sleeps.limit(1).get()
    ).pipe(
      map(queryResult => {
        if (queryResult && queryResult.size === 1) {
          return {
            docSnapshot: queryResult.docs[0],
            sleepDb: queryResult.docs[0].data() as SleepDb
          }
        } else {
          return undefined;
        }
      }),
      map((queryResult): SleepDb => {
        const sleepDb: SleepDb = {
          babyId: 'oezcGwNonYiNDsYQ6B8g',
          userId: this.authService.getUserWrapper().user.uid,
          type: SleepType.current,
          start: {
            date: startDate.format('YYYY-MM-DD HH:mm'),
            timestamp: startDate.valueOf()
          },
        };
        if (queryResult && queryResult.sleepDb.end) {
          const activityStart = moment(queryResult.sleepDb.end.date);
          const activityDuration = duration(startDate.diff(activityStart));
          sleepDb.activityBefore = {
            text: this.hoursSince.asTime(activityDuration),
            time: activityDuration.asSeconds()
          };
        }
        return sleepDb;
      }),
      flatMap(sleepDb => fromPromise(
        this.firebaseService.getApp()
          .firestore()
          .collection('sleeps')
          .add(sleepDb)
      )),
      flatMap(docRef => fromPromise(docRef.get())),
      map(doc => this.sleepDbToSleep(doc.data() as SleepDb))
    );
  }

  endSleep(date: string, time: string): Observable<Sleep> {
    // TODO: jeżeli sen krótszy niż X minut to usuń wpis (z potwierdzeniem?)
    // TODO: odgadnij i ustaw typ snu (po godzine X i dłuższy niż Y to nocny)
    const endDate = moment(`${date} ${time}`);
    return fromPromise(
      this.sleeps
        .limit(1)
        .get()
    ).pipe(
      map(result => result.docs[0]),
      flatMap(sleep => {
        const sleepStart = moment((sleep.data() as SleepDb).start.date);
        const sleepDuration = duration(endDate.diff(sleepStart));
        const longSleepAtNightTime = sleepStart.hours() >= 19 && sleepDuration.asHours() >= 4;
        return fromPromise(
          sleep.ref.update(<Partial<SleepDb>>{
            type: longSleepAtNightTime ? SleepType.night : SleepType.day,
            end: {
              date: endDate.format('YYYY-MM-DD HH:mm'),
              timestamp: endDate.valueOf()
            },
            sleep: {
              text: this.hoursSince.asTime(sleepDuration),
              time: sleepDuration.asSeconds()
            }
          })
        ).pipe(
          map(() => sleep.ref)
        )
      }),
      flatMap(docRef => fromPromise(docRef.get())),
      map(doc => this.sleepDbToSleep(doc.data() as SleepDb))
    );
  }

  resumeLastSleep(): Observable<Sleep> {
    return timer(3000).pipe(
      map(() => null)
    );
  }

  cancelLastSleep(): Observable<Sleep> {
    return timer(3000).pipe(
      map(() => null)
    );
  }

  private sleepDbToSleep(db: SleepDb): Sleep {
    return {
      type: SleepType[db.type],
      typeString: undefined,
      start: db.start.date,
      startHour: moment(db.start.date).format('HH:mm'),
      end: db.end ? db.end.date : undefined,
      endHour: db.end ? moment(db.end.date).format('HH:mm') : undefined,
      sleep: db.sleep ? {
        text: db.sleep.text,
        time: db.sleep.time
      } : undefined,
      activityBefore: db.activityBefore ? {
        text: db.activityBefore.text,
        time: db.activityBefore.time
      } : undefined
    };
  }

}
