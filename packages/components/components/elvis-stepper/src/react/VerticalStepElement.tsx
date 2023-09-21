import React, { FC } from 'react';
import { StepHeader, StepNumber, StepperTitle } from './styledComponents';
import { isReachable } from './utils';
import { TypographyName } from '@elvia/elvis-typography';
import { StepStates } from './publicApi';

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
        isActive={stepNumber === currentStep}
        isError={steps?.[stepNumber]?.isError}
        isCompleted={steps?.[stepNumber]?.isCompleted}
        isDisabled={!isReachable(isForced, stepNumber, steps)}
        onClick={() => handleStepChange(isReachable(isForced, stepNumber, steps) ? stepNumber : currentStep)}
      >
        {stepNumber}
      </StepNumber>
      <StepperTitle
        $type="vertical"
        isActive={stepNumber === currentStep}
        typography={typography}
        isDisabled={!isReachable(isForced, stepNumber, steps)}
        onClick={() => handleStepChange(isReachable(isForced, stepNumber, steps) ? stepNumber : currentStep)}
      >
        {steps?.[stepNumber]?.heading ?? ''}
      </StepperTitle>
    </StepHeader>
  );
};
