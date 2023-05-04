import React, { FC, useEffect, useRef, useState } from 'react';
import { StepperProps, StepStates } from './elvia-stepper.types';
import { StepperVertical } from './elvia-stepper-vertical';
import { StepperHorizontal } from './elvia-stepper-horizontal';

export const isReachable = (forced: boolean, stepIndex: number, states?: StepStates): boolean => {
  return !(forced && !states?.[stepIndex - 1]?.isCompleted && stepIndex !== 1);
};

export const Stepper: FC<StepperProps> = function ({
  // value,
  // valueOnChange,
  type = 'horizontal',
  states,
  content,
  completeButtonText,
  forced = false,
  titles,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  const [numSteps, setNumSteps] = useState(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const contentRef = useRef<HTMLDivElement>(null);
  // const [isVisited, setIsVisited] = useState<boolean[]>(Array(numSteps).fill(false));

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
          forced={forced}
          titles={titles}
          inlineStyle={inlineStyle}
          states={states}
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
          titles={titles}
          inlineStyle={inlineStyle}
          states={states}
          {...rest}
        />
      )}
    </>
  );
};

export default Stepper;
