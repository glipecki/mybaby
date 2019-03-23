import {Injectable} from '@angular/core';
import {Optional} from '@glipecki/optional';
import * as firebase from 'firebase';
import moment, {duration} from 'moment';
import {Observable, Subject} from 'rxjs';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
import {FirebaseService} from 'src/app/firebase/firebase.service';
import {Sleep} from 'src/app/sleep/sleep';
import {SleepDb} from 'src/app/sleep/sleep-db';
import {SleepType} from 'src/app/sleep/sleep-type';
import {CurrentBabyService} from '../common/baby/current-baby.service';
import {LoggerFactory} from '../logger/logger-factory';
import {SleepDbMapper} from './sleep-db-mapper';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  private static readonly log = LoggerFactory.getLogger('BabyService');
  private static readonly DATE_FORMAT = 'YYYY-MM-DD HH:mm';
  private readonly sleepCollection: firebase.firestore.CollectionReference;

  constructor(
    firebaseService: FirebaseService,
    private currentBaby: CurrentBabyService,
    private hoursSince: HoursSincePipe,
    private sleepDbMapper: SleepDbMapper) {
    this.sleepCollection = firebaseService.app()
      .firestore()
      .collection('sleeps');
  }

  lastSleep$(): Observable<Sleep> {
    SleepService.log.trace('Request for last sleep');
    const subject = new Subject<Sleep>();
    this.sleepQuery().limit(1).onSnapshot(
      snapshot => {
        if (snapshot.docs.length > 0) {
          subject.next(this.sleepDbMapper.fromDocumentSnapshot(snapshot.docs[0]));
        }
      }
    );
    return subject.asObservable();
  }

  sleeps$(date?: string): Observable<Sleep[]> {
    SleepService.log.trace('Request for all sleeps');
    const subject = new Subject<Sleep[]>();
    const query = date ? this.sleepQuery().where('start.date', '>', date) : this.sleepQuery();
    query.onSnapshot(
      snapshot => {
        subject.next(snapshot.docs.map(doc => this.sleepDbMapper.fromDocumentSnapshot(doc)));
      }
    );
    return subject.asObservable();
  }

  async start(date: moment.Moment): Promise<Sleep> {
    SleepService.log.info('Start sleep [date={}]', date.format(SleepService.DATE_FORMAT));
    const sleep: SleepDb = {
      type: SleepType.current,
      babyId: this.currentBaby.id(),
      start: {
        date: date.format(SleepService.DATE_FORMAT)
      }
    };
    const previous = await this.lastSleep();
    previous
      .map(prev => prev.data() as SleepDb)
      .map(prev => this.activityBetween(moment(prev.end.date), date))
      .ifPresent(activity => sleep.activityBefore = activity);
    const document = await this.sleepCollection.add(sleep);
    return this.sleepDbMapper.fromDocumentSnapshot(await document.get());
  }

  async end(id: string, date: moment.Moment): Promise<Sleep> {
    SleepService.log.info('End sleep [id={}, date={}]', id, date.format(SleepService.DATE_FORMAT));
    const previousSleep = (await this.sleep(id)).orThrow(() => new Error('Sleep with expected id not found'));
    const sleepStart = moment((previousSleep.data() as SleepDb).start.date);
    const sleepDuration = duration(date.diff(sleepStart));
    const longSleepAtNightTime = sleepStart.hours() >= 19 && sleepDuration.asHours() >= 4;
    await previousSleep.ref.update({
      type: longSleepAtNightTime ? SleepType.night : SleepType.day,
      end: {
        date: date.format(SleepService.DATE_FORMAT)
      },
      sleep: {
        text: this.hoursSince.asTime(sleepDuration),
        time: sleepDuration.asSeconds()
      }
    });
    const updatedSleepDocument = await previousSleep.ref.get();
    return this.sleepDbMapper.fromDocumentSnapshot(updatedSleepDocument);
  }

  async resume(id: string): Promise<Sleep> {
    SleepService.log.info('Resume sleep [id={}]', id);
    const sleep = (await this.sleep(id)).orThrow(() => new Error('Sleep with expected id not found'));
    await sleep.ref.update({
      end: null,
      sleep: null,
      type: SleepType.current
    });
    const updatedDocument = await sleep.ref.get();
    return this.sleepDbMapper.fromDocumentSnapshot(updatedDocument);
  }

  async cancel(id: string): Promise<void> {
    SleepService.log.info('Cancel sleep [id={}]', id);
    const sleep = (await this.sleep(id)).orThrow(() => new Error('Sleep with expected id not found'));
    await sleep.ref.delete();
  }

  private async lastSleep(): Promise<Optional<firebase.firestore.QueryDocumentSnapshot>> {
    try {
      const sleep = await this.sleepQuery().limit(1).get();
      return Optional.of(sleep.docs).map(d => d[0])
    } catch (error) {
      return Optional.empty();
    }
  }

  private activityBetween(before: moment.Moment, now: moment.Moment) {
    const activityDuration = duration(now.diff(before));
    return {
      text: this.hoursSince.asTime(activityDuration),
      time: activityDuration.asSeconds()
    };
  }

  private async sleep(id: string): Promise<Optional<firebase.firestore.QueryDocumentSnapshot>> {
    return Optional.of(await this.sleepCollection.doc(id).get());
  }

  private sleepQuery(): firebase.firestore.Query {
    return this.sleepCollection
      .where('babyId', '==', this.currentBaby.id())
      .orderBy('start.date', 'desc');
  }

}
