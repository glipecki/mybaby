export enum PoopSize {
  small = 'small',
  medium = 'medium',
  big = 'big',
  mega = 'mega'
}

export interface Poop {
  id: string;
  date: string;
  size: PoopSize;
}

export const PoopSizeKeys = {
  [PoopSize.mega]: 'mega',
  [PoopSize.big]: 'duża',
  [PoopSize.medium]: 'średnia',
  [PoopSize.small]: 'mała'
};
