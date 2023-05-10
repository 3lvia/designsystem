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
  StepperContentWrapper,
} from './styledComponents';
import { PrimaryButton, SecondaryButton } from '@elvia/elvis-toolbox';
import { isReachable } from './elvia-stepper';

export const StepperVertical: FC<StepperTypeProps> = function ({
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
  console.log(contentRef.current?.innerHTML);
  return (
    <StepperContainer type="vertical" className={className} style={inlineStyle} {...rest}>
      <Steps type="vertical">
        {[...Array(numSteps)].map((_, i) => {
          return (
            <Step type="vertical" key={i} isActive={i === currentStep}>
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
                <StepperTitle type="vertical" isActive={i === currentStep} typography={typography}>
                  {steps?.[i + 1]?.title ?? ''}
                </StepperTitle>
              </StepHeader>
              <StepperContentWrapper>
                {i < numSteps - 1 && (
                  <StepLine
                    type="vertical"
                    isSelected={i < currentStep}
                    isActive={i === currentStep}
                  ></StepLine>
                )}
                {currentStep === i ? (
                  <StepperContent type="vertical">
                    <div ref={contentRef}>{content?.[currentStep]}</div>
                    <StepperActions>
                      <PrimaryButton onClick={() => handleStepChange(currentStep - 1)}>Back</PrimaryButton>
                      <SecondaryButton
                        onClick={() =>
                          handleStepChange(
                            isReachable(forced, currentStep + 1, steps) ? currentStep + 1 : currentStep,
                          )
                        }
                      >
                        {completeButtonText && currentStep === numSteps - 1 ? completeButtonText : 'Next'}
                      </SecondaryButton>
                    </StepperActions>
                  </StepperContent>
                ) : null}
              </StepperContentWrapper>
            </Step>
          );
        })}
      </Steps>
    </StepperContainer>
  );
};

export default StepperVertical;
