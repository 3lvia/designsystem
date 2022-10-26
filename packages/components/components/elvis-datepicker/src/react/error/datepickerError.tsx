import { Icon } from '@elvia/elvis-icon/react';
import React, { useEffect, useState } from 'react';

import { FormFieldErrorContainer, FormFieldError } from '@elvia/elvis-toolbox';

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
      <Icon name="removeCircle" color="error" size="xs" />
      <FormFieldError data-testid="error">{text}</FormFieldError>
    </FormFieldErrorContainer>
  );
};
