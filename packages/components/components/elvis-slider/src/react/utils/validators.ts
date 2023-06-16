export const isValidNumber = (value: string): boolean => {
  if ((value.includes('-') && !value.startsWith('-')) || (value.match(/-/g) || []).length > 1) {
    return false;
  } else if ((value.match(/,/g) || []).length > 1) {
    return false;
  } else if ((value.match(/\./g) || []).length > 1) {
    return false;
  } else if (value.includes(',') && value.includes('.')) {
    return false;
  }

  return true;
};

export const isOnlyNumbers = (value: string): boolean => {
  return /[\d,.-]/.test(value);
};
