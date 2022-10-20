import { ErrorType } from './elviaDatepicker.types';

export const getErrorText = (error?: ErrorType): string => {
  switch (error) {
    case 'invalidDate': {
      return 'Ugyldig dato';
    }
    case 'required': {
      return 'Velg dato';
    }
    default: {
      return '';
    }
  }
};
