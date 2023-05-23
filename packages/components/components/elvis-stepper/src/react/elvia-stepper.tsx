import React, { FC, useEffect, useRef, useState } from 'react';
import { StepperProps } from './elvia-stepper.types';
import { StepperVertical } from './elvia-stepper-vertical';
import { StepperHorizontal } from './elvia-stepper-horizontal';

export const Stepper: FC<StepperProps> = function ({
  // value,
  // valueOnChange,
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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elem = webcomponent?.getSlot('content');
    if (elem && contentRef.current) {
      setNumberOfSteps(elem.children.length);
      console.log(contentRef.current.innerHTML, elem?.children[currentStep - 1]);
      contentRef.current.innerHTML = elem?.children[currentStep - 1].innerHTML;
    }
  }, [webcomponent, contentRef, currentStep, type]);

  useEffect(() => {
    if (content) {
      setNumberOfSteps(content.length);
    }
  }, [content]);

  const handleStepChange = (step: number) => {
    if (step >= 1 && step <= numberOfSteps) setCurrentStep(step);
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
