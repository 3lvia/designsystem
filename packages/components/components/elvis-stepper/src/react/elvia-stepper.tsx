import React, { FC, useEffect, useRef, useState } from 'react';

import { StepperHorizontal } from './elvia-stepper-horizontal';
import { StepperVertical } from './elvia-stepper-vertical';
import { StepperProps } from './elvia-stepper.types';

export const Stepper: FC<StepperProps> = function ({
  type = 'horizontal',
  steps,
  isForced = false,
  removeActions,
  typography,
  content,
  value,
  valueOnChange,
  onFinish,
  onNextClick,
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
    if (!(elem && contentRef.current)) {
      return;
    }

    setNumberOfSteps(elem.children.length);

    const newStepElement = elem.children[currentStep - 1];
    const previousStepIndex = Array.from(elem.children).indexOf(newStepElement);

    contentRef.current.innerHTML = '';
    contentRef.current.appendChild(newStepElement);
    return () => {
      // Put the now old step back into the slot object
      if (contentRef.current && newStepElement) {
        elem.insertBefore(newStepElement, elem.children[previousStepIndex]);
      }
    };
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
    if (updateCurrentStep >= 1 && updateCurrentStep <= numberOfSteps && updateCurrentStep !== currentStep) {
      setCurrentStep(updateCurrentStep);
      if (!webcomponent && valueOnChange) {
        valueOnChange(updateCurrentStep);
      } else if (webcomponent) {
        webcomponent.setProps({ value: updateCurrentStep }, true);
        webcomponent.triggerEvent('valueOnChange', updateCurrentStep);
      }
    } else if (updateCurrentStep - 1 === numberOfSteps) {
      onFinish?.();
      webcomponent?.triggerEvent('onFinish');
    }
  };

  const handleNextClick = () => {
    webcomponent?.triggerEvent('onNextClick');
    onNextClick?.();
  };

  return (
    <>
      {type === 'vertical' ? (
        <StepperVertical
          numberOfSteps={numberOfSteps}
          currentStep={currentStep}
          isForced={isForced}
          removeActions={removeActions}
          handleStepChange={handleStepChange}
          onNextClick={handleNextClick}
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
          removeActions={removeActions}
          handleStepChange={handleStepChange}
          onNextClick={handleNextClick}
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
