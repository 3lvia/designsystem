import { formatDate } from './dateHelpers';
import { ErrorType } from './elviaDatepicker.types';

export const getErrorText = (error?: ErrorType, minDate?: Date, maxDate?: Date): string => {
  switch (error) {
    case 'invalidDate': {
      return 'Ugyldig dato';
    }
    case 'required': {
      return 'Velg dato';
    }
    case 'beforeMinDate': {
      return `Kan ikke være før ${getFormattedDate(minDate)}`;
    }
    case 'afterMaxDate': {
      return `Kan ikke være etter ${getFormattedDate(maxDate)}`;
    }
    default: {
      return '';
    }
  }
};

const getFormattedDate = (d?: Date) => {
  const date = formatDate(d, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return date;
};
