import { ErrorType } from './elviaDatepicker.types';

export const getErrorText = (error?: ErrorType): string => {
  switch (error) {
    case 'invalidDate': {
      return 'Ugyldig tid';
    }
    case 'required': {
      return 'Velg tid';
    }
    default: {
      return '';
    }
  }
};
