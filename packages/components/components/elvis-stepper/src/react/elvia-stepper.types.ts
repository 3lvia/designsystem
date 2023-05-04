import { CSSProperties } from 'react';

import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { HasValue } from '@elvia/elvis-toolbox';

interface StepState {
  isError: boolean;
  isCompleted: boolean;
}

export interface StepStates {
  [step: number]: Partial<StepState>;
}

export interface StepperTypeProps extends HasValue<number> {
  numSteps: number;
  currentStep: number;
  states?: StepStates;
  forced?: boolean;
  titles?: string[];
  completeButtonText?: string;
  className?: string;
  inlineStyle?: CSSProperties;
  handleStepChange: (step: number) => void;
  contentRef: React.RefObject<HTMLDivElement>;
  content?: JSX.Element[];
}

export interface StepperProps extends HasValue<number> {
  type: string;
  states?: StepStates;
  forced?: boolean;
  titles?: string[];
  completeButtonText?: string;
  content?: JSX.Element[];
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
