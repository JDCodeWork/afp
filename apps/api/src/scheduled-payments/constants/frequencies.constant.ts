export const Frequencies = [
  'biweekly',
  'monthly',
  'quarterly',
  'semiannual',
  'annual',
] as const;

export type Frequency = (typeof Frequencies)[number];
