import {Injectable} from '@angular/core';
import {LoggerFactory} from '../../logger/logger-factory';

@Injectable({
  providedIn: 'root'
})
export class CurrentBabyService {

  private baby = {
    id: 'oezcGwNonYiNDsYQ6B8g'
  };

  constructor() {
    LoggerFactory.addContext('baby', this.baby.id);
  }

  id() {
    return this.baby.id;
  }

}
