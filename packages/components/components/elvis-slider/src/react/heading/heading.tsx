import React from 'react';
import { FormFieldSizes } from '@elvia/elvis-toolbox';
import { Heading as StyledHeading } from './styledHeading';

interface Props {
  size: FormFieldSizes;
  value: string;
}

export const Heading: React.FC<Props> = ({ size = 'medium', value }) => {
  return (
    <StyledHeading data-testid={'heading'} size={size}>
      {value}
    </StyledHeading>
  );
};
