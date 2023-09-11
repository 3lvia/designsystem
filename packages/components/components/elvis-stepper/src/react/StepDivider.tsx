import React, { FC } from 'react';
import { StepLineDashed, StepLine, LineDash } from './styledComponents';
import { StepperType } from './elvia-stepper.types';

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
  return <StepLine $type={type} $isActive={isActive} $isSelected={isSelected} />;
};
