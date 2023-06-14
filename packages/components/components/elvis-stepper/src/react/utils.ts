import { StepStates } from './elvia-stepper.types';

export const isReachable = (forced: boolean, i: number, steps?: StepStates): boolean => {
  return !(forced && i !== 1 && !steps?.[i - 1]?.isCompleted);
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
  if (
    numberOfNeighborSteps % 2 !== 0 &&
    stepNumber - currentStep === (numberOfNeighborSteps % 2) + Math.floor(numberOfNeighborSteps / 2)
  ) {
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
  let statusMessage = `På steg ${currentStep}. `;
  if (currentStep > 1) {
    statusMessage += `Det forrige steget var ${
      steps?.[currentStep - 1].isCompleted ? 'vellykket' : 'ikke fullført'
    }. `;
  }

  if (errorSteps.length > 0) {
    statusMessage += 'Steg ';
    errorSteps.forEach((stepNumber: number, i: number) => {
      if (i === errorSteps.length - 1) {
        statusMessage += stepNumber;
      } else if (i === errorSteps.length - 2) {
        statusMessage += stepNumber + ' og ';
      } else {
        statusMessage += stepNumber + ', ';
      }
    });
    statusMessage += ' var ugyldig.';
  }
  return statusMessage;
};
