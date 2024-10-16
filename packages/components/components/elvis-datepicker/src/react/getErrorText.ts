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
          beforeMinDate: `Tidligste dato er ${getFormattedDate(lang, minDate, withTime)}`,
          afterMaxDate: `Seneste dato er ${getFormattedDate(lang, maxDate, withTime)}`,
        }
      : {
          invalidDate: 'Invalid date',
          required: 'Select date',
          beforeMinDate: `Earliest date is ${getFormattedDate(lang, minDate, withTime)}`,
          afterMaxDate: `Latest date is ${getFormattedDate(lang, maxDate, withTime)}`,
        };

  switch (error) {
    case 'invalidDate': {
      return labels.invalidDate;
    }
    case 'required': {
      return labels.required;
    }
    case 'beforeMinDate': {
      return `${labels.beforeMinDate} ${getFormattedDate(lang, minDate, withTime)}`;
    }
    case 'afterMaxDate': {
      return `${labels.afterMaxDate} ${getFormattedDate(lang, maxDate, withTime)}`;
    }
    default: {
      return '';
    }
  }
};

const getFormattedDate = (lang: LanguageCode, d?: Date, withTime?: boolean) => {
  const date = formatDate(lang, d, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const time = `${formatDate(lang, d, { hour: '2-digit', minute: '2-digit' })}`;
  return withTime ? `${date} kl. ${time}` : date;
};
