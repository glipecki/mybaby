import {LogAppender} from './log-appender';
import {LogLevel} from './log-level';
import {LoggerWithAppenders} from './log-with-appenders';
import {Logger} from './logger';

export class LoggerFactory {

  private static loggers: { [key: string]: Logger } = {};
  private static appenders = [];
  private static context = {};
  private static rootLevel: LogLevel = LogLevel.ERROR;

  static getLogger(name: string): Logger {
    if (!LoggerFactory.loggers.name) {
      LoggerFactory.loggers[name] = new LoggerWithAppenders(
        name,
        () => this.appenders,
        () => this.context,
        () => this.rootLevel
      );
    }
    return LoggerFactory.loggers[name];
  }

  static addAppender(appender: LogAppender) {
    this.appenders.push(appender);
  }

  static addContext(key: string, value: any) {
    this.context[key] = value;
  }

  static removeContext(key: string) {
    delete this.context[key];
  }

  static setRootLevel(level: LogLevel) {
    this.rootLevel = level;
  }

}
