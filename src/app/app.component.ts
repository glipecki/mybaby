import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {FirebaseService} from './firebase/firebase.service';
import {LoggerFactory} from './logger/logger-factory';

@Component({
  selector: 'bb-root',
  template: `
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    <div class="app-update" *ngIf="appUpdate">
      <bb-button (click)="refreshApp()">Dostępna jest nowa wersja - odśwież!</bb-button>
    </div>
    <div class="offline" *ngIf="!(isOnline$ | async)" (click)="refreshApp()">
      Uwaga! Jesteś offline!
    </div>
    <bb-bottom-menu></bb-bottom-menu>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  static readonly log = LoggerFactory.getLogger('AppComponent');
  appUpdate: {};
  isOnline$: Observable<boolean>;

  constructor(swUpdate: SwUpdate, firebaseService: FirebaseService) {
    if (swUpdate.isEnabled) {
      swUpdate.available.subscribe(
        update => {
          AppComponent.log.info('App update available for user');
          this.appUpdate = {}
        }
      );
    }
    this.isOnline$ = firebaseService.isOnline();
    firebaseService.isOnline()
      .subscribe(online => {
        if (!online) {
          AppComponent.log.warn('User went offline!')
        }
      });
  }

  refreshApp() {
    window.location.reload();
  }

}
