export const isBefore = (d1?: Date | null, d2?: Date | null): boolean => {
  return !!d1 && !!d2 && d1.getTime() < d2.getTime();
};

export const isAfter = (d1?: Date | null, d2?: Date | null): boolean => {
  return !!d1 && !!d2 && d1.getTime() > d2.getTime();
};
