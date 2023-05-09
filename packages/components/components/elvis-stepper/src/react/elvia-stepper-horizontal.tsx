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

export const StepperHorizontal: FC<StepperTypeProps> = function ({
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
  return (
    <StepperContainer type="horizontal" className={className} style={inlineStyle} {...rest}>
      <Steps type="horizontal">
        {[...Array(numSteps)].map((_, i) => {
          const stepIndex = i + 1;
          return (
            <Step type="horizontal" key={i} isActive={stepIndex === currentStep}>
              {stepIndex - 1 > 0 && (
                <StepLine type="horizontal" isSelected={stepIndex - 1 < currentStep}></StepLine>
              )}
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
              </StepHeader>
            </Step>
          );
        })}
      </Steps>
      <StepperContent type="horizontal">
        <StepperTitle type="horizontal">{steps?.[currentStep]?.title ?? ''}</StepperTitle>
        <div ref={contentRef}>{content?.[currentStep]}</div>
        <StepperActions>
          <PrimaryButton onClick={() => handleStepChange(currentStep - 1)}>Back</PrimaryButton>
          <SecondaryButton
            onClick={() =>
              handleStepChange(isReachable(forced, currentStep + 1, steps) ? currentStep + 1 : currentStep)
            }
          >
            {completeButtonText && currentStep === numSteps ? completeButtonText : 'Next'}
          </SecondaryButton>
        </StepperActions>
      </StepperContent>
    </StepperContainer>
  );
};

export default StepperHorizontal;
