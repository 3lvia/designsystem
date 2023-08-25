import React from 'react';

import { FormFieldErrorContainer, FormFieldError, IconWrapper } from '@elvia/elvis-toolbox';
import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';

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
