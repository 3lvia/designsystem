import React, { FC, useEffect, useRef, useState } from 'react';
import { StepperProps } from './elvia-stepper.types';
import { StepperVertical } from './elvia-stepper-vertical';
import { StepperHorizontal } from './elvia-stepper-horizontal';

export const Stepper: FC<StepperProps> = function ({
  // value,
  // valueOnChange,
  type,
  states,
  content,
  completeButtonText,
  className,
  inlineStyle,
  webcomponent,
  // ...rest
}) {
  const [numSteps, setNumSteps] = useState(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elem = webcomponent?.getSlot('content');
    if (elem && contentRef.current) {
      setNumSteps(elem.children.length);
      contentRef.current.innerHTML = elem?.children[currentStep - 1].innerHTML;
    }
  }, [webcomponent, contentRef, currentStep]);

  useEffect(() => {
    console.log('current states', states?.[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    if (content) {
      console.log(content.length);
      setNumSteps(content.length);
    }
  }, [content]);

  const handleStepChange = (step: number) => {
    if (step > 0 && step <= numSteps) setCurrentStep(step);
  };

  return (
    <>
      {type === 'vertical' ? (
        <StepperVertical
          contentRef={contentRef}
          currentStep={currentStep}
          handleStepChange={handleStepChange}
          numSteps={numSteps}
          completeButtonText={completeButtonText}
          className={className}
          content={content}
          inlineStyle={inlineStyle}
          states={states}
        />
      ) : (
        <StepperHorizontal
          contentRef={contentRef}
          currentStep={currentStep}
          handleStepChange={handleStepChange}
          numSteps={numSteps}
          completeButtonText={completeButtonText}
          className={className}
          content={content}
          inlineStyle={inlineStyle}
          states={states}
        />
      )}
    </>
  );
};

export default Stepper;
