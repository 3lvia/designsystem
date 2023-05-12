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
  const stepNumbersArray = useMemo(() => Array.from({ length: numSteps }, (_, i) => i), [numSteps]);
  return (
    <StepperContainer type="vertical" className={className} style={inlineStyle} {...rest}>
      <Steps type="vertical">
        {stepNumbersArray.map(
          (i) =>
            numberShouldBeVisible(i) && (
              <Step type="vertical" key={i} isActive={i === currentStep}>
                <VerticalStepElement
                  currentStep={currentStep}
                  handleStepChange={handleStepChange}
                  i={i}
                  forced={forced}
                  steps={steps}
                  typography={typography}
                />
                <StepperContentWrapper>
                  {i < numSteps - 1 && (
                    <StepDivider
                      isDots={!numberShouldBeVisible(i + 1)}
                      type="vertical"
                      isSelected={currentStep > i}
                      isActive={i === currentStep}
                    />
                  )}
                  {currentStep === i && (
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
