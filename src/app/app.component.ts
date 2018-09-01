import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {faSync} from '@fortawesome/free-solid-svg-icons/faSync';
import {Observable} from 'rxjs';
import {NetworkStatusService} from './common/network/network-status.service';
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
    <div class="refresh" (click)="refreshApp()">
      <div class="label">odśwież</div>
      <div><fa-icon [icon]="refreshIcon"></fa-icon></div>
    </div>
    <bb-bottom-menu></bb-bottom-menu>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  static readonly log = LoggerFactory.getLogger('AppComponent');
  appUpdate: {};
  isOnline$: Observable<boolean>;
  refreshIcon = faSync;

  constructor(swUpdate: SwUpdate, firebaseService: FirebaseService, networkStatus: NetworkStatusService) {
    if (swUpdate.isEnabled) {
      swUpdate.available.subscribe(
        () => {
          AppComponent.log.info('App update available for user');
          this.appUpdate = {}
        }
      );
    }
    this.isOnline$ = networkStatus.isOnline();
  }

  refreshApp() {
    AppComponent.log.info('User forced app refresh');
    window.location.reload();
  }

}
