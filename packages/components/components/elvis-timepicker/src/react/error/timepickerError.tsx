import React, { useEffect, useState } from 'react';
import { ErrorType } from '../elviaTimepicker.types';
import { getErrorText } from '../getErrorText';
import { FormFieldErrorContainer, FormFieldError, IconWrapper } from '@elvia/elvis-toolbox';
import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';

interface Props {
  errorType?: ErrorType;
  customText?: string;
}

export const TimepickerError: React.FC<Props> = ({ errorType, customText }) => {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (customText) {
      setErrorText(customText);
    } else if (errorType) {
      setErrorText(getErrorText(errorType));
    }
  }, [errorType, customText]);

  return (
    <FormFieldErrorContainer>
      <IconWrapper icon={removeCircle} color={'signal-error'} size="xs" />
      <FormFieldError data-testid="error">{errorText}</FormFieldError>
    </FormFieldErrorContainer>
  );
};
