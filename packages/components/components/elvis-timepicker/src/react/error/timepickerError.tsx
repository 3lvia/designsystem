import React, { useEffect, useState } from 'react';

import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import { FormFieldError, FormFieldErrorContainer, IconWrapper } from '@elvia/elvis-toolbox';

import { getErrorText } from '../getErrorText';
import { ErrorType } from '../publicApi.public';

interface Props {
  errorType?: ErrorType;
  customText?: string;
  errorId?: string;
  minTime?: Date;
  maxTime?: Date;
  hasSecondPicker?: boolean;
}

export const TimepickerError: React.FC<Props> = ({
  errorType,
  customText,
  errorId,
  minTime,
  maxTime,
  hasSecondPicker,
}) => {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (customText) {
      setErrorText(customText);
    } else if (errorType) {
      setErrorText(getErrorText(errorType, minTime, maxTime, hasSecondPicker));
    }
  }, [errorType, customText]);

  return (
    <FormFieldErrorContainer>
      <IconWrapper icon={removeCircle} color={'icon-danger'} size="xs" />
      <FormFieldError data-testid="error" id={errorId}>
        {errorText}
      </FormFieldError>
    </FormFieldErrorContainer>
  );
};
