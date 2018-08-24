import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
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
  private hoursSinceSubscription: Subscription;

  constructor(private hoursSince: HoursSincePipe) {
  }

  ngOnInit(): void {
    this.sinceLastSleep = this.hoursSince.transform(this.sleep.end);
    this.hoursSinceSubscription = interval(1000).subscribe(
      () => this.sinceLastSleep = this.hoursSince.transform(this.sleep.end)
    );
  }

  ngOnDestroy(): void {
    if (this.hoursSinceSubscription) {
      this.hoursSinceSubscription.unsubscribe();
    }
  }

}

