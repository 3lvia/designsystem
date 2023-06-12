import React, { FC } from 'react';
import { StepStates } from './elvia-stepper.types';
import { StepperActions, StepperContent } from './styledComponents';
import { isReachable } from './utils';
import { PrimaryButton, SecondaryButton } from '@elvia/elvis-toolbox';

type StepContentProps = {
  currentStep: number;
  numberOfSteps: number;
  steps?: StepStates;
  isForced?: boolean;
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
  isForced = false,
  completeButtonText,
  content,
  contentRef,
  type = 'horizontal',
  handleStepChange,
}) {
  return (
    <StepperContent type={type} aria-selected>
      <div ref={contentRef} role="tabpanel">
        {content?.[currentStep - 1]}
      </div>
      <StepperActions>
        <SecondaryButton onClick={() => handleStepChange(currentStep - 1)}>Tilbake</SecondaryButton>
        <PrimaryButton
          disabled={!isReachable(isForced, currentStep + 1, steps)}
          onClick={() =>
            handleStepChange(isReachable(isForced, currentStep + 1, steps) ? currentStep + 1 : currentStep)
          }
        >
          {completeButtonText && currentStep === numberOfSteps ? completeButtonText : 'Neste'}
        </PrimaryButton>
      </StepperActions>
    </StepperContent>
  );
};
