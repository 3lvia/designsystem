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

export const StepperHorizontal: FC<StepperTypeProps> = function ({
  numSteps,
  currentStep,
  states,
  completeButtonText,
  className,
  inlineStyle,
  handleStepChange,
  contentRef,
  content,
  ...rest
}) {
  console.log(completeButtonText, numSteps, currentStep);
  return (
    <StepperContainer type="horizontal" className={className} style={inlineStyle} {...rest}>
      <Steps type="horizontal">
        {[...Array(numSteps)].map((_, i) => (
          <Step type="horizontal" key={i} isActive={i + 1 === currentStep}>
            {i > 0 && <StepLine type="horizontal" isSelected={i < currentStep}></StepLine>}
            <StepHeader>
              <StepNumber
                isActive={i + 1 === currentStep}
                isError={states?.[i + 1]?.isError}
                isCompleted={states?.[i + 1]?.isCompleted}
                onClick={() => handleStepChange(i + 1)}
              >
                {i + 1}
              </StepNumber>
            </StepHeader>
          </Step>
        ))}
      </Steps>
      <StepperContent type="horizontal">
        <StepperTitle type="horizontal">Title</StepperTitle>
        <div ref={contentRef}>{content?.[currentStep - 1]}</div>
        <StepperActions>
          <PrimaryButton onClick={() => handleStepChange(currentStep - 1)}>Back</PrimaryButton>
          <SecondaryButton onClick={() => handleStepChange(currentStep + 1)}>
            {completeButtonText && currentStep === numSteps ? completeButtonText : 'Next'}
          </SecondaryButton>
        </StepperActions>
      </StepperContent>
    </StepperContainer>
  );
};

export default StepperHorizontal;
