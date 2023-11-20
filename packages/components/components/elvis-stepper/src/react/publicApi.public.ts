export interface StepState {
  heading: string;
  isError: boolean;
  isCompleted: boolean;
  nextButtonText: string;
  previousButtonText: string;
}

export interface StepStates {
  [step: number]: Partial<StepState>;
}
