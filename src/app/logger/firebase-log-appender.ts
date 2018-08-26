import * as firebase from 'firebase';
import {LogAppender} from './log-appender';
import {LogEntry} from './log-entry';
import {LogLevel} from './log-level';
import {StringReplacer} from './string-replacer';

export class FirebaseLogAppender implements LogAppender {

  private replacer = new StringReplacer('{}');

  constructor(
    private logs: firebase.firestore.CollectionReference,
    private env: string) {
  }

  append(log: LogEntry) {
    const message = this.replacer.replace(log.message, this.stringify(log.params));
    this.logs.add({
      env: this.env,
      date: log.date,
      timestamp: log.timestamp,
      logger: log.logger,
      level: LogLevel[log.level],
      message: message,
      context: log.context,
      error: log.error ? {
        message: log.error.message
        // TODO conver first X lines of stack to list of objects and store
      } : null
    });
  }

  private stringify(params: any[]) {
    return params.map(p => JSON.stringify(p));
  }

}
