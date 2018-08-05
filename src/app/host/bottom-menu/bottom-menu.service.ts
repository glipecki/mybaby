import {Injectable} from '@angular/core';
import {faChild} from '@fortawesome/free-solid-svg-icons/faChild';
import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
import {faMoon} from '@fortawesome/free-solid-svg-icons/faMoon';
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
        title: 'Dashboard',
        iconType: BottomMenuItemIconType.FAS,
        icon: faChild,
        routingPath: RoutingPaths.Dashboard
      },
      {
        title: 'Karmienie',
        iconType: BottomMenuItemIconType.FAS,
        icon: faUtensils,
        routingPath: RoutingPaths.Nutrition
      },
      {
        title: 'Spanie',
        iconType: BottomMenuItemIconType.FAS,
        icon: faMoon,
        routingPath: RoutingPaths.Sleep
      }
    ]);
  }

}
