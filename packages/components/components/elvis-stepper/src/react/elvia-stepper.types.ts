import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { TypographyName } from '@elvia/elvis-typography';
import { ComponentPropsWithoutRef } from 'react';

import { StepStates } from './publicApi.public';

export type StepperType = 'vertical' | 'horizontal';

export type StepperTypeProps = Omit<StepperProps, 'webcomponent' | 'type'> & {
  numberOfSteps: number;
  currentStep: number;
  handleStepChange: (step: number) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

export interface BaseStepperProps extends HasValue<number>, BaseProps {
  content?: JSX.Element[];
  isForced?: boolean;
  onFinish?: () => void;
  onNextClick?: () => void;
  steps?: StepStates;
  type?: StepperType;
  typography?: TypographyName;
}

export interface StepperProps extends BaseStepperProps, Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
