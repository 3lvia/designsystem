import { ErrorType } from './elviaTimepicker.types';

export const getErrorText = (error?: ErrorType): string => {
  switch (error) {
    case 'invalidTime': {
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
