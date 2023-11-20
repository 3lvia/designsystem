import { ErrorType } from './elviaDropdown.types';

export const getInternalErrorText = (error?: ErrorType, label?: string): string => {
  if (error === 'required' && label) {
    return `Velg ${label}`;
  } else if (error === 'required') {
    return 'Påkrevd';
  } else {
    return '';
  }
};
