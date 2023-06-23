import React, { FC } from 'react';
import { StepperTypeProps } from './elvia-stepper.types';
import { Step, Steps, StepperContainer, StepperContentWrapper, StatusMessage } from './styledComponents';
import { StepDivider } from './StepDivider';
import { StepContent } from './StepContent';
import { VerticalStepElement } from './VerticalStepElement';
import { generateStatusMessage, numberShouldBeVisible } from './utils';
import { useRovingFocus } from '@elvia/elvis-toolbox';
import { useStepNumbers } from './useStepNumbers';

export const StepperVertical: FC<StepperTypeProps> = function ({
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
  const [stepNumbersArray, errorSteps] = useStepNumbers(numberOfSteps, steps);

  const { ref: listContainerRef } = useRovingFocus<HTMLDivElement>({ dir: 'vertical' });

  return (
    <StepperContainer type="vertical" className={className} style={inlineStyle} {...rest}>
      <StatusMessage aria-live="polite">
        {steps && generateStatusMessage(currentStep, steps, errorSteps)}
      </StatusMessage>
      <Steps type="vertical" role="tablist" aria-orientation="vertical" ref={listContainerRef}>
        {stepNumbersArray.map(
          (stepNumber) =>
            numberShouldBeVisible(stepNumber, currentStep, numberOfSteps, 5) && (
              <Step
                type="vertical"
                role="tab"
                aria-selected={stepNumber === currentStep}
                key={stepNumber}
                isActive={stepNumber === currentStep}
                isLast={stepNumber === numberOfSteps}
              >
                <VerticalStepElement
                  currentStep={currentStep}
                  handleStepChange={handleStepChange}
                  stepNumber={stepNumber}
                  isForced={isForced}
                  steps={steps}
                  typography={typography}
                />
                <StepperContentWrapper>
                  {stepNumber < numberOfSteps && (
                    <StepDivider
                      isDots={!numberShouldBeVisible(stepNumber + 1, currentStep, numberOfSteps, 5)}
                      type="vertical"
                      isSelected={currentStep > stepNumber}
                      isActive={stepNumber === currentStep}
                    />
                  )}
                  {currentStep === stepNumber && (
                    <StepContent
                      currentStep={currentStep}
                      handleStepChange={handleStepChange}
                      numberOfSteps={numberOfSteps}
                      completeButtonText={completeButtonText}
                      content={content}
                      contentRef={contentRef}
                      isForced={isForced}
                      steps={steps}
                      type="vertical"
                    />
                  )}
                </StepperContentWrapper>
              </Step>
            ),
        )}
      </Steps>
    </StepperContainer>
  );
};

export default StepperVertical;
