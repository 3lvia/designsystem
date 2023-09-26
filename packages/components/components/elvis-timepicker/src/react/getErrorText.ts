import { ErrorType } from './publicApi.public';

export const getErrorText = (error?: ErrorType): string => {
  switch (error) {
    case 'invalidTime': {
      return 'Ugyldig tidspunkt';
    }
    case 'required': {
      return 'Velg tidspunkt';
    }
    default: {
      return '';
    }
  }
};
