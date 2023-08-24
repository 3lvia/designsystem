import React, { useEffect, useState } from 'react';

import { FormFieldErrorContainer, FormFieldError, IconWrapper } from '@elvia/elvis-toolbox';
import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';

interface Props {
  errorText?: string;
  customText?: string;
}

export const DatepickerError: React.FC<Props> = ({ errorText, customText }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (customText) {
      setText(customText);
    } else if (errorText) {
      setText(errorText);
    }
  }, [errorText, customText]);

  return (
    <FormFieldErrorContainer>
      <IconWrapper icon={removeCircle} color="icon-danger" size="xs" />
      <FormFieldError data-testid="error">{text}</FormFieldError>
    </FormFieldErrorContainer>
  );
};
