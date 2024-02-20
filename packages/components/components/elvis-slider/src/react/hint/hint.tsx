import React, { forwardRef } from 'react';

import { FormFieldSizes } from '@elvia/elvis-toolbox';

import { Side } from '../elvia-slider.types';
import { Hint as StyledHint } from './styledHint';

interface Props {
  hasErrorPlaceholder: boolean;
  size: FormFieldSizes;
  isDisabled: boolean;
  side: Side;
  value: number;
}

export const Hint = forwardRef<HTMLSpanElement, Props>(
  ({ hasErrorPlaceholder, size, isDisabled, side, value }, ref) => {
    return (
      <StyledHint hasErrorPlaceholder={hasErrorPlaceholder} size={size} isDisabled={isDisabled} side={side}>
        <span ref={ref} data-testid={`${side}-hint`}>
          {value.toLocaleString()}
        </span>
      </StyledHint>
    );
  },
);

Hint.displayName = 'Hint';
