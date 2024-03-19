export interface StepState {
  heading?: string;
  isError?: boolean;
  isCompleted?: boolean;
  nextButtonText?: string;
  previousButtonText?: string;
  nextButtonState?: 'loading';
}

export interface StepStates {
  [step: number]: Partial<StepState>;
}
