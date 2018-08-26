export enum PoopSize {
  small = 'small',
  medium = 'medium',
  abundant = 'abundant',
  big = 'big',
  mega = 'mega'
}

export interface Poop {
  id: string;
  date: string;
  size: PoopSize;
}
