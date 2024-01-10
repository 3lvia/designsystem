import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { TypographyName } from '@elvia/elvis-typography';
import { StepStates } from './publicApi.public';
import { ComponentPropsWithoutRef } from 'react';

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
  steps?: StepStates;
  type?: StepperType;
  typography?: TypographyName;
}

export interface StepperProps extends BaseStepperProps, Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
