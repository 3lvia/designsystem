import React, { FC } from 'react';

import { useRovingFocus } from '@elvia/elvis-toolbox';

import { StepContent } from './StepContent';
import { StepDivider } from './StepDivider';
import { StepperTypeProps } from './elvia-stepper.types';
import { StatusMessage, Step, StepNumber, StepperContainer, StepperTitle, Steps } from './styledComponents';
import { useDynamicStepCount } from './useDynamicStepCount';
import { useStepNumbers } from './useStepNumbers';
import { generateStatusMessage, isReachable, numberShouldBeVisible } from './utils';

export const StepperHorizontal: FC<StepperTypeProps> = function ({
  numberOfSteps,
  currentStep,
  steps,
  isForced = false,
  handleStepChange,
  typography,
  contentRef,
  content,
  className,
  inlineStyle,
  ...rest
}) {
  const { numberOfVisibleSteps, stepListElement } = useDynamicStepCount(90);
  const [stepNumbersArray, errorSteps] = useStepNumbers(numberOfSteps, steps);

  const { ref: listContainerRef } = useRovingFocus<HTMLDivElement>({ dir: 'horizontal' });

  return (
    <StepperContainer className={className} style={inlineStyle} ref={stepListElement} {...rest}>
      <StatusMessage aria-live="polite">
        {steps && generateStatusMessage(currentStep, steps, errorSteps)}
      </StatusMessage>
      <Steps role="tablist" aria-orientation="horizontal" ref={listContainerRef}>
        {stepNumbersArray.map(
          (stepNumber) =>
            numberShouldBeVisible(stepNumber, currentStep, numberOfSteps, numberOfVisibleSteps) && (
              <Step
                role="tab"
                aria-selected={stepNumber === currentStep}
                key={stepNumber}
                isActive={stepNumber === currentStep}
                isLast={stepNumber === numberOfSteps}
              >
                <StepNumber
                  isActive={stepNumber === currentStep}
                  isError={steps?.[stepNumber]?.isError}
                  isCompleted={steps?.[stepNumber]?.isCompleted}
                  isDisabled={!isReachable(isForced, stepNumber, steps)}
                  onClick={() =>
                    handleStepChange(isReachable(isForced, stepNumber, steps) ? stepNumber : currentStep)
                  }
                >
                  {stepNumber}
                </StepNumber>
                {stepNumber < numberOfSteps && (
                  <StepDivider
                    isDots={
                      !numberShouldBeVisible(stepNumber + 1, currentStep, numberOfSteps, numberOfVisibleSteps)
                    }
                    isSelected={currentStep > stepNumber}
                    isActive={stepNumber === currentStep}
                  />
                )}
              </Step>
            ),
        )}
      </Steps>
      <StepperTitle typography={typography}>{steps?.[currentStep]?.heading ?? ''}</StepperTitle>
      <StepContent
        currentStep={currentStep}
        handleStepChange={handleStepChange}
        content={content}
        contentRef={contentRef}
        isForced={isForced}
        steps={steps}
      />
    </StepperContainer>
  );
};

export default StepperHorizontal;
