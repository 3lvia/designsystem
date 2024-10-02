import { LanguageCode } from '@elvia/elvis-toolbox';

import { formatDate } from './dateHelpers';
import { ErrorType } from './elviaDatepicker.types';

export const getErrorText = (
  lang: LanguageCode,
  error?: ErrorType,
  minDate?: Date,
  maxDate?: Date,
  withTime?: boolean,
): string => {
  const labels =
    lang === 'no'
      ? {
          invalidDate: 'Ugyldig dato',
          required: 'Velg dato',
          beforeMinDate: `Tidligste dato er ${getFormattedDate(minDate, withTime)}`,
          afterMaxDate: `Seneste dato er ${getFormattedDate(maxDate, withTime)}`,
        }
      : {
          invalidDate: 'Invalid date',
          required: 'Select date',
          beforeMinDate: `Earliest date is ${getFormattedDate(minDate, withTime)}`,
          afterMaxDate: `Latest date is ${getFormattedDate(maxDate, withTime)}`,
        };

  switch (error) {
    case 'invalidDate': {
      return labels.invalidDate;
    }
    case 'required': {
      return labels.required;
    }
    case 'beforeMinDate': {
      return `${labels.beforeMinDate} ${getFormattedDate(minDate, withTime)}`;
    }
    case 'afterMaxDate': {
      return `${labels.afterMaxDate} ${getFormattedDate(maxDate, withTime)}`;
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
