import React from 'react';
import { IndeterminateLine, StyledCheckbox } from './checkboxStyles';

export interface CheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isCompact?: boolean;
  isFocused?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <StyledCheckbox {...props}>
      <IndeterminateLine />
    </StyledCheckbox>
  );
};
