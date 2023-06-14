import React, { FC, useMemo } from 'react';
import { StepperTypeProps } from './elvia-stepper.types';
import { Steps, StepperContainer, StepperTitle, Step, StepNumber, StatusMessage } from './styledComponents';
import { generateStatusMessage, isReachable, numberShouldBeVisible } from './utils';
import { StepDivider } from './StepDivider';
import { StepContent } from './StepContent';
import { useRovingFocus } from '@elvia/elvis-toolbox';
import { useDynamicStepCount } from './useDynamicStepCount';

export const StepperHorizontal: FC<StepperTypeProps> = function ({
  numberOfSteps,
  currentStep,
  steps,
  completeButtonText,
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
  const stepNumbersArray = useMemo(
    () => Array.from({ length: numberOfSteps }, (_, i) => i + 1),
    [numberOfSteps],
  );
  const errorSteps = useMemo(
    () => stepNumbersArray.filter((_, i) => steps?.[i + 1].isError),
    [numberOfSteps, steps],
  );

  const { ref: listContainerRef } = useRovingFocus<HTMLUListElement>({ dir: 'horizontal' });

  return (
    <StepperContainer
      type="horizontal"
      className={className}
      style={inlineStyle}
      ref={stepListElement}
      {...rest}
    >
      <StatusMessage aria-live="polite" role="region">
        {steps && generateStatusMessage(currentStep, steps, errorSteps)}
      </StatusMessage>
      <Steps type="horizontal" role="tablist" aria-orientation="horizontal" ref={listContainerRef}>
        {stepNumbersArray.map(
          (stepNumber) =>
            numberShouldBeVisible(stepNumber, currentStep, numberOfSteps, numberOfVisibleSteps) && (
              <Step
                type="horizontal"
                key={stepNumber}
                isActive={stepNumber === currentStep}
                isLast={stepNumber === numberOfSteps}
              >
                <StepNumber
                  role="tab"
                  aria-selected={stepNumber === currentStep}
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
                    type="horizontal"
                    isSelected={currentStep > stepNumber}
                    isActive={stepNumber === currentStep}
                  />
                )}
              </Step>
            ),
        )}
      </Steps>
      <StepperTitle type="horizontal" typography={typography}>
        {steps?.[currentStep]?.title ?? ''}
      </StepperTitle>
      <StepContent
        currentStep={currentStep}
        handleStepChange={handleStepChange}
        numberOfSteps={numberOfSteps}
        completeButtonText={completeButtonText}
        content={content}
        contentRef={contentRef}
        isForced={isForced}
        steps={steps}
        type="horizontal"
      />
    </StepperContainer>
  );
};

export default StepperHorizontal;
