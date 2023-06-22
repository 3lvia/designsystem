import { FormFieldSizes } from '@elvia/elvis-toolbox';
import React, { forwardRef } from 'react';
import { Sides } from '../elvia-slider.types';
import { Hint as StyledHint } from './styledHint';

interface Props {
  hasErrorPlaceholder: boolean;
  size: FormFieldSizes;
  isDisabled: boolean;
  side: Sides;
  value: number;
}

export const Hint = forwardRef(function Hint(props: Props, ref: React.Ref<HTMLSpanElement>) {
  const { hasErrorPlaceholder, size, isDisabled, side, value } = props;
  return (
    <StyledHint hasErrorPlaceholder={hasErrorPlaceholder} size={size} isDisabled={isDisabled} side={side}>
      <span ref={ref} data-testid={`${side}-hint`}>
        {value.toLocaleString()}
      </span>
    </StyledHint>
  );
});
