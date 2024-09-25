import { useLanguage } from '@elvia/elvis-toolbox';

import { StepStates } from './publicApi.public';

export const isReachable = (forced: boolean, stepNumber: number, steps?: StepStates): boolean => {
  return !(forced && stepNumber !== 1 && !steps?.[stepNumber - 1]?.isCompleted);
};

export const numberShouldBeVisible = (
  stepNumber: number,
  currentStep: number,
  numberOfSteps: number,
  numberOfVisibleSteps: number,
): boolean => {
  // show if first or last
  if (stepNumber === 1 || stepNumber === numberOfSteps) {
    return true;
  }

  // show if it is currentStep or next to currentStep
  const numberOfNeighborSteps = numberOfVisibleSteps - 3;
  if (Math.abs(currentStep - stepNumber) <= Math.floor(numberOfNeighborSteps / 2)) {
    return true;
  }

  // if the number of neighbors is odd and the step is on the right of the nearest neighbor (adds one neighbor to the right)
  if (numberOfNeighborSteps % 2 !== 0 && stepNumber === currentStep + Math.ceil(numberOfNeighborSteps / 2)) {
    return true;
  }

  // if we are at start of stepper
  if (currentStep <= numberOfVisibleSteps - 2) {
    if (stepNumber <= numberOfVisibleSteps - 1) {
      return true;
    }
  }

  // if we are at end of stepper
  if (currentStep >= numberOfSteps - 1) {
    if (Math.abs(stepNumber - numberOfSteps) <= numberOfVisibleSteps - 2) {
      return true;
    }
  }
  return false;
};

export const generateStatusMessage = (currentStep: number, steps: StepStates, errorSteps: number[]) => {
  const lang = useLanguage();

  const getTranslatedLabels = () => {
    return {
      onStep: lang === 'no' ? 'På steg' : 'On step',
      previousStep: lang === 'no' ? 'Det forrige steget var' : 'The previous step was',
      steps: lang === 'no' ? 'Steg' : 'Steps',
      and: lang === 'no' ? 'og' : 'and',
      wasInvalid: lang === 'no' ? 'var ugyldig' : 'was invalid',
      statusLabel: (isCompleted: boolean) =>
        isCompleted
          ? lang === 'no'
            ? 'fullført'
            : 'completed'
          : lang === 'no'
            ? 'ikke fullført'
            : 'not completed',
    };
  };

  const labels = getTranslatedLabels();

  let statusMessage = `${labels.onStep} ${currentStep}. `;
  if (currentStep > 1) {
    statusMessage += `${labels.previousStep} ${labels.statusLabel(
      steps?.[currentStep - 1]?.isCompleted ?? false,
    )}. `;
  }

  if (errorSteps.length > 0) {
    statusMessage += `${labels.steps} `;
    errorSteps.forEach((stepNumber: number, i: number) => {
      if (i === errorSteps.length - 1) {
        statusMessage += stepNumber;
      } else if (i === errorSteps.length - 2) {
        statusMessage += stepNumber + ` ${labels.and} `;
      } else {
        statusMessage += stepNumber + ', ';
      }
    });
    statusMessage += ` ${labels.wasInvalid}.`;
  }
  return statusMessage;
};
