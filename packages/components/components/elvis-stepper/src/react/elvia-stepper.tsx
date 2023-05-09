import React, { FC, useEffect, useRef, useState } from 'react';
import { StepperProps, StepStates } from './elvia-stepper.types';
import { StepperVertical } from './elvia-stepper-vertical';
import { StepperHorizontal } from './elvia-stepper-horizontal';

export const isReachable = (forced: boolean, i: number, steps?: StepStates): boolean => {
  return !(forced && i !== 0 && !steps?.[i]?.isCompleted);
};

export const Stepper: FC<StepperProps> = function ({
  // value,
  // valueOnChange,
  type = 'horizontal',
  steps,
  content,
  completeButtonText,
  forced = false,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  const [numSteps, setNumSteps] = useState(1);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elem = webcomponent?.getSlot('content');
    if (elem && contentRef.current) {
      setNumSteps(elem.children.length);
      contentRef.current.innerHTML = elem?.children[currentStep].innerHTML;
    }
  }, [webcomponent, contentRef, currentStep]);

  useEffect(() => {
    console.log('current states', steps?.[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    if (content) {
      setNumSteps(content.length);
    }
  }, [content]);

  const handleStepChange = (step: number) => {
    if (step >= 0 && step < numSteps) setCurrentStep(step);
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
          forced={forced}
          inlineStyle={inlineStyle}
          steps={steps}
          {...rest}
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
          forced={forced}
          inlineStyle={inlineStyle}
          steps={steps}
          {...rest}
        />
      )}
    </>
  );
};

export default Stepper;
