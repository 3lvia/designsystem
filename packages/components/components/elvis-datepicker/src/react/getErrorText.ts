import { formatDate } from './dateHelpers';
import { ErrorType } from './elviaDatepicker.types';

export const getErrorText = (
  error?: ErrorType,
  minDate?: Date,
  maxDate?: Date,
  addTime?: boolean,
): string => {
  switch (error) {
    case 'invalidDate': {
      return 'Ugyldig dato';
    }
    case 'required': {
      return 'Velg dato';
    }
    case 'beforeMinDate': {
      const dateError = `Kan ikke være før ${getFormattedDate(minDate)}`;
      return addTime
        ? `${dateError} kl. ${formatDate(minDate, { hour: '2-digit', minute: '2-digit' })}`
        : dateError;
    }
    case 'afterMaxDate': {
      const dateError = `Kan ikke være etter ${getFormattedDate(maxDate)}`;
      return addTime
        ? `${dateError} kl. ${formatDate(maxDate, { hour: '2-digit', minute: '2-digit' })}`
        : dateError;
    }
    default: {
      return '';
    }
  }
};

const getFormattedDate = (d?: Date) =>
  formatDate(d, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
