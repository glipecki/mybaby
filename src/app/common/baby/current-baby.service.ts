import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentBabyService {

  uuid() {
    if (environment.production) {
      return 'oezcGwNonYiNDsYQ6B8g';
    } else {
      return 'AvbUw07CTEGqCE4YLeVX';
    }
  }

}
