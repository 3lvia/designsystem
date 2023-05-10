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
  completeButtonText,
  forced = false,
  typography,
  content,
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
          numSteps={numSteps}
          currentStep={currentStep}
          completeButtonText={completeButtonText}
          forced={forced}
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
          numSteps={numSteps}
          currentStep={currentStep}
          completeButtonText={completeButtonText}
          forced={forced}
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
