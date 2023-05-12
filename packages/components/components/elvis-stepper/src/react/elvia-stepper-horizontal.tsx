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
  const stepNumbersArray = useMemo(() => Array.from({ length: numSteps }, (_, i) => i), [numSteps]);
  return (
    <StepperContainer type="horizontal" className={className} style={inlineStyle} {...rest}>
      <Steps type="horizontal">
        {stepNumbersArray.map(
          (i) =>
            numberShouldBeVisible(i) && (
              <Step type="horizontal" key={i} isActive={i === currentStep}>
                <StepNumber
                  isActive={i === currentStep}
                  isError={steps?.[i + 1]?.isError}
                  isCompleted={steps?.[i + 1]?.isCompleted}
                  isDisabled={!isReachable(forced, i, steps)}
                  onClick={() => handleStepChange(isReachable(forced, i, steps) ? i : currentStep)}
                >
                  {i + 1}
                </StepNumber>
                {i < numSteps - 1 && (
                  <StepDivider
                    isDots={!numberShouldBeVisible(i + 1)}
                    type="horizontal"
                    isSelected={currentStep > i}
                    isActive={i === currentStep}
                  />
                )}
              </Step>
            ),
        )}
      </Steps>
      <StepperTitle type="horizontal" typography={typography}>
        {steps?.[currentStep + 1]?.title ?? ''}
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
