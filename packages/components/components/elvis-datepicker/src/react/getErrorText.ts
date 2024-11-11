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
          afterMaxDate: `Seneste dato er`,
          beforeMinDate: `Tidligste dato er`,
          invalidDate: 'Ugyldig dato',
          required: 'Velg dato',
        }
      : {
          afterMaxDate: `Latest date is`,
          beforeMinDate: `Earliest date is`,
          invalidDate: 'Invalid date',
          required: 'Select date',
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
