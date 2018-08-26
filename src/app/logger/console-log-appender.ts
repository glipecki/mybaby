import {LogAppender} from './log-appender';
import {LogEntry} from './log-entry';
import {LogLevel} from './log-level';
import {StringReplacer} from './string-replacer';

export class ConsoleLogAppender implements LogAppender {

  private replacer = new StringReplacer('{}');

  append(log: LogEntry) {
    const message: string[] = [];
    message.push(`[${log.date}]`);
    message.push(`[${LogLevel[log.level]}]`);
    message.push(`[${log.logger}]`);
    if (log.context && Object.keys(log.context).length > 0) {
      message.push(`[${Object.keys(log.context).map(key => `${key}:${log.context[key]}`).join(',')}]`)
    }
    message.push(' ');
    message.push(this.replacer.replace(log.message, this.stringify(log.params)));
    if (log.error) {
      console.error(message.join(''), log.error);
    } else {
      console.log(message.join(''));
    }
  }

  private stringify(params: any[]) {
    return params.map(p => JSON.stringify(p));
  }

}
