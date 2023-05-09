import { CSSProperties } from 'react';

import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { HasValue } from '@elvia/elvis-toolbox';

interface StepState {
  title: string;
  isError: boolean;
  isCompleted: boolean;
}

export interface StepStates {
  [step: number]: Partial<StepState>;
}

export interface StepperTypeProps extends HasValue<number> {
  numSteps: number;
  currentStep: number;
  steps?: StepStates;
  forced?: boolean;
  completeButtonText?: string;
  className?: string;
  inlineStyle?: CSSProperties;
  handleStepChange: (step: number) => void;
  contentRef: React.RefObject<HTMLDivElement>;
  content?: JSX.Element[];
}

export interface StepperProps extends HasValue<number> {
  type?: string;
  steps?: StepStates;
  forced?: boolean;
  completeButtonText?: string;
  content?: JSX.Element[];
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
