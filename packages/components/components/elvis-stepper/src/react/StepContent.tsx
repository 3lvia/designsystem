import { PrimaryButton, SecondaryButton, useLanguage } from '@elvia/elvis-toolbox';
import React, { FC } from 'react';

import { StepperType } from './elvia-stepper.types';
import { StepStates } from './publicApi.public';
import { StepperActions, StepperContent } from './styledComponents';
import { isReachable } from './utils';

type StepContentProps = {
  currentStep: number;
  steps?: StepStates;
  isForced?: boolean;
  removeActions?: boolean;
  content?: JSX.Element[];
  contentRef: React.RefObject<HTMLDivElement>;
  type?: StepperType;
  handleStepChange: (step: number) => void;
  onNextClick?: () => void;
};

export const StepContent: FC<StepContentProps> = function ({
  currentStep,
  steps,
  isForced = false,
  removeActions,
  content,
  contentRef,
  type = 'horizontal',
  handleStepChange,
  onNextClick,
}) {
  const lang = useLanguage();

  return (
    <StepperContent $type={type}>
      <div ref={contentRef} role="tabpanel">
        {content?.[currentStep - 1]}
      </div>
      {!removeActions && (
        <StepperActions>
          {currentStep !== 1 ? (
            <SecondaryButton onClick={() => handleStepChange(currentStep - 1)}>
              {steps?.[currentStep]?.previousButtonText ?? (lang === 'no' ? 'Tilbake' : 'Go back')}
            </SecondaryButton>
          ) : (
            <div></div>
          )}
          {steps?.[currentStep]?.nextButtonState === 'loading' ? (
            <PrimaryButton
              onClick={() => onNextClick?.()}
              isLoading
              aria-disabled
              aria-label={lang === 'no' ? 'Laster inn' : 'Loading'}
            >
              <span></span>
              <span></span>
              <span></span>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              aria-disabled={!isReachable(isForced, currentStep + 1, steps)}
              onClick={() => {
                onNextClick?.();
                handleStepChange(
                  isReachable(isForced, currentStep + 1, steps) ? currentStep + 1 : currentStep,
                );
              }}
            >
              {steps?.[currentStep]?.nextButtonText ?? (lang === 'no' ? 'Neste' : 'Next')}
            </PrimaryButton>
          )}
        </StepperActions>
      )}
    </StepperContent>
  );
};
