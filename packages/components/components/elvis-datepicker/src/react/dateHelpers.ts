export const dateIsWithinMinMaxBoundary = (
  date?: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
): boolean => {
  if (!date) {
    return false;
  }

  const dateIsAfterMinDate = !minDate || date.getTime() >= minDate.getTime();
  const dateIsBeforeMaxDate = !maxDate || date.getTime() <= maxDate.getTime();

  return dateIsAfterMinDate && dateIsBeforeMaxDate;
};

export const isSameDay = (d1?: Date | null, d2?: Date | null): boolean => {
  if (!d1 || !d2) {
    return false;
  }

  return (
    `${d1.getFullYear()}${d1.getMonth()}${d1.getDate()}` ===
    `${d2.getFullYear()}${d2.getMonth()}${d2.getDate()}`
  );
};

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('nb-NO', { weekday: 'short' }).substring(0, 2);
};

export const getWeekDayNames = (): string[] => {
  const date = new Date(2022, 9, 10); // A monday
  return new Array(7).fill('').map(() => {
    const dayName = getDayName(date);
    date.setDate(date.getDate() + 1);
    return dayName;
  });
};

export const formatDate = (date?: Date | null, options?: Intl.DateTimeFormatOptions): string => {
  if (!date) {
    return '';
  }

  return date.toLocaleString('nb-NO', options);
};

export const isValidDate = (date: unknown): boolean => {
  return !isNaN(date as number) && date instanceof Date;
};

export const copyDay = (copyFrom: Date, copyTo: Date): Date => {
  const newDate = new Date(copyTo);
  newDate.setFullYear(copyFrom.getFullYear(), copyFrom.getMonth(), copyFrom.getDate());
  return newDate;
};
