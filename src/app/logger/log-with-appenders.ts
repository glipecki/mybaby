import moment from 'moment';
import {LogAppender} from './log-appender';
import {LogEntry} from './log-entry';
import {LogEntryContext} from './log-entry-context';
import {LogLevel} from './log-level';
import {Logger} from './logger';

export class LoggerWithAppenders implements Logger {

  constructor(
    private name: string,
    private appenders: () => LogAppender[],
    private context: () => LogEntryContext,
    private logLevel: () => LogLevel) {
  }

  error(message: string, ...params) {
    if (params.length > 0 && params[params.length - 1] instanceof Error) {
      const error = params.pop();
      this.append(LogLevel.ERROR, message, params, error);
    } else {
      this.append(LogLevel.ERROR, message, params);
    }
  }

  warn(message: string, ...params) {
    this.append(LogLevel.WARN, message, params);
  }

  info(message: string, ...params) {
    this.append(LogLevel.INFO, message, params);
  }

  debug(message: string, ...params) {
    this.append(LogLevel.DEBUG, message, params);
  }

  trace(message: string, ...params) {
    this.append(LogLevel.TRACE, message, params);
  }

  private append(level: LogLevel, message: string, params: any[], error?: Error) {
    if (level >= this.logLevel()) {
      const now = moment();
      const logEntry: LogEntry = {
        date: now.format('YYYY-MM-DD HH:mm:ss.sss'),
        timestamp: now.valueOf(),
        logger: this.name,
        level: level,
        message: message,
        params: params,
        context: this.context(),
        error: error
      };
      this.appenders().forEach(a => a.append(logEntry));
    }
  }

}
