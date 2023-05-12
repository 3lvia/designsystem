import React, { FC } from 'react';
import { StepStates } from './elvia-stepper.types';
import { StepHeader, StepNumber, StepperTitle } from './styledComponents';
import { isReachable } from './elvia-stepper';
import { TypographyName } from '@elvia/elvis-typography';

type VerticalStepElementProps = {
  stepNumber: number;
  currentStep: number;
  steps?: StepStates;
  forced?: boolean;
  typography?: TypographyName;
  handleStepChange: (step: number) => void;
};

export const VerticalStepElement: FC<VerticalStepElementProps> = function ({
  stepNumber,
  currentStep,
  steps,
  forced = false,
  typography,
  handleStepChange,
}) {
  return (
    <StepHeader>
      <StepNumber
        isActive={stepNumber === currentStep}
        isError={steps?.[stepNumber]?.isError}
        isCompleted={steps?.[stepNumber]?.isCompleted}
        isDisabled={!isReachable(forced, stepNumber, steps)}
        onClick={() => handleStepChange(isReachable(forced, stepNumber, steps) ? stepNumber : currentStep)}
      >
        {stepNumber}
      </StepNumber>
      <StepperTitle type="vertical" isActive={stepNumber === currentStep} typography={typography}>
        {steps?.[stepNumber]?.title ?? ''}
      </StepperTitle>
    </StepHeader>
  );
};
