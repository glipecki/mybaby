export interface SleepDb {
  type: 'day'|'night'|'current';
  babyId: string;
  start: {
    date: string;
  };
  end?: {
    date: string;
  };
  sleep?: {
    text: string;
    time: number;
  };
  activityBefore?: {
    text: string;
    time: number;
  }
}
