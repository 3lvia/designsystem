import React, { FC, useMemo } from 'react';
import { StepperTypeProps } from './elvia-stepper.types';
import { Step, Steps, StepperContainer, StepperContentWrapper } from './styledComponents';
import { StepDivider } from './StepDivider';
import { StepContent } from './StepContent';
import { VerticalStepElement } from './VerticalStepElement';
import { numberShouldBeVisible } from './utils';

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
  const stepNumbersArray = useMemo(
    () => Array.from({ length: numberOfSteps }, (_, i) => i + 1),
    [numberOfSteps],
  );
  const errorSteps = useMemo(
    () => stepNumbersArray.filter((_, i) => steps?.[i + 1].isError),
    [numberOfSteps, steps],
  );
  return (
    <StepperContainer type="vertical" className={className} style={inlineStyle} {...rest}>
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
      <Steps type="vertical">
        {stepNumbersArray.map(
          (stepNumber) =>
            numberShouldBeVisible(stepNumber, currentStep, numberOfSteps) && (
              <Step type="vertical" key={stepNumber} isActive={stepNumber === currentStep}>
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
                      isDots={!numberShouldBeVisible(stepNumber + 1, currentStep, numberOfSteps)}
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
