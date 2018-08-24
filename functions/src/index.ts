import * as functions from 'firebase-functions';
import {CallableContext, HttpsError} from 'firebase-functions/lib/providers/https';
import {CallableHandler} from './api/CallableHandler';
import {CurrentUser} from './auth/CurrentUser';
import {Injector} from './ioc/Injector';

function withAuthentication(handler: (data, context: CallableContext) => any) {
  return (data, context: CallableContext) => {
    if (!context.auth) {
      throw new HttpsError('unauthenticated', 'Authentication required');
    }
    Injector.bind(CurrentUser).toConstantValue(new CurrentUser(context.auth.uid));
    const result = handler(data, context);
    Injector.unbind(CurrentUser);
    return result;
  }
}

exports.api = Injector
  .getAll(CallableHandler)
  .reduce((prev, next) => ({
      ...prev,
      [next.getName()]: functions.https.onCall(withAuthentication((data, context) => next.handle(data, context)))
    }), {}
  );

