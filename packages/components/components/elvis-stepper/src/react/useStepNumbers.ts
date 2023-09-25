import { useMemo } from 'react';
import { StepStates } from './publicApi.public';

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
    [stepNumbersArray, steps],
  );

  return [stepNumbersArray, errorSteps];
};
