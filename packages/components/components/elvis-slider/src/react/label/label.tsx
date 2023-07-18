import React from 'react';
import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { Label as StyledLabel } from './styledLabel';

interface Props {
  size: FormFieldSizes;
  value: string;
}

export const Label: React.FC<Props> = ({ size = 'medium', value }) => {
  return (
    <StyledLabel data-testid={'label'} size={size}>
      {value}
    </StyledLabel>
  );
};
