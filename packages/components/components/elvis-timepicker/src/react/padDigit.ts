// Returns number always as two digits
export const padDigit = (d: number): string => {
  const paddedNumber = `0${d}`;
  return paddedNumber.substring(paddedNumber.length - 2);
};
