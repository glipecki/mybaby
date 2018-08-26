import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import moment from 'moment';
import {Observable, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {flatMap, map} from 'rxjs/operators';
import {Breast} from 'src/app/nutrition/breast';
import {BreastDb} from 'src/app/nutrition/breast-db';
import {AuthService} from '../common/auth/auth.service';
import {FirebaseService} from '../firebase/firebase.service';
import {Meal} from './meal';
import {MealDb} from './meal-db';

/**
 * TODO:
 * - zmiana modelu? być może drzewko
 * /baby/{babyId}/meals/{meal}
 * /baby/{babyId}/measurements/{measurement}
 * /baby/{babyId}/sleeps/{sleep}
 * ?
 * - nasłuchiwanie na zmiany i rozgłaszanie zdarzeń
 *   być może w tym celu będzie potrzebna tablica i jej aktualizacje? wtedy data binding załatwi sprawę?
 *   a może za każdym razem info że wróciły wszystkie?
 */

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  private static readonly DATE_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';
  private readonly meals: firebase.firestore.Query;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
    this.meals = this.firebaseService.app()
      .firestore()
      .collection('meals')
      .where('userId', '==', this.authService.getUserWrapper().user.uid)
      .orderBy('date', 'desc');
  }

  getLastMeal(): Observable<Meal> {
    const subject = new Subject<Meal>();
    this.meals
      .limit(1)
      .onSnapshot(
        snapshot => {
          if (snapshot.docs.length > 0) {
            subject.next(this.mealDbToMeal(snapshot.docs[0].data() as MealDb))
          }
        }
      );
    return subject.asObservable();
  }

  addMeal(brest: Breast): Observable<Meal> {
    const timestamp: number = moment().valueOf();
    const date: string = moment(timestamp).format(NutritionService.DATE_FORMAT);
    const mealBreast: BreastDb = {
      breast: brest,
      timestamp: timestamp,
      date: date
    };
    return fromPromise(
      this.meals.limit(1).get()
    ).pipe(
      map(queryResult => {
        if (queryResult && queryResult.size === 1) {
          return {
            docSnapshot: queryResult.docs[0],
            mealDb: queryResult.docs[0].data() as MealDb
          };
        } else {
          return undefined;
        }
      }),
      flatMap(queryResult => {
        if (queryResult && this.elapsedMinutes(queryResult) <= 30) {
          const newBreasts: BreastDb[] = [...queryResult.mealDb.breasts, mealBreast];
          return fromPromise(
            queryResult.docSnapshot.ref.update('breasts', newBreasts)
          ).pipe(
            map(() => queryResult.docSnapshot.ref)
          );
        } else {
          const meal: MealDb = {
            userId: this.authService.getUserWrapper().user.uid,
            babyId: 'oezcGwNonYiNDsYQ6B8g',
            breasts: [mealBreast],
            timestamp: moment().valueOf(),
            date: date
          };
          return fromPromise(
            this.firebaseService.app()
              .firestore()
              .collection('meals')
              .add(meal)
          );
        }
      }),
      flatMap(docRef => fromPromise(docRef.get())),
      map(doc => this.mealDbToMeal(doc.data() as MealDb))
    );
  }

  private elapsedMinutes(queryResult) {
    return moment.duration(moment().diff(moment(queryResult.mealDb.date))).asMinutes();
  }

  getMeals(): Observable<Meal[]> {
    const subject = new Subject<Meal[]>();
    this.meals.onSnapshot(
      snapshot => {
        subject.next(snapshot.docs.map(doc => this.mealDbToMeal(doc.data() as MealDb)));
      }
    );
    return subject.asObservable();
  }

  private mealDbToMeal(db: MealDb): Meal {
    const breastToString: (breast: Breast) => string = breast => {
      if (breast === Breast.left) {
        return 'lewa';
      } else if (breast === Breast.right) {
        return 'prawa';
      } else {
        return 'n/a';
      }
    };
    let breasts = db.breasts
      .map(breast => breast.breast)
      .map(breast => Breast[breast]);
    return {
      breasts,
      date: db.date,
      lastBreastString: breastToString(breasts[breasts.length - 1]),
      lastBreast: breasts[breasts.length - 1],
      breastsString: breasts.map(breastToString).join('+')
    };
  }

}
