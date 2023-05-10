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
  forced = false,
  handleStepChange,
  typography,
  contentRef,
  content,
  className,
  inlineStyle,
  ...rest
}) {
  return (
    <StepperContainer type="horizontal" className={className} style={inlineStyle} {...rest}>
      <Steps type="horizontal">
        {[...Array(numSteps)].map((_, i) => {
          return (
            <Step type="horizontal" key={i} isActive={i === currentStep}>
              <StepHeader>
                <StepNumber
                  isActive={i === currentStep}
                  isError={steps?.[i + 1]?.isError}
                  isCompleted={steps?.[i + 1]?.isCompleted}
                  isDisabled={!isReachable(forced, i, steps)}
                  onClick={() => handleStepChange(isReachable(forced, i, steps) ? i : currentStep)}
                >
                  {i + 1}
                </StepNumber>
              </StepHeader>
              {i < numSteps - 1 && <StepLine type="horizontal" isSelected={i < currentStep}></StepLine>}
            </Step>
          );
        })}
      </Steps>
      <StepperContent type="horizontal">
        <StepperTitle type="horizontal" typography={typography}>
          {steps?.[currentStep + 1]?.title ?? ''}
        </StepperTitle>
        <div ref={contentRef}>{content?.[currentStep]}</div>
        <StepperActions>
          <PrimaryButton onClick={() => handleStepChange(currentStep - 1)}>Back</PrimaryButton>
          <SecondaryButton
            onClick={() =>
              handleStepChange(isReachable(forced, currentStep + 1, steps) ? currentStep + 1 : currentStep)
            }
          >
            {completeButtonText && currentStep === numSteps - 1 ? completeButtonText : 'Next'}
          </SecondaryButton>
        </StepperActions>
      </StepperContent>
    </StepperContainer>
  );
};

export default StepperHorizontal;
