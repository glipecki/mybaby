import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Logs} from 'selenium-webdriver';
import {PastSleepsComponent} from 'src/app/sleep/past-sleeps/past-sleeps.component';
import {LogsComponent} from './admin/logs/logs.component';
import {UserAuthenticatedGuard} from './common/auth/user-authenticated.guard';
import {DashboardComponent} from './host/dashboard/dashboard.component';
import {LoginComponent} from './host/login/login.component';
import {PageNotFoundComponent} from './host/page-not-found/page-not-found.component';
import {PastNutritionsComponent} from './nutrition/past-nutritions/past-nutritions.component';
import {WeanScheduleComponent} from './nutrition/wean-schedule/wean-schedule.component';
import {PoopsComponent} from './poop/poops/poops.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserAuthenticatedGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'nutrition',
    component: PastNutritionsComponent,
    canActivate: [UserAuthenticatedGuard]
  },
  {
    path: 'sleep',
    component: PastSleepsComponent,
    canActivate: [UserAuthenticatedGuard]
  },
  {
    path: 'poop',
    component: PoopsComponent,
    canActivate: [UserAuthenticatedGuard]
  },
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [UserAuthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'wean',
    component: WeanScheduleComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
