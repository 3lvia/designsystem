import { StepStates } from './elvia-stepper.types';

export const isReachable = (forced: boolean, i: number, steps?: StepStates): boolean => {
  return !(forced && i !== 1 && !steps?.[i - 1]?.isCompleted);
};

export const numberShouldBeVisible = (
  stepNumber: number,
  currentStep: number,
  numberOfSteps: number,
): boolean => {
  // show if first or last
  if (stepNumber === 1 || stepNumber === numberOfSteps) {
    return true;
  }
  // show if it is currentStep or next to currentStep
  if (Math.abs(currentStep - stepNumber) <= 1) {
    return true;
  }
  // if we are at start of stepper
  if (currentStep < 4) {
    if (stepNumber < 5) {
      return true;
    }
  }
  // if we are at end of stepper
  if (currentStep >= numberOfSteps - 1) {
    if (Math.abs(stepNumber - numberOfSteps) < 4) {
      return true;
    }
  }

  return false;
};

export const generateStatusMessage = (currentStep: number, steps: StepStates, errorSteps: number[]) => {
  let statusMessage = `On step ${currentStep}. `;
  if (currentStep > 1) {
    statusMessage += `The previous step was ${
      steps?.[currentStep - 1].isCompleted ? 'successful' : 'incomplete'
    }. `;
  }

  if (errorSteps.length > 0) {
    statusMessage += 'Step ';
    errorSteps.forEach((stepNumber: number, i: number) => {
      if (i === errorSteps.length - 1) {
        statusMessage += stepNumber;
      } else if (i === errorSteps.length - 2) {
        statusMessage += stepNumber + ' and ';
      } else {
        statusMessage += stepNumber + ', ';
      }
    });
    statusMessage += ' was invalid.';
  }
  return statusMessage;
};
