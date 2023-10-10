import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { TypographyName } from '@elvia/elvis-typography';
import { StepStates } from './sharedTypes';
import { ComponentPropsWithoutRef } from 'react';

export type StepperType = 'vertical' | 'horizontal';

export type StepperTypeProps = Omit<StepperProps, 'webcomponent' | 'type'> & {
  numberOfSteps: number;
  currentStep: number;
  handleStepChange: (step: number) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

export interface BaseStepperProps extends HasValue<number>, BaseProps {
  type?: StepperType;
  steps?: StepStates;
  isForced?: boolean;
  typography?: TypographyName;
  content?: JSX.Element[];
}

export interface StepperProps extends BaseStepperProps, ComponentPropsWithoutRef<'div'> {}
