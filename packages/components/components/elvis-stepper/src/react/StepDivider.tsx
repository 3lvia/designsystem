import React, { FC } from 'react';
import { StepLineDashed, StepLine, LineDash } from './styledComponents';

type StepDividerProps = { type?: string; isSelected: boolean; isActive?: boolean; isDots: boolean };

export const StepDivider: FC<StepDividerProps> = function ({ type, isDots, isActive, isSelected }) {
  if (isDots) {
    return (
      <StepLineDashed type={type}>
        <LineDash type={type} />
        <LineDash type={type} />
        <LineDash type={type} />
        {type !== 'vertical' && (
          <>
            <LineDash type={type} />
            <LineDash type={type} />
          </>
        )}
      </StepLineDashed>
    );
  }
  return <StepLine type={type} isActive={isActive} isSelected={isSelected} />;
};
