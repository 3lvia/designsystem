import { padDigit } from './padDigit';

/**
 * @param d1 The original date
 * @param d2 The date to check against
 * @returns Whether d1 is before d2
 */
export const isBefore = (d1?: Date | null, d2?: Date | null): boolean => {
  return !!d1 && !!d2 && getSecondsFromTime(d1) < getSecondsFromTime(d2);
};

/**
 * @param d1 The original date
 * @param d2 The date to check against
 * @returns Whether d1 is after d2
 */
export const isAfter = (d1?: Date | null, d2?: Date | null): boolean => {
  return !!d1 && !!d2 && getSecondsFromTime(d1) > getSecondsFromTime(d2);
};

const getSecondsFromTime = (d: Date) => {
  const sumSeconds = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();

  return sumSeconds;
};

export const getFormattedInputValue = (date?: Date | null, hasSecondPicker?: boolean): string => {
  if (!date) {
    return '';
  }

  return (
    `${padDigit(date.getHours())}:${padDigit(date.getMinutes())}` +
    (hasSecondPicker ? `:${padDigit(date.getSeconds())}` : '')
  );
};
