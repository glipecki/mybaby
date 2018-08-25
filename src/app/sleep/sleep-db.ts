export interface SleepDb {
  type: 'day'|'night'|'current';
  babyId: string;
  start: {
    date: string;
    timestamp: number;
  };
  end?: {
    date: string;
    timestamp: number;
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
