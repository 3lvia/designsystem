import React, { FC } from 'react';
import { StepStates } from './elvia-stepper.types';
import { StepHeader, StepNumber, StepperTitle } from './styledComponents';
import { isReachable } from './utils';
import { TypographyName } from '@elvia/elvis-typography';

type VerticalStepElementProps = {
  stepNumber: number;
  currentStep: number;
  steps?: StepStates;
  isForced?: boolean;
  typography?: TypographyName;
  handleStepChange: (step: number) => void;
};

export const VerticalStepElement: FC<VerticalStepElementProps> = function ({
  stepNumber,
  currentStep,
  steps,
  isForced = false,
  typography,
  handleStepChange,
}) {
  return (
    <StepHeader>
      <StepNumber
        role="tab"
        aria-selected={stepNumber === currentStep}
        isActive={stepNumber === currentStep}
        isError={steps?.[stepNumber]?.isError}
        isCompleted={steps?.[stepNumber]?.isCompleted}
        isDisabled={!isReachable(isForced, stepNumber, steps)}
        onClick={() => handleStepChange(isReachable(isForced, stepNumber, steps) ? stepNumber : currentStep)}
      >
        {stepNumber}
      </StepNumber>
      <StepperTitle
        type="vertical"
        isActive={stepNumber === currentStep}
        typography={typography}
        isDisabled={!isReachable(isForced, stepNumber, steps)}
        onClick={() => handleStepChange(isReachable(isForced, stepNumber, steps) ? stepNumber : currentStep)}
      >
        {steps?.[stepNumber]?.title ?? ''}
      </StepperTitle>
    </StepHeader>
  );
};
