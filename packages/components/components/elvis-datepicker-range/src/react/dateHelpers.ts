export const isBefore = (d1?: Date | null, d2?: Date | null): boolean => {
  return !!d1 && !!d2 && d1.getTime() < d2.getTime();
};

export const isAfter = (d1?: Date | null, d2?: Date | null): boolean => {
  return !!d1 && !!d2 && d1.getTime() > d2.getTime();
};

export const localISOTime = (date: Date): string => {
  const timeZoneOffset = date.getTimezoneOffset() * 60000; // Local timezone offset in ms
  const localISOTime = new Date(date.getTime() - timeZoneOffset).toISOString();
  return localISOTime;
};
