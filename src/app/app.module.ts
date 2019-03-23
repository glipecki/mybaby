import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BabyInfoWidgetComponent} from 'src/app/babies/baby-info-widget/baby-info-widget.component';
import {DateTimePickerComponent} from 'src/app/components/date-time-picker/date-time-picker.component';
import {ListWithDayGroupingComponent} from 'src/app/components/list-with-day-groupping/list-with-day-grouping.component';
import {OperationWithConfirmComponent} from 'src/app/components/operation-with-confirm/operation-with-confirm.component';
import {HoursSincePipe} from 'src/app/components/hours-since/hours-since.pipe';
import {PastSleepsAvgDaySleepPipe} from 'src/app/sleep/past-sleeps/past-sleeps-avg-day-sleep.pipe';
import {PastSleepsSumDaySleepPipe} from 'src/app/sleep/past-sleeps/past-sleeps-sum-day-sleep.pipe';
import {PastSleepsSumNightSleepPipe} from 'src/app/sleep/past-sleeps/past-sleeps-sum-night-sleep.pipe';
import {PastSleepsSumSleepPipe} from 'src/app/sleep/past-sleeps/past-sleeps-sum-sleep.pipe';
import {PastSleepsComponent} from 'src/app/sleep/past-sleeps/past-sleeps.component';
import {SleepDashboardWidgetComponent} from 'src/app/sleep/sleep-dashboard-widget/sleep-dashboard-widget.component';
import {SleepWidgetSleepChangeComponent} from 'src/app/sleep/sleep-dashboard-widget/sleep-widget-sleep-change/sleep-widget-sleep-change.component';
import {SleepWidgetSummaryActiveComponent} from 'src/app/sleep/sleep-dashboard-widget/sleep-widget-summary-active/sleep-widget-summary-active.component';
import {SleepWidgetSummarySleepingComponent} from 'src/app/sleep/sleep-dashboard-widget/sleep-widget-summary-sleeping/sleep-widget-summary-sleeping.component';
import {environment} from '../environments/environment';
import {LogsComponent} from './admin/logs/logs.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonComponent} from './components/button/button.component';
import {CardComponent} from './components/card/card.component';
import {DashboardWidgetComponent} from './components/dashboard-widget/dashboard-widget.component';
import {FlatButtonComponent} from './components/flat-button/flat-button.component';
import {DaysSincePipe} from './components/days-since/days-since.pipe';
import {TimeSincePipe} from './components/time-since/time-since.pipe';
import {WeekSincePipe} from './components/week-since/week-since.pipe';
import {BottomMenuItemComponent} from './host/bottom-menu/bottom-menu-item/bottom-menu-item.component';
import {BottomMenuComponent} from './host/bottom-menu/bottom-menu.component';
import {DashboardComponent} from './host/dashboard/dashboard.component';
import {LoginComponent} from './host/login/login.component';
import {PageNotFoundComponent} from './host/page-not-found/page-not-found.component';
import {NutritionDashboardWidgetComponent} from './nutrition/nutrition-dashboard-widget/nutrition-dashboard-widget.component';
import {PastNutritionsComponent} from './nutrition/past-nutritions/past-nutritions.component';
import {PoopWidgetComponent} from './poop/poop-widget/poop-widget.component';
import {PoopsComponent} from './poop/poops/poops.component';
import { LoadMoreByWeekComponent } from './components/load-more-by-week/load-more-by-week.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomMenuComponent,
    DashboardComponent,
    BottomMenuItemComponent,
    PageNotFoundComponent,
    CardComponent,
    NutritionDashboardWidgetComponent,
    PastNutritionsComponent,
    DashboardWidgetComponent,
    ButtonComponent,
    FlatButtonComponent,
    HoursSincePipe,
    LoginComponent,
    SleepDashboardWidgetComponent,
    OperationWithConfirmComponent,
    DateTimePickerComponent,
    SleepWidgetSummarySleepingComponent,
    SleepWidgetSummaryActiveComponent,
    SleepWidgetSleepChangeComponent,
    PastSleepsComponent,
    ListWithDayGroupingComponent,
    PastSleepsAvgDaySleepPipe,
    PastSleepsSumDaySleepPipe,
    PastSleepsSumNightSleepPipe,
    PastSleepsSumSleepPipe,
    BabyInfoWidgetComponent,
    DaysSincePipe,
    WeekSincePipe,
    PoopsComponent,
    PoopWidgetComponent,
    TimeSincePipe,
    LogsComponent,
    LoadMoreByWeekComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    HoursSincePipe,
    DaysSincePipe,
    TimeSincePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
