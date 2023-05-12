import React, { FC, useMemo } from 'react';
import { StepperTypeProps } from './elvia-stepper.types';
import { Step, Steps, StepperContainer, StepperContentWrapper } from './styledComponents';
import { StepDivider } from './StepDivider';
import { StepContent } from './StepContent';
import { VerticalStepElement } from './VerticalStepElement';

export const StepperVertical: FC<StepperTypeProps> = function ({
  numSteps,
  currentStep,
  steps,
  completeButtonText,
  forced = false,
  handleStepChange,
  numberShouldBeVisible,
  typography,
  contentRef,
  content,
  className,
  inlineStyle,
  ...rest
}) {
  const stepNumbersArray = useMemo(() => Array.from({ length: numSteps }, (_, i) => i + 1), [numSteps]);
  return (
    <StepperContainer type="vertical" className={className} style={inlineStyle} {...rest}>
      <Steps type="vertical">
        {stepNumbersArray.map(
          (stepNumber) =>
            numberShouldBeVisible(stepNumber) && (
              <Step type="vertical" key={stepNumber} isActive={stepNumber === currentStep}>
                <VerticalStepElement
                  currentStep={currentStep}
                  handleStepChange={handleStepChange}
                  stepNumber={stepNumber}
                  forced={forced}
                  steps={steps}
                  typography={typography}
                />
                <StepperContentWrapper>
                  {stepNumber < numSteps && (
                    <StepDivider
                      isDots={!numberShouldBeVisible(stepNumber + 1)}
                      type="vertical"
                      isSelected={currentStep > stepNumber}
                      isActive={stepNumber === currentStep}
                    />
                  )}
                  {currentStep === stepNumber && (
                    <StepContent
                      currentStep={currentStep}
                      handleStepChange={handleStepChange}
                      numSteps={numSteps}
                      completeButtonText={completeButtonText}
                      content={content}
                      contentRef={contentRef}
                      forced={forced}
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
