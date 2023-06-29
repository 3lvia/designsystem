import {
  BothSliders,
  ErrorType,
  Sides,
  SimpleSliderErrorOptions,
  SliderProps,
  SliderType,
} from '../elvia-slider.types';
import { isRangeSliderErrorOptions } from './isRangeSliderErrorOptions';

type ErrorOptions = SliderProps['errorOptions'];

export const getMergedErrorOptions = (type: SliderType, errorOptions: ErrorOptions): ErrorOptions => {
  const defaultErrorOptions: SimpleSliderErrorOptions = {
    hideText: false,
    hasErrorPlaceholder: true,
  };

  if (type === 'range' && isRangeSliderErrorOptions(errorOptions)) {
    return {
      left: {
        ...defaultErrorOptions,
        ...errorOptions?.left,
      },
      right: {
        ...defaultErrorOptions,
        ...errorOptions?.right,
      },
    };
  } else {
    return {
      ...defaultErrorOptions,
      ...errorOptions,
    };
  }
};

export const getHasErrorPlaceholder = (
  error?: Partial<BothSliders<ErrorType>>,
  errorOptions?: ErrorOptions,
): boolean => {
  if (error?.left || error?.right) {
    return true;
  } else if (isRangeSliderErrorOptions(errorOptions)) {
    return !!(
      errorOptions?.left?.hasErrorPlaceholder ||
      errorOptions?.right?.hasErrorPlaceholder ||
      errorOptions?.left?.text ||
      errorOptions?.right?.text
    );
  } else {
    return !!errorOptions?.hasErrorPlaceholder || !!errorOptions?.text;
  }
};

export const getInternalErrorText = (error?: Partial<BothSliders<ErrorType>>): string => {
  if (error?.left === 'invalidValue' || error?.right === 'invalidValue') {
    return 'Ugyldig verdi';
  } else if (error?.left === 'NaN' || error?.right === 'NaN') {
    return 'Bruk tall';
  } else {
    return '';
  }
};

export const getErrorOptionsText = (errorOptions?: ErrorOptions): string => {
  if (isRangeSliderErrorOptions(errorOptions)) {
    if (errorOptions.left?.text && !errorOptions.left.hideText) {
      return errorOptions.left.text;
    }
    if (errorOptions.right?.text && !errorOptions.right.hideText) {
      return errorOptions.right.text;
    }
  } else if (errorOptions?.text && !errorOptions.hideText) {
    return errorOptions.text;
  }
  return '';
};

export const getIsErrorState = ({
  side,
  error,
  errorOptions,
}: {
  side: Sides;
  error: Partial<BothSliders<ErrorType>> | undefined;
  errorOptions: ErrorOptions;
}): boolean => {
  if (error) {
    return !!error[side];
  } else if (isRangeSliderErrorOptions(errorOptions)) {
    return !!errorOptions[side]?.isErrorState;
  } else {
    return !!errorOptions?.isErrorState;
  }
};

export const getHasErrorText = ({
  error,
  errorOptions,
}: {
  error: Partial<BothSliders<ErrorType>> | undefined;
  errorOptions: ErrorOptions;
}): boolean => {
  if (error?.left || error?.right) {
    return true;
  } else if (isRangeSliderErrorOptions(errorOptions)) {
    return !!(errorOptions?.left?.text || errorOptions?.right?.text);
  } else {
    return !!errorOptions?.text;
  }
};

export const getShowErrorText = (errorOptions: ErrorOptions): boolean => {
  if (isRangeSliderErrorOptions(errorOptions)) {
    return !!(errorOptions?.left?.hideText || errorOptions?.right?.hideText);
  } else {
    return !!errorOptions?.hideText;
  }
};

export const getAriaErrorMessage = ({
  side,
  id,
  error,
  errorOptions,
}: {
  side: Sides;
  id: string;
  error: Partial<BothSliders<ErrorType>> | undefined;
  errorOptions: ErrorOptions;
}): string | undefined => {
  return getIsErrorState({
    side: side,
    error: error,
    errorOptions: errorOptions,
  }) && getHasErrorText({ error: error, errorOptions: errorOptions })
    ? `error-${id}`
    : undefined;
};
