import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {TimeSincePipe} from 'src/app/components/time-since/time-since.pipe';
import {Sleep} from 'src/app/sleep/sleep';

@Component({
  selector: 'bb-sleep-widget-summary-sleeping',
  template: `
    <div>Hasiamy...</div>
    <div>Czas snu: {{sinceLastActivity}}</div>
  `,
  styleUrls: [
    './sleep-widget-summary-sleeping.component.scss'
  ]
})
export class SleepWidgetSummarySleepingComponent implements OnInit, OnDestroy {

  @Input() sleep: Sleep;
  sinceLastActivity: string;
  private timeSinceSubscription: Subscription;

  constructor(private timeSince: TimeSincePipe) {
  }

  ngOnInit(): void {
    this.sinceLastActivity = this.timeSince.transform(this.sleep.start);
    this.timeSinceSubscription = interval(1000).subscribe(
      () => this.sinceLastActivity = this.timeSince.transform(this.sleep.start)
    );
  }

  ngOnDestroy(): void {
    if (this.timeSinceSubscription) {
      this.timeSinceSubscription.unsubscribe();
    }
  }

}
