import React, { FC, useEffect, useRef, useState } from 'react';
import { StepperProps } from './elvia-stepper.types';
import { StepperVertical } from './elvia-stepper-vertical';
import { StepperHorizontal } from './elvia-stepper-horizontal';

export const Stepper: FC<StepperProps> = function ({
  type = 'horizontal',
  steps,
  completeButtonText,
  isForced = false,
  typography,
  content,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  const [numberOfSteps, setNumberOfSteps] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elem = webcomponent?.getSlot('content');
    if (elem && contentRef.current) {
      setNumberOfSteps(elem.children.length);
      contentRef.current.innerHTML = elem?.children[currentStep - 1].outerHTML;
    }
  }, [webcomponent, contentRef, currentStep, type]);

  useEffect(() => {
    if (content) {
      setNumberOfSteps(content.length);
    }
  }, [content]);

  const handleStepChange = (step: number) => {
    if (step >= 1 && step <= numberOfSteps) {
      setCurrentStep(step);
    }
  };

  return (
    <>
      {type === 'vertical' ? (
        <StepperVertical
          numberOfSteps={numberOfSteps}
          currentStep={currentStep}
          completeButtonText={completeButtonText}
          isForced={isForced}
          handleStepChange={handleStepChange}
          typography={typography}
          contentRef={contentRef}
          content={content}
          className={className}
          inlineStyle={inlineStyle}
          steps={steps}
          {...rest}
        />
      ) : (
        <StepperHorizontal
          numberOfSteps={numberOfSteps}
          currentStep={currentStep}
          completeButtonText={completeButtonText}
          isForced={isForced}
          handleStepChange={handleStepChange}
          typography={typography}
          contentRef={contentRef}
          content={content}
          className={className}
          inlineStyle={inlineStyle}
          steps={steps}
          {...rest}
        />
      )}
    </>
  );
};

export default Stepper;
