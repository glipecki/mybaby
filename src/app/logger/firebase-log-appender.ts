import * as firebase from 'firebase';
import {LogAppender} from './log-appender';
import {LogEntry} from './log-entry';
import {LogLevel} from './log-level';
import {StringReplacer} from './string-replacer';

export interface FirebaseLogEntry {
  env: string;
  date: string;
  timestamp: number;
  logger: string;
  level: string;
  message: string;
  context: any;
  error?: {
    message: string;
  }
}

export class FirebaseLogAppender implements LogAppender {

  private replacer = new StringReplacer('{}');

  constructor(
    private logs: firebase.firestore.CollectionReference,
    private env: string,
    private logEnhancer: (LogEntry, FirebaseLogEntry) => FirebaseLogEntry & any = l => l) {
  }

  append(log: LogEntry) {
    this.logs.add(this.logEnhancer(log,{
      env: this.env,
      date: log.date,
      timestamp: log.timestamp,
      logger: log.logger,
      level: LogLevel[log.level],
      message: this.replacer.replace(log.message, this.stringify(log.params)),
      context: log.context,
      error: log.error ? {
        message: log.error.message
        // TODO conver first X lines of stack to list of objects and store
      } : null
    }));
  }

  private stringify(params: any[]) {
    return params.map(p => JSON.stringify(p));
  }

}
