import { isValidDate } from './dateHelpers';
import { ErrorType } from './elviaDatepicker.types';

type ValidateDateParams = {
  inputValue: { day: number; month: number; year: number };
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
};

export const validateDate = ({
  inputValue: { day, month, year },
  minDate,
  maxDate,
  required,
}: ValidateDateParams): ErrorType | 'valid' => {
  const newDate = new Date(`${year}/${month}/${day}`);

  const noDate = !day && !month && !year;

  if (!required && noDate) {
    return 'valid';
  } else if (required && noDate) {
    return 'required';
  } else if (!day || !month || !year || year < 1800 || !isValidDate(newDate)) {
    return 'invalidDate';
  } else if (minDate && newDate && newDate.getTime() < minDate.getTime()) {
    return 'beforeMinDate';
  } else if (maxDate && newDate && newDate.getTime() > maxDate.getTime()) {
    return 'afterMaxDate';
  }
  return 'valid';
};
