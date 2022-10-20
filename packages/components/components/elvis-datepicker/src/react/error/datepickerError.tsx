import { Icon } from '@elvia/elvis-icon/react';
import React, { useEffect, useState } from 'react';
import { ErrorType } from '../elviaDatepicker.types';
import { getErrorText } from '../getErrorText';
import { ErrorContainer, ErrorText } from './errorStyles';

interface Props {
  errorType?: ErrorType;
  customText?: string;
  isCompact: boolean;
}

export const DatepickerError: React.FC<Props> = ({ errorType, customText, isCompact }) => {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (customText) {
      setErrorText(customText);
    } else if (errorType) {
      setErrorText(getErrorText(errorType));
    }
  }, [errorType, customText]);

  return (
    <ErrorContainer>
      <Icon name="removeCircle" color="error" size="xs" />
      <ErrorText data-testid="error" isCompact={isCompact}>
        {errorText}
      </ErrorText>
    </ErrorContainer>
  );
};
