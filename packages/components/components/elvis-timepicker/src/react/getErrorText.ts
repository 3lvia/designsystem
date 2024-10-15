import { LanguageCode } from '@elvia/elvis-toolbox';

import { ErrorType } from './publicApi.public';
import { getFormattedInputValue } from './timeHelpers';

export const getErrorText = (
  lang: LanguageCode,
  error?: ErrorType,
  minTime?: Date,
  maxTime?: Date,
  hasSecondPicker?: boolean,
): string => {
  const labels =
    lang === 'no'
      ? {
          invalidTime: 'Ugyldig tidspunkt',
          required: 'Velg tidspunkt',
          beforeMinTime: 'Tidligste tidspunkt er',
          afterMaxTime: 'Seneste tidspunkt er',
        }
      : {
          invalidTime: 'Invalid time',
          required: 'Select time',
          beforeMinTime: 'Earliest time is ',
          afterMaxTime: 'Latest time is ',
        };

  switch (error) {
    case 'invalidTime': {
      return labels.invalidTime;
    }
    case 'required': {
      return labels.required;
    }
    case 'beforeMinTime': {
      return `${labels.beforeMinTime} ${getFormattedInputValue(minTime, hasSecondPicker)}`;
    }
    case 'afterMaxTime': {
      return `${labels.afterMaxTime} ${getFormattedInputValue(maxTime, hasSecondPicker)}`;
    }
    default: {
      return '';
    }
  }
};
