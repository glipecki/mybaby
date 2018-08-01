import {RoutingPath} from '../routing/routing-path';
import {BottomMenuItemIconType} from './bottom-menu-item-icon-type';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

export interface BottomMenuItem {
  title?: string;
  icon: IconDefinition|any;
  iconType: BottomMenuItemIconType;
  routingPath: RoutingPath;
}
