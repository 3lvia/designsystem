import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import {
  type ErrorOptions,
  FormFieldError,
  FormFieldErrorContainer,
  IconWrapper,
  useLanguage,
} from '@elvia/elvis-toolbox';
import React, { useEffect, useState } from 'react';

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

  const lang = useLanguage();

  useEffect(() => {
    if (errorOptions?.text) {
      setErrorText(errorOptions.text);
    } else if (errorType) {
      setErrorText(getInternalErrorText(lang, errorType, label));
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
