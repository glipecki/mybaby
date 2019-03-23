export interface BabyDb {
  firstName: string;
  secondName: string;
  surname: string;
  birthday: string;
  personalId: string;
  wean: {
    scheduleConfig: {
      start: string,
      step: number,
      target: number,
      active: boolean
    },
    schedule: {
      [key: string]: number
    }
  }
}
