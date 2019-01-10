import {LogEntryContext} from './log-entry-context';
import {LogLevel} from './log-level';

export interface LogEntry {
  date: string;
  timestamp: number;
  logger: string;
  level: LogLevel;
  message: string;
  params: any[];
  context: LogEntryContext;
  error?: Error;
}
