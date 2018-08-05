import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {TimeSincePipe} from 'src/app/components/time-since/time-since.pipe';
import {Sleep} from 'src/app/sleep/sleep';

@Component({
  selector: 'bb-sleep-widget-summary-active',
  template: `
    <div>Bawimy się!</div>
    <div>Od ostatniego snu: {{sinceLastSleep}}</div>
  `,
  styleUrls: [
    './sleep-widget-summary-active.component.scss'
  ]
})
export class SleepWidgetSummaryActiveComponent implements OnInit, OnDestroy {

  @Input() sleep: Sleep;
  sinceLastSleep: string;
  private timeSinceSubscription: Subscription;

  constructor(private timeSince: TimeSincePipe) {
  }

  ngOnInit(): void {
    this.sinceLastSleep = this.timeSince.transform(this.sleep.end);
    this.timeSinceSubscription = interval(1000).subscribe(
      () => this.sinceLastSleep = this.timeSince.transform(this.sleep.end)
    );
  }

  ngOnDestroy(): void {
    if (this.timeSinceSubscription) {
      this.timeSinceSubscription.unsubscribe();
    }
  }

}

