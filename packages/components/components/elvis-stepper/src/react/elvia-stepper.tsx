import React, { FC, useEffect, useRef, useState } from 'react';
import { StepperProps } from './elvia-stepper.types';
import { StepperVertical } from './elvia-stepper-vertical';
import { StepperHorizontal } from './elvia-stepper-horizontal';
export * from './elvia-stepper.types';

export const Stepper: FC<StepperProps> = function ({
  type = 'horizontal',
  steps,
  isForced = false,
  typography,
  content,
  value,
  valueOnChange,
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

  useEffect(() => {
    if (value) {
      setCurrentStep(value);
    }
  }, [value]);

  const handleStepChange = (updateCurrentStep: number) => {
    if (updateCurrentStep >= 1 && updateCurrentStep <= numberOfSteps) {
      setCurrentStep(updateCurrentStep);
      if (!webcomponent && valueOnChange) {
        valueOnChange(updateCurrentStep);
      } else if (webcomponent) {
        webcomponent.setProps({ value: updateCurrentStep }, true);
        webcomponent.triggerEvent('valueOnChange', updateCurrentStep);
      }
    }
  };

  return (
    <>
      {type === 'vertical' ? (
        <StepperVertical
          numberOfSteps={numberOfSteps}
          currentStep={currentStep}
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
