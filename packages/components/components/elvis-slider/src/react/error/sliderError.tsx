import React, { useEffect, useState } from 'react';

import { removeCircle } from '@elvia/elvis-assets-icons';
import { FormFieldError, FormFieldErrorContainer, IconWrapper } from '@elvia/elvis-toolbox';

import { BothSliders, ErrorType, SliderProps } from '../elvia-slider.types';
import { getErrorOptionsText, getInternalErrorText } from '../utils/getError';

interface Props {
  errorType?: Partial<BothSliders<ErrorType>>;
  errorOptions?: SliderProps['errorOptions'];
  id: string;
}

export const SliderError: React.FC<Props> = ({ errorType, errorOptions, id }) => {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (errorType) {
      setErrorText(getInternalErrorText(errorType));
    } else if (errorOptions) {
      setErrorText(getErrorOptionsText(errorOptions));
    } else {
      setErrorText('');
    }
  }, [errorType, errorOptions]);

  return (
    <FormFieldErrorContainer>
      <IconWrapper icon={removeCircle} color={'icon-danger'} size="xs" />
      <FormFieldError id={`error-${id}`}>{errorText}</FormFieldError>
    </FormFieldErrorContainer>
  );
};
