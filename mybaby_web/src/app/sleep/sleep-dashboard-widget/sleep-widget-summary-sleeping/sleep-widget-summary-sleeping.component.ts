import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
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
  private hoursSinceSubscription: Subscription;

  constructor(private hoursSince: HoursSincePipe) {
  }

  ngOnInit(): void {
    this.sinceLastActivity = this.hoursSince.transform(this.sleep.start);
    this.hoursSinceSubscription = interval(1000).subscribe(
      () => this.sinceLastActivity = this.hoursSince.transform(this.sleep.start)
    );
  }

  ngOnDestroy(): void {
    if (this.hoursSinceSubscription) {
      this.hoursSinceSubscription.unsubscribe();
    }
  }

}
