import {RoutingPath} from './routing-path';

export class RoutingPaths {

  static Default = RoutingPaths.path('');
  static Dashboard = RoutingPaths.path('dashboard');
  static Nutrition = RoutingPaths.path('nutrition');
  static Sleep = RoutingPaths.path('sleep');

  private static path(path: string): RoutingPath {
    return {
      def: path,
      path: () => {
        return `/${path}`
      }
    };
  }

}
