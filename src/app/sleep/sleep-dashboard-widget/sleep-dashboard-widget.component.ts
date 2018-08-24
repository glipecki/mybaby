import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faBed} from '@fortawesome/free-solid-svg-icons/faBed';
import {faVolleyballBall} from '@fortawesome/free-solid-svg-icons/faVolleyballBall';
import {DashboardWidgetComponent} from 'src/app/components/dashboard-widget/dashboard-widget.component';
import {Sleep} from 'src/app/sleep/sleep';
import {SleepDateSelected} from 'src/app/sleep/sleep-dashboard-widget/sleep-widget-sleep-change/sleep-date-selected';
import {SleepService} from 'src/app/sleep/sleep.service';

@Component({
  selector: 'bb-sleep-dashboard-widget',
  template: `
    <bb-dashboard-widget [header]="'Spanie'" [icon]="icon" [hasExpandableContent]="true">
      <div class="summary" *ngIf="lastSleep; else lastSleepLoading">
        <bb-sleep-widget-summary-active *ngIf="isActive()"
                                        [sleep]="lastSleep">
        </bb-sleep-widget-summary-active>
        <bb-sleep-widget-summary-sleeping *ngIf="isSleeping()"
                                          [sleep]="lastSleep">
        </bb-sleep-widget-summary-sleeping>
      </div>
      <div class="actions">
        <ng-container *ngIf="!inProgress && !status">
          <bb-sleep-widget-sleep-change *ngIf="isActive()"
                                        [text]="'start'"
                                        (select)="startDateSelected($event)">
          </bb-sleep-widget-sleep-change>
          <bb-sleep-widget-sleep-change *ngIf="isSleeping()"
                                        [text]="'koniec'"
                                        (select)="endDateSelected($event)">
          </bb-sleep-widget-sleep-change>
        </ng-container>
        <ng-container *ngIf="inProgress">
          zapisywanie...
        </ng-container>
        <div class="action-status" *ngIf="status">
          {{status}}
        </div>
      </div>
      <ng-container expandable-content>
        <ng-container *ngIf="isActive()">
          <bb-button (click)="resumeLastSleep()">wznów drzemkę</bb-button>
        </ng-container>
        <ng-container *ngIf="isSleeping()">
          <bb-button (click)="cancelLastSleep()">odwołaj drzemkę</bb-button>
        </ng-container>
      </ng-container>
    </bb-dashboard-widget>
    <ng-template #lastSleepLoading>
      ...
    </ng-template>
  `,
  styleUrls: ['./sleep-dashboard-widget.component.scss']
})
export class SleepDashboardWidgetComponent implements OnInit, OnDestroy {

  inProgress = false;
  status: string = undefined;
  icon = faBed;
  lastSleep: Sleep;

  @ViewChild(DashboardWidgetComponent) private widget: DashboardWidgetComponent;

  constructor(private service: SleepService) {
  }

  ngOnInit(): void {
    this.service.getLastSleep().subscribe(
      sleep => {
        this.lastSleep = sleep;
        this.icon = this.isActive() ? faVolleyballBall : faBed;
      }
    );
  }

  ngOnDestroy(): void {
  }

  isActive(): boolean {
    return !this.lastSleep || this.lastSleep.end !== undefined;
  }

  isSleeping(): boolean {
    return this.lastSleep && this.lastSleep.end === undefined;
  }

  startDateSelected($event: SleepDateSelected) {
    this.inProgress = true;
    this.service.startSleep($event.date, $event.time).subscribe(
      sleep => {
        this.inProgress = false;
        this.flashStatusMessage('Zapisano');
      }
    );
  }

  endDateSelected($event: SleepDateSelected) {
    this.inProgress = true;
    this.service.endSleep($event.date, $event.time).subscribe(
      sleep => {
        this.inProgress = false;
        this.flashStatusMessage('Zapisano');
      }
    );
  }

  resumeLastSleep() {
    this.widget.hideExpandableContent();
    this.inProgress = true;
    this.service.resumeLastSleep().subscribe(
      sleep => {
        this.inProgress = false;
        this.flashStatusMessage('Zapisano');
      }
    );
  }

  cancelLastSleep() {
    this.widget.hideExpandableContent();
    this.inProgress = true;
    this.service.cancelLastSleep().subscribe(
      sleep => {
        this.inProgress = false;
        this.flashStatusMessage('Zapisano');
      }
    );
  }

  private flashStatusMessage(message: string) {
    this.status = message;
    setTimeout(
      () => this.status = undefined,
      1000
    );
  }

}
