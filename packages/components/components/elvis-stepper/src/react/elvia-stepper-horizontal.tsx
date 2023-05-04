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
  states,
  completeButtonText,
  className,
  forced = false,
  inlineStyle,
  handleStepChange,
  titles,
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
                  isError={states?.[stepIndex]?.isError}
                  isCompleted={states?.[stepIndex]?.isCompleted}
                  isDisabled={!isReachable(forced, stepIndex, states)}
                  onClick={() =>
                    handleStepChange(isReachable(forced, stepIndex, states) ? stepIndex : currentStep)
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
        <StepperTitle type="horizontal">{titles?.[currentStep - 1] ?? ''}</StepperTitle>
        <div ref={contentRef}>{content?.[currentStep - 1]}</div>
        <StepperActions>
          <PrimaryButton onClick={() => handleStepChange(currentStep - 1)}>Back</PrimaryButton>
          <SecondaryButton
            onClick={() =>
              handleStepChange(isReachable(forced, currentStep + 1, states) ? currentStep + 1 : currentStep)
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
