import React from 'react';
import { IndeterminateLine, StyledCheckbox } from './checkboxStyles';
import { FormFieldSizes } from '@elvia/elvis-toolbox';

export interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  size?: FormFieldSizes;
  isFocused?: boolean;
}

export interface IndeterminateLineProps {
  size?: FormFieldSizes;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isIndeterminate,
  isChecked,
  isDisabled,
  size,
  isFocused,
}) => {
  return (
    <StyledCheckbox
      isIndeterminate={isIndeterminate && !isChecked}
      isChecked={isChecked}
      isDisabled={isDisabled}
      size={size}
      isFocused={isFocused}
    >
      <IndeterminateLine size={size} />
    </StyledCheckbox>
  );
};
