import {Injectable} from '@angular/core';
import {faBed} from '@fortawesome/free-solid-svg-icons/faBed';
import {faChartPie} from '@fortawesome/free-solid-svg-icons/faChartPie';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faPoo} from '@fortawesome/free-solid-svg-icons/faPoo';
import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
import {faWeight} from '@fortawesome/free-solid-svg-icons/faWeight';
import {Observable, of} from 'rxjs';
import {RoutingPaths} from '../routing/routing-paths';
import {BottomMenuItem} from './bottom-menu-item';
import {BottomMenuItemIconType} from './bottom-menu-item-icon-type';

@Injectable({
  providedIn: 'root'
})
export class BottomMenuService {

  constructor() {
  }

  getItems(): Observable<BottomMenuItem[]> {
    return of([
      {
        iconType: BottomMenuItemIconType.FAS,
        icon: faHome,
        routingPath: RoutingPaths.Dashboard
      },
      {
        iconType: BottomMenuItemIconType.FAS,
        icon: faUtensils,
        routingPath: RoutingPaths.Nutrition
      },
      {
        iconType: BottomMenuItemIconType.FAS,
        icon: faBed,
        routingPath: RoutingPaths.Sleep
      },
      // {
      //   iconType: BottomMenuItemIconType.FAS,
      //   icon: faPoo,
      //   routingPath: RoutingPaths.Poop
      // },
      // {
      //   iconType: BottomMenuItemIconType.FAS,
      //   icon: faWeight,
      //   routingPath: RoutingPaths.Default
      // },
      // {
      //   iconType: BottomMenuItemIconType.FAS,
      //   icon: faChartPie,
      //   routingPath: RoutingPaths.Default
      // }
    ]);
  }

}
