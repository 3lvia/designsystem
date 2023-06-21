import React from 'react';
import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { Heading as StyledHeading } from './styledHeading';

interface Props {
  id: string;
  size: FormFieldSizes;
  value: string;
}

export const Heading: React.FC<Props> = ({ id = 'left', size = 'medium', value }) => {
  return (
    <StyledHeading id={`${id}-heading`} size={size}>
      {value}
    </StyledHeading>
  );
};
