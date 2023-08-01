import { ErrorType } from '../elvia-autocomplete.types';

export const getInternalErrorText = (error?: ErrorType, label?: string): string => {
  if (error === 'required' && label) {
    return `Skriv inn ${label}`;
  } else if (error === 'required') {
    return 'Påkrevd';
  } else {
    return '';
  }
};
