import { CSSProperties } from 'react';
import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { TypographyName } from '@elvia/elvis-typography';

interface StepState {
  heading: string;
  isError: boolean;
  isCompleted: boolean;
}

export interface StepStates {
  [step: number]: Partial<StepState>;
}

export type StepperType = 'vertical' | 'horizontal';

export interface StepperTypeProps extends HasValue<number>, BaseProps {
  numberOfSteps: number;
  currentStep: number;
  steps?: StepStates;
  isForced?: boolean;
  completeButtonText?: string;
  typography?: TypographyName;
  className?: string;
  inlineStyle?: CSSProperties;
  handleStepChange: (step: number) => void;
  contentRef: React.RefObject<HTMLDivElement>;
  content?: JSX.Element[];
}

export interface StepperProps extends HasValue<number>, BaseProps {
  type?: StepperType;
  steps?: StepStates;
  isForced?: boolean;
  completeButtonText?: string;
  typography?: TypographyName;
  content?: JSX.Element[];
}
