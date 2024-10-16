import { LanguageCode } from '@elvia/elvis-toolbox';

/**
 * @param d1 The original date
 * @param d2 The date to check against
 * @returns Whether d1 is before d2
 */
export const isBefore = (d1?: Date | null, d2?: Date | null): boolean => {
  return !!d1 && !!d2 && d1.getTime() < d2.getTime();
};

/**
 * @param d1 The original date
 * @param d2 The date to check against
 * @returns Whether d1 is after d2
 */
export const isAfter = (d1?: Date | null, d2?: Date | null): boolean => {
  return !!d1 && !!d2 && d1.getTime() > d2.getTime();
};

export const dateIsWithinMinMaxBoundary = (
  date?: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
): boolean => {
  const dateIsBeforeMinDate = isBefore(date, minDate);
  const dateIsAfterMaxDate = isAfter(date, maxDate);

  return !dateIsBeforeMinDate && !dateIsAfterMaxDate;
};

export const isSameDay = (lang: LanguageCode, d1?: Date | null, d2?: Date | null): boolean => {
  if (!d1 || !d2) {
    return false;
  }

  return (
    formatDate(lang, d1, { year: 'numeric', month: 'numeric', day: 'numeric' }) ===
    formatDate(lang, d2, { year: 'numeric', month: 'numeric', day: 'numeric' })
  );
};

export const getDayName = (lang: LanguageCode, date: Date): string => {
  return lang === 'no'
    ? date.toLocaleDateString('nb-NO', { weekday: 'short' }).substring(0, 2)
    : date.toLocaleDateString('en-GB', { weekday: 'short' }).substring(0, 2);
};

export const getWeekDayNames = (lang: LanguageCode): string[] => {
  const date = new Date(2022, 9, 10); // A monday
  return new Array(7).fill('').map(() => {
    const dayName = getDayName(lang, date);
    date.setDate(date.getDate() + 1);
    return dayName;
  });
};

export const formatDate = (
  lang: LanguageCode,
  date?: Date | null,
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!date) {
    return '';
  }

  return lang === 'no' ? date.toLocaleString('nb-NO', options) : date.toLocaleString('en-GB', options);
};

export const isValidDate = (date: unknown): date is Date => {
  return !isNaN(date as number) && date instanceof Date;
};

export const copyDay = (copyFrom: Date, copyTo: Date): Date => {
  const newDate = new Date(copyTo);
  newDate.setFullYear(copyFrom.getFullYear(), copyFrom.getMonth(), copyFrom.getDate());
  return newDate;
};

/**
 * Get ISO time without considering the timezone offset
 */
export const localISOTime = (date: Date): string => {
  const timeZoneOffset = date.getTimezoneOffset() * 60000; // Local timezone offset in ms
  const localISOTime = new Date(date.getTime() - timeZoneOffset).toISOString();
  return localISOTime;
};
