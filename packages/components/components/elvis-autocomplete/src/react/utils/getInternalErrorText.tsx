import { LanguageCode } from '@elvia/elvis-toolbox';

import { ErrorType } from '../elvia-autocomplete.types';

export const getInternalErrorText = (lang: LanguageCode, error?: ErrorType, label?: string): string => {
  if (error === 'required' && label) {
    return lang === 'no' ? `Skriv inn ${label}` : `Please enter ${label}`;
  } else if (error === 'required') {
    return lang === 'no' ? 'Påkrevd' : 'Required';
  } else {
    return '';
  }
};
