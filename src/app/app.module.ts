import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DateTimePickerComponent} from 'src/app/components/date-time-picker/date-time-picker.component';
import {ListWithDayGroupingComponent} from 'src/app/components/list-with-day-groupping/list-with-day-grouping.component';
import {OperationWithConfirmComponent} from 'src/app/components/operation-with-confirm/operation-with-confirm.component';
import {PastSleepsComponent} from 'src/app/sleep/past-sleeps/past-sleeps.component';
import {SleepDashboardWidgetComponent} from 'src/app/sleep/sleep-dashboard-widget/sleep-dashboard-widget.component';
import {SleepWidgetSleepChangeComponent} from 'src/app/sleep/sleep-dashboard-widget/sleep-widget-sleep-change/sleep-widget-sleep-change.component';
import {SleepWidgetSummaryActiveComponent} from 'src/app/sleep/sleep-dashboard-widget/sleep-widget-summary-active/sleep-widget-summary-active.component';
import {SleepWidgetSummarySleepingComponent} from 'src/app/sleep/sleep-dashboard-widget/sleep-widget-summary-sleeping/sleep-widget-summary-sleeping.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CardComponent} from './components/card/card.component';
import {BottomMenuItemComponent} from './host/bottom-menu/bottom-menu-item/bottom-menu-item.component';
import {BottomMenuComponent} from './host/bottom-menu/bottom-menu.component';
import {DashboardComponent} from './host/dashboard/dashboard.component';
import {PageNotFoundComponent} from './host/page-not-found/page-not-found.component';
import {NutritionDashboardWidgetComponent} from './nutrition/nutrition-dashboard-widget/nutrition-dashboard-widget.component';
import {PastNutritionsComponent} from './nutrition/past-nutritions/past-nutritions.component';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import { ButtonComponent } from './components/button/button.component';
import { FlatButtonComponent } from './components/flat-button/flat-button.component';
import { TimeSincePipe } from './components/time-since/time-since.pipe';
import { LoginComponent } from './host/login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    TimeSincePipe,
    LoginComponent,
    SleepDashboardWidgetComponent,
    OperationWithConfirmComponent,
    DateTimePickerComponent,
    SleepWidgetSummarySleepingComponent,
    SleepWidgetSummaryActiveComponent,
    SleepWidgetSleepChangeComponent,
    PastSleepsComponent,
    ListWithDayGroupingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    TimeSincePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
