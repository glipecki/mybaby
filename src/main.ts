import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {ConsoleLogAppender} from './app/logger/console-log-appender';
import {LogLevel} from './app/logger/log-level';
import {LoggerFactory} from './app/logger/logger-factory';
import {environment} from './environments/environment';

LoggerFactory.addAppender(new ConsoleLogAppender());

if (environment.production) {
  enableProdMode();
  LoggerFactory.setRootLevel(LogLevel.INFO);
} else {
  LoggerFactory.setRootLevel(LogLevel.TRACE);
}
LoggerFactory.addContext('session', Math.random().toString(36).substr(2, 9));

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    const bootstrapTime = Date.now() - window['mybaby'].performance.bootstrap.start;
    LoggerFactory.getLogger('app#bootstrapModule').info('App initialized [time={}ms]', bootstrapTime);
  })
  .catch(err => console.log(err));
