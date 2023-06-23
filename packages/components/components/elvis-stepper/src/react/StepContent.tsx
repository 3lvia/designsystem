import React, { FC } from 'react';
import { StepperType } from './elvia-stepper.types';
import { StepperActions, StepperContent } from './styledComponents';
import { isReachable } from './utils';
import { PrimaryButton, SecondaryButton } from '@elvia/elvis-toolbox';
import { StepStates } from './sharedTypes';

type StepContentProps = {
  currentStep: number;
  numberOfSteps: number;
  steps?: StepStates;
  isForced?: boolean;
  content?: JSX.Element[];
  contentRef?: React.RefObject<HTMLDivElement>;
  type?: StepperType;
  handleStepChange: (step: number) => void;
};

export const StepContent: FC<StepContentProps> = function ({
  currentStep,
  numberOfSteps,
  steps,
  isForced = false,
  content,
  contentRef,
  type = 'horizontal',
  handleStepChange,
}) {
  return (
    <StepperContent $type={type}>
      <div ref={contentRef} role="tabpanel">
        {content?.[currentStep - 1]}
      </div>
      <StepperActions>
        {currentStep !== 1 ? (
          <SecondaryButton onClick={() => handleStepChange(currentStep - 1)}>
            {steps?.[currentStep]?.previousButtonText && currentStep === numberOfSteps
              ? steps?.[currentStep]?.previousButtonText
              : 'Tilbake'}
          </SecondaryButton>
        ) : (
          <div></div>
        )}
        <PrimaryButton
          disabled={!isReachable(isForced, currentStep + 1, steps)}
          onClick={() =>
            handleStepChange(isReachable(isForced, currentStep + 1, steps) ? currentStep + 1 : currentStep)
          }
        >
          {steps?.[currentStep]?.nextButtonText && currentStep === numberOfSteps
            ? steps?.[currentStep]?.nextButtonText
            : 'Neste'}
        </PrimaryButton>
      </StepperActions>
    </StepperContent>
  );
};
