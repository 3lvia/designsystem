import React, { FC } from 'react';

import { StepperType } from './elvia-stepper.types';
import { LineDash, StepLine, StepLineDashed } from './styledComponents';

type StepDividerProps = { type?: StepperType; isSelected: boolean; isActive?: boolean; isDots: boolean };

export const StepDivider: FC<StepDividerProps> = function ({ type, isDots, isActive, isSelected }) {
  if (isDots) {
    return (
      <StepLineDashed $type={type}>
        <LineDash $type={type} />
        <LineDash $type={type} />
        <LineDash $type={type} />
        {type !== 'vertical' && (
          <>
            <LineDash $type={type} />
            <LineDash $type={type} />
          </>
        )}
      </StepLineDashed>
    );
  }
  return <StepLine $type={type} isActive={isActive} isSelected={isSelected} />;
};
