import { formatDate } from './dateHelpers';
import { ErrorType } from './elviaDatepicker.types';

export const getErrorText = (
  error?: ErrorType,
  minDate?: Date,
  maxDate?: Date,
  withTime?: boolean,
): string => {
  switch (error) {
    case 'invalidDate': {
      return 'Ugyldig dato';
    }
    case 'required': {
      return 'Velg dato';
    }
    case 'beforeMinDate': {
      return `Kan ikke være før ${getFormattedDate(minDate, withTime)}`;
    }
    case 'afterMaxDate': {
      return `Kan ikke være etter ${getFormattedDate(maxDate, withTime)}`;
    }
    default: {
      return '';
    }
  }
};

const getFormattedDate = (d?: Date, withTime?: boolean) => {
  const date = formatDate(d, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const time = `${formatDate(d, { hour: '2-digit', minute: '2-digit' })}`;
  return withTime ? `${date} kl. ${time}` : date;
};
