import { Icon } from '@elvia/elvis-icon/react';
import React, { useEffect, useState } from 'react';
import { ErrorType } from '../elviaTimepicker.types';
import { getErrorText } from '../getErrorText';
import { ErrorContainer, ErrorText } from './errorStyles';

interface Props {
  errorType?: ErrorType;
  customErrorMessage?: string;
  isCompact: boolean;
}

export const TimepickerError: React.FC<Props> = ({ errorType, customErrorMessage, isCompact }) => {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (customErrorMessage) {
      setErrorText(customErrorMessage);
    } else if (errorType) {
      setErrorText(getErrorText(errorType));
    }
  }, [errorType, customErrorMessage]);

  return (
    <ErrorContainer>
      <Icon name="removeCircle" color="error" size="xs" />
      <ErrorText data-test="error" isCompact={isCompact}>
        {errorText}
      </ErrorText>
    </ErrorContainer>
  );
};
