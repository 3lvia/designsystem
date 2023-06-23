import { useMemo } from 'react';
import { StepStates } from './sharedTypes';

export const useStepNumbers = (
  numberOfSteps: number,
  steps: StepStates | undefined,
): [number[], number[]] => {
  const stepNumbersArray = useMemo(
    () => Array.from({ length: numberOfSteps }, (_, i) => i + 1),
    [numberOfSteps],
  );
  const errorSteps = useMemo(
    () => stepNumbersArray.filter((_, i) => steps?.[i + 1]?.isError),
    [numberOfSteps, steps],
  );

  return [stepNumbersArray, errorSteps];
};
