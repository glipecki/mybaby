import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import {Observable, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {Breast} from 'src/app/nutrition/breast';
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
    this.meals = this.firebaseService.getApp()
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
    const doc: MealDb = {
      userId: this.authService.getUserWrapper().user.uid,
      breasts: [brest],
      date: moment().valueOf()
    };
    return fromPromise(
      this.firebaseService.getApp()
        .firestore()
        .collection('meals')
        .add(doc)
    ).pipe(
      map(() => this.mealDbToMeal(doc))
    );
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
      if (breast === Breast.LEFT) {
        return 'lewa';
      } else if (breast === Breast.RIGHT) {
        return 'prawa';
      } else {
        return 'n/a';
      }
    };
    let breasts = db.breasts.map(breast => breast === 'left' ? Breast.LEFT : Breast.RIGHT);
    return {
      breasts,
      date: moment(db.date).format(NutritionService.DATE_FORMAT),
      lastBreastString: breastToString(breasts[breasts.length - 1]),
      breastString: breasts.map(breastToString).join('+')
    };
  }

}
