import React, { FC } from 'react';

import { PrimaryButton, SecondaryButton } from '@elvia/elvis-toolbox';

import { StepperType } from './elvia-stepper.types';
import { StepStates } from './publicApi.public';
import { StepperActions, StepperContent } from './styledComponents';
import { isReachable } from './utils';

type StepContentProps = {
  currentStep: number;
  steps?: StepStates;
  isForced?: boolean;
  content?: JSX.Element[];
  contentRef: React.RefObject<HTMLDivElement>;
  type?: StepperType;
  handleStepChange: (step: number) => void;
};

export const StepContent: FC<StepContentProps> = function ({
  currentStep,
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
            {steps?.[currentStep]?.previousButtonText ?? 'Tilbake'}
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
          {steps?.[currentStep]?.nextButtonText ?? 'Neste'}
        </PrimaryButton>
      </StepperActions>
    </StepperContent>
  );
};
