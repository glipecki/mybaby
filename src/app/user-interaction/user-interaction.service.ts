import {Injectable} from '@angular/core';
import {LoggerFactory} from '../logger/logger-factory';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {

  private static readonly log = LoggerFactory.getLogger('UserInteractionService');

  getTracker(name: string): (interaction: string) => void {
    return (interaction: string) => {
      UserInteractionService.log.info(`${interaction} @ ${name}`);
    }
  }

}
