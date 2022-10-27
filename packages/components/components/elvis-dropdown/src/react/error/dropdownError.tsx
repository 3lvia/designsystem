import { Icon } from '@elvia/elvis-icon/react';
import React from 'react';

import { FormFieldErrorContainer, FormFieldError } from '@elvia/elvis-toolbox';

interface Props {
  errorText?: string;
}

export const DropdownError: React.FC<Props> = ({ errorText }) => {
  return (
    <FormFieldErrorContainer>
      <Icon name="removeCircle" color="error" size="xs" />
      <FormFieldError data-testid="error">{errorText}</FormFieldError>
    </FormFieldErrorContainer>
  );
};
