import {Container} from 'inversify';
import 'reflect-metadata';
import {CallableHandler} from '../api/CallableHandler';
import {FirebaseService} from '../firebase/FirebaseService';
import {FirebaseServiceImpl} from '../firebase/FirebaseServiceImpl';
import {SleepAddHandler} from '../sleep/SleepAddHandler';
import {SleepCancelHandler} from '../sleep/SleepCancelHandler';
import {SleepEndHandler} from '../sleep/SleepEndHandler';
import {SleepResumeHandler} from '../sleep/SleepResumeHandler';
import {SleepService} from '../sleep/SleepService';
import {SleepServiceImpl} from '../sleep/SleepServiceImpl';

export const Injector = new Container();

Injector.bind(CallableHandler).to(SleepAddHandler).inSingletonScope();
Injector.bind(CallableHandler).to(SleepEndHandler).inSingletonScope();
Injector.bind(CallableHandler).to(SleepCancelHandler).inSingletonScope();
Injector.bind(CallableHandler).to(SleepResumeHandler).inSingletonScope();
Injector.bind(SleepService).to(SleepServiceImpl).inSingletonScope();
Injector.bind(FirebaseService).to(FirebaseServiceImpl).inSingletonScope();
