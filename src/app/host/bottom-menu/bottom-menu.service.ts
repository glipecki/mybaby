import {Injectable} from '@angular/core';
import {faChild} from '@fortawesome/free-solid-svg-icons/faChild';
import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
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
      }
    ]);
  }

}
