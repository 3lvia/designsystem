import { CSSProperties } from 'react';

import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { TypographyName } from '@elvia/elvis-typography';

interface StepState {
  title: string;
  isError: boolean;
  isCompleted: boolean;
}

export interface StepStates {
  [step: number]: Partial<StepState>;
}

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

export interface StepperProps extends HasValue<number> {
  type?: string;
  steps?: StepStates;
  isForced?: boolean;
  completeButtonText?: string;
  typography?: TypographyName;
  content?: JSX.Element[];
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
