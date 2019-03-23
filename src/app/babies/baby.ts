interface BabyWeanScheduleConfig {
  active: boolean;
  start: string;
  step: number;
  target: number;
}

interface BabyWeanSchedule {
  [key: string]: number;
}

interface BabyWean {
  scheduleConfig: BabyWeanScheduleConfig;
  schedule: BabyWeanSchedule;
}

export interface Baby {
  id: string;
  firstName: string;
  secondName: string;
  surname: string;
  birthday: string;
  personalId: string;
  wean: BabyWean;
}
