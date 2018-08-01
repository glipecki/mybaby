import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'bb-root',
  template: `
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    <div class="app-update" *ngIf="appUpdate">
      <bb-button (click)="refreshApp()">Dostępna jest nowa wersja - odśwież!</bb-button>
    </div>
    <bb-bottom-menu></bb-bottom-menu>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appUpdate: {};

  constructor(swUpdate: SwUpdate) {
    if (swUpdate.isEnabled) {
      swUpdate.available.subscribe(
        update => {
          console.log(update);
          this.appUpdate = {}
        }
      );
    }
  }

  refreshApp() {
    window.location.reload();
  }

}
