import React, { FC, useMemo } from 'react';
import { StepperTypeProps } from './elvia-stepper.types';
import { Steps, StepperContainer, StepperTitle, Step, StepNumber } from './styledComponents';
import { isReachable } from './elvia-stepper';
import { StepDivider } from './StepDivider';
import { StepContent } from './StepContent';

export const StepperHorizontal: FC<StepperTypeProps> = function ({
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
    <StepperContainer type="horizontal" className={className} style={inlineStyle} {...rest}>
      <Steps type="horizontal">
        {stepNumbersArray.map(
          (stepNumber) =>
            numberShouldBeVisible(stepNumber) && (
              <Step type="horizontal" key={stepNumber} isActive={stepNumber === currentStep}>
                <StepNumber
                  isActive={stepNumber === currentStep}
                  isError={steps?.[stepNumber]?.isError}
                  isCompleted={steps?.[stepNumber]?.isCompleted}
                  isDisabled={!isReachable(forced, stepNumber, steps)}
                  onClick={() =>
                    handleStepChange(isReachable(forced, stepNumber, steps) ? stepNumber : currentStep)
                  }
                >
                  {stepNumber}
                </StepNumber>
                {stepNumber < numSteps && (
                  <StepDivider
                    isDots={!numberShouldBeVisible(stepNumber + 1)}
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
        numSteps={numSteps}
        completeButtonText={completeButtonText}
        content={content}
        contentRef={contentRef}
        forced={forced}
        steps={steps}
        type="horizontal"
      />
    </StepperContainer>
  );
};

export default StepperHorizontal;
