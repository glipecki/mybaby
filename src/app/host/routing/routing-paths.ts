import {RoutingPath} from './routing-path';

export class RoutingPaths {

  static Default = RoutingPaths.path('');
  static Dashboard = RoutingPaths.path('dashboard');
  static Nutrition = RoutingPaths.path('nutrition');

  private static path(path: string): RoutingPath {
    return {
      def: path,
      path: () => {
        return `/${path}`
      }
    };
  }

}
