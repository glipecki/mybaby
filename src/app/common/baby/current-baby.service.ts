import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LoggerFactory} from '../../logger/logger-factory';

@Injectable({
  providedIn: 'root'
})
export class CurrentBabyService {

  private baby = {
    id: environment.production ? 'oezcGwNonYiNDsYQ6B8g' : 'AvbUw07CTEGqCE4YLeVX'
  };

  constructor() {
    LoggerFactory.addContext('baby', this.baby.id);
  }

  id() {
    return this.baby.id;
  }

}
