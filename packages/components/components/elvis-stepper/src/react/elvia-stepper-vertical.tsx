import React, { FC } from 'react';
import { StepperTypeProps } from './elvia-stepper.types';
import {
  Step,
  Steps,
  StepHeader,
  StepLine,
  StepNumber,
  StepperContainer,
  StepperActions,
  StepperContent,
  StepperTitle,
} from './styledComponents';
import { PrimaryButton, SecondaryButton } from '@elvia/elvis-toolbox';
import { isReachable } from './elvia-stepper';

export const StepperVertical: FC<StepperTypeProps> = function ({
  numSteps,
  currentStep,
  steps,
  completeButtonText,
  className,
  forced = false,
  inlineStyle,
  handleStepChange,
  contentRef,
  content,
  ...rest
}) {
  console.log(contentRef);
  return (
    <StepperContainer type="vertical" className={className} style={inlineStyle} {...rest}>
      <Steps type="vertical">
        {[...Array(numSteps)].map((_, i) => {
          const stepIndex = i + 1;
          return (
            <Step type="vertical" key={i} isActive={stepIndex === currentStep}>
              <StepHeader>
                <StepNumber
                  isActive={stepIndex === currentStep}
                  isError={steps?.[stepIndex]?.isError}
                  isCompleted={steps?.[stepIndex]?.isCompleted}
                  isDisabled={!isReachable(forced, stepIndex, steps)}
                  onClick={() =>
                    handleStepChange(isReachable(forced, stepIndex, steps) ? stepIndex : currentStep)
                  }
                >
                  {stepIndex}
                </StepNumber>
                <StepperTitle type="vertical" isActive={stepIndex === currentStep}>
                  {steps?.[stepIndex]?.title ?? ''}
                </StepperTitle>
              </StepHeader>
              {stepIndex < numSteps && stepIndex !== currentStep && (
                <StepLine type="vertical" isSelected={stepIndex - 1 < currentStep}></StepLine>
              )}
              <StepperContent type="vertical" isActive={stepIndex === currentStep}>
                <div ref={contentRef}>{content?.[currentStep - 1]}</div>
                <StepperActions>
                  <PrimaryButton onClick={() => handleStepChange(currentStep - 1)}>Back</PrimaryButton>
                  <SecondaryButton
                    onClick={() =>
                      handleStepChange(
                        isReachable(forced, currentStep + 1, steps) ? currentStep + 1 : currentStep,
                      )
                    }
                  >
                    {completeButtonText && currentStep === numSteps ? completeButtonText : 'Next'}
                  </SecondaryButton>
                </StepperActions>
              </StepperContent>
            </Step>
          );
        })}
      </Steps>
    </StepperContainer>
  );
};

export default StepperVertical;
