import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PastSleepsComponent} from 'src/app/sleep/past-sleeps/past-sleeps.component';
import {UserAuthenticatedGuard} from './common/auth/user-authenticated.guard';
import {DashboardComponent} from './host/dashboard/dashboard.component';
import {LoginComponent} from './host/login/login.component';
import {PageNotFoundComponent} from './host/page-not-found/page-not-found.component';
import {PastNutritionsComponent} from './nutrition/past-nutritions/past-nutritions.component';

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
    path: 'login',
    component: LoginComponent
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
