import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import { FormFieldError, FormFieldErrorContainer, IconWrapper } from '@elvia/elvis-toolbox';
import { LanguageCode } from '@elvia/elvis-toolbox/src';
import React, { useEffect, useState } from 'react';

import { getErrorText } from '../getErrorText';
import { ErrorType } from '../publicApi.public';

interface Props {
  lang: LanguageCode;
  errorType?: ErrorType;
  customText?: string;
  errorId?: string;
  minTime?: Date;
  maxTime?: Date;
  hasSecondPicker?: boolean;
}

export const TimepickerError: React.FC<Props> = ({
  lang,
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
      setErrorText(getErrorText(lang, errorType, minTime, maxTime, hasSecondPicker));
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
