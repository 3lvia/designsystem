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
      return `Kan ikke være før ${formatDate(minDate, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })}`;
    }
    case 'afterMaxDate': {
      return `Kan ikke være etter ${formatDate(maxDate, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })}`;
    }
    default: {
      return '';
    }
  }
};
