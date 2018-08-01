export interface RoutingPath {

  def: string;
  path: (...pathParams: string[]) => string;

}
