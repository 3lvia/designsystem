import { ErrorType } from './publicApi.public';
import { getFormattedInputValue } from './timeHelpers';

export const getErrorText = (
  error?: ErrorType,
  minTime?: Date,
  maxTime?: Date,
  hasSecondPicker?: boolean,
): string => {
  switch (error) {
    case 'invalidTime': {
      return 'Ugyldig tidspunkt';
    }
    case 'required': {
      return 'Velg tidspunkt';
    }
    case 'beforeMinTime': {
      return `Tidligste tidspunkt er ${getFormattedInputValue(minTime, hasSecondPicker)}`;
    }
    case 'afterMaxTime': {
      return `Seneste tidspunkt er ${getFormattedInputValue(maxTime, hasSecondPicker)}`;
    }
    default: {
      return '';
    }
  }
};
