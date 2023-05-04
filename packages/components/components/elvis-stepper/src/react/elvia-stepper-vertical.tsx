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

export const StepperVertical: FC<StepperTypeProps> = function ({
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
  return (
    <StepperContainer type="vertical" className={className} style={inlineStyle} {...rest}>
      <Steps type="vertical">
        {[...Array(numSteps)].map((_, i) => (
          <Step type="vertical" key={i} isActive={i + 1 === currentStep}>
            <StepHeader>
              <StepNumber
                isActive={i + 1 === currentStep}
                isError={states?.[i + 1]?.isError}
                isCompleted={states?.[i + 1]?.isCompleted}
                onClick={() => handleStepChange(i + 1)}
              >
                {i + 1}
              </StepNumber>
              {i + 1 === currentStep ? <StepperTitle type="vertical">Title</StepperTitle> : null}
            </StepHeader>
            {i + 1 < numSteps && i + 1 !== currentStep && (
              <StepLine type="vertical" isSelected={i < currentStep}></StepLine>
            )}
            <StepperContent type="vertical" isActive={i + 1 === currentStep}>
              <div ref={contentRef}>{content?.[currentStep - 1]}</div>
              <StepperActions>
                <PrimaryButton onClick={() => handleStepChange(currentStep - 1)}>Back</PrimaryButton>
                <SecondaryButton onClick={() => handleStepChange(currentStep + 1)}>
                  {completeButtonText && currentStep === numSteps ? completeButtonText : 'Next'}
                </SecondaryButton>
              </StepperActions>
            </StepperContent>
          </Step>
        ))}
      </Steps>
    </StepperContainer>
  );
};

export default StepperVertical;
