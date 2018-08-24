import {CallableContext} from 'firebase-functions/lib/providers/https';

export abstract class CallableHandler<Request, Result> {
  abstract getName(): string;
  abstract handle(data: Request, context: CallableContext): Result;
}
