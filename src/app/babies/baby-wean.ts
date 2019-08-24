import {BabyWeanSchedule} from './baby-wean-schedule';
import {BabyWeanScheduleConfig} from './baby-wean-schedule-config';

export interface BabyWean {
  scheduleConfig: BabyWeanScheduleConfig;
  schedule: BabyWeanSchedule;
}
