import { removeCircle } from '@elvia/elvis-assets-icons';
import { FormFieldError, FormFieldErrorContainer, IconWrapper } from '@elvia/elvis-toolbox';
import React, { useEffect, useState } from 'react';
import { BothSliders, ErrorOptions, ErrorType } from '../elvia-slider.types';
import { getErrorOptionsText, getInternalErrorText } from '../utils/getError';

interface Props {
  errorType?: Partial<BothSliders<ErrorType>>;
  errorOptions?: ErrorOptions;
}

export const SliderError: React.FC<Props> = ({ errorType, errorOptions }) => {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (errorOptions) {
      setErrorText(getErrorOptionsText(errorOptions));
    } else if (errorType) {
      setErrorText(getInternalErrorText(errorType));
    } else {
      setErrorText('');
    }
  }, [errorType, errorOptions]);

  return (
    <FormFieldErrorContainer>
      <IconWrapper icon={removeCircle} color={'signal-error'} size="xs" />
      <FormFieldError data-testid="error">{errorText}</FormFieldError>
    </FormFieldErrorContainer>
  );
};
