import React, { FC, useMemo } from 'react';
import { StepperTypeProps } from './elvia-stepper.types';
import { Steps, StepperContainer, StepperTitle, Step, StepNumber } from './styledComponents';
import { isReachable, numberShouldBeVisible } from './utils';
import { StepDivider } from './StepDivider';
import { StepContent } from './StepContent';

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
  const stepNumbersArray = useMemo(
    () => Array.from({ length: numberOfSteps }, (_, i) => i + 1),
    [numberOfSteps],
  );
  const errorSteps = useMemo(
    () => stepNumbersArray.filter((_, i) => steps?.[i + 1].isError),
    [numberOfSteps, steps],
  );
  return (
    <StepperContainer type="horizontal" className={className} style={inlineStyle} {...rest}>
      <div className="pf-screen-reader e-sr-only" aria-live="polite">
        On step {currentStep}. Step{' '}
        {errorSteps.map((stepNumber: number, i: number) => {
          if (i === errorSteps.length - 1) {
            return stepNumber;
          } else if (i === errorSteps.length - 2) {
            return stepNumber + ' and ';
          } else {
            return stepNumber + ', ';
          }
        })}{' '}
        was invalid.
      </div>
      <Steps type="horizontal" role="tablist">
        {stepNumbersArray.map(
          (stepNumber) =>
            numberShouldBeVisible(stepNumber, currentStep, numberOfSteps) && (
              <Step type="horizontal" key={stepNumber} isActive={stepNumber === currentStep}>
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
                    isDots={!numberShouldBeVisible(stepNumber + 1, currentStep, numberOfSteps)}
                    type="horizontal"
                    isSelected={currentStep > stepNumber}
                    isActive={stepNumber === currentStep}
                  />
                )}
              </Step>
            ),
        )}
      </Steps>
      <StepperTitle aria-label="title" type="horizontal" typography={typography}>
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
