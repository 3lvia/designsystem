import { ErrorType } from '../elvia-autocomplete.types';

export const getInternalErrorText = (error: ErrorType | undefined, label: string | undefined): string => {
  if (error === 'required' && label) {
    return `Skriv inn ${label}`;
  } else if (error === 'required') {
    return 'Påkrevd';
  } else {
    return '';
  }
};
