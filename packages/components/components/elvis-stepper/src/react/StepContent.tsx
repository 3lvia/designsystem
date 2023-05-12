import React, { FC } from 'react';
import { StepStates } from './elvia-stepper.types';
import { StepperActions, StepperContent } from './styledComponents';
import { isReachable } from './utils';
import { PrimaryButton, SecondaryButton } from '@elvia/elvis-toolbox';

type StepContentProps = {
  currentStep: number;
  numberOfSteps: number;
  steps?: StepStates;
  forced?: boolean;
  completeButtonText?: string;
  content?: JSX.Element[];
  contentRef?: React.RefObject<HTMLDivElement>;
  type?: string;
  handleStepChange: (step: number) => void;
};

export const StepContent: FC<StepContentProps> = function ({
  currentStep,
  numberOfSteps,
  steps,
  forced = false,
  completeButtonText,
  content,
  contentRef,
  type = 'horizontal',
  handleStepChange,
}) {
  return (
    <StepperContent type={type}>
      <div ref={contentRef}>{content?.[currentStep - 1]}</div>
      <StepperActions>
        <PrimaryButton onClick={() => handleStepChange(currentStep - 1)}>Back</PrimaryButton>
        <SecondaryButton
          onClick={() =>
            handleStepChange(isReachable(forced, currentStep + 1, steps) ? currentStep + 1 : currentStep)
          }
        >
          {completeButtonText && currentStep === numberOfSteps ? completeButtonText : 'Next'}
        </SecondaryButton>
      </StepperActions>
    </StepperContent>
  );
};
