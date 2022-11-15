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
    <StyledCheckbox
      isIndeterminate={props.isIndeterminate && !props.isChecked}
      isChecked={props.isChecked}
      isDisabled={props.isDisabled}
      isCompact={props.isCompact}
      isFocused={props.isFocused}
    >
      <IndeterminateLine />
    </StyledCheckbox>
  );
};
