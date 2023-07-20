export const isValidNumber = (value: string): boolean => {
  const minusCount = (value.match(/-/g) ?? []).length;
  const commaCount = (value.match(/,/g) ?? []).length;
  const dotCount = (value.match(/\./g) ?? []).length;
  const minusInWrongPlace = value.includes('-') && !value.startsWith('-');

  if (
    minusInWrongPlace ||
    minusCount > 1 ||
    commaCount > 1 ||
    dotCount > 1 ||
    (commaCount >= 1 && dotCount >= 1)
  ) {
    return false;
  }

  return true;
};

//also allow , . and -
export const isOnlyNumbers = (value: string): boolean => {
  return /^(?=.*\d)[\d,.-]+$/.test(value);
};
