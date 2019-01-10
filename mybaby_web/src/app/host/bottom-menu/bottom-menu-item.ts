import {RoutingPath} from '../routing/routing-path';
import {BottomMenuItemIconType} from './bottom-menu-item-icon-type';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

export interface BottomMenuItem {
  icon: IconDefinition|any;
  iconType: BottomMenuItemIconType;
  routingPath: RoutingPath;
}
