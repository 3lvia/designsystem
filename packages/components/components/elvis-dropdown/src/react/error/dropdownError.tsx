import React from 'react';

import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import { FormFieldError, FormFieldErrorContainer, IconWrapper } from '@elvia/elvis-toolbox';

interface Props {
  errorText?: string;
}

export const DropdownError: React.FC<Props> = ({ errorText }) => {
  return (
    <FormFieldErrorContainer>
      <IconWrapper icon={removeCircle} color="icon-danger" size="xs" />
      <FormFieldError data-testid="error">{errorText}</FormFieldError>
    </FormFieldErrorContainer>
  );
};
