import React, { useEffect, useState } from 'react';

import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import { FormFieldError, FormFieldErrorContainer, IconWrapper } from '@elvia/elvis-toolbox';
import { ErrorOptions } from '@elvia/elvis-toolbox/src';

import { ErrorType } from '../elvia-autocomplete.types';
import { getInternalErrorText } from '../utils/getInternalErrorText';

interface Props {
  label?: string;
  errorType?: ErrorType;
  errorOptions?: Partial<ErrorOptions>;
  id: string;
}
export const AutocompleteError: React.FC<Props> = ({ errorType, errorOptions, id, label }) => {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (errorOptions?.text) {
      setErrorText(errorOptions.text);
    } else if (errorType) {
      setErrorText(getInternalErrorText(errorType, label));
    } else {
      setErrorText('');
    }
  }, [errorType, errorOptions]);

  return (
    <FormFieldErrorContainer>
      <IconWrapper icon={removeCircle} color="icon-danger" size="xs" />
      <FormFieldError id={id}>{errorText}</FormFieldError>
    </FormFieldErrorContainer>
  );
};
