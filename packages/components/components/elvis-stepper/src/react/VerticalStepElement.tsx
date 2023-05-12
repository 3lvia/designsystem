import React, { FC } from 'react';
import { StepStates } from './elvia-stepper.types';
import { StepHeader, StepNumber, StepperTitle } from './styledComponents';
import { isReachable } from './elvia-stepper';
import { TypographyName } from '@elvia/elvis-typography';

type VerticalStepElementProps = {
  i: number;
  currentStep: number;
  steps?: StepStates;
  forced?: boolean;
  typography?: TypographyName;
  handleStepChange: (step: number) => void;
};

export const VerticalStepElement: FC<VerticalStepElementProps> = function ({
  i,
  currentStep,
  steps,
  forced = false,
  typography,
  handleStepChange,
}) {
  return (
    <StepHeader>
      <StepNumber
        isActive={i === currentStep}
        isError={steps?.[i + 1]?.isError}
        isCompleted={steps?.[i + 1]?.isCompleted}
        isDisabled={!isReachable(forced, i, steps)}
        onClick={() => handleStepChange(isReachable(forced, i, steps) ? i : currentStep)}
      >
        {i + 1}
      </StepNumber>
      <StepperTitle type="vertical" isActive={i === currentStep} typography={typography}>
        {steps?.[i + 1]?.title ?? ''}
      </StepperTitle>
    </StepHeader>
  );
};
