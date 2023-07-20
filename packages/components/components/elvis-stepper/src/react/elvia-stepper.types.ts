import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { TypographyName } from '@elvia/elvis-typography';
import { StepStates } from './sharedTypes';

export type StepperType = 'vertical' | 'horizontal';

export type StepperTypeProps = Omit<StepperProps, 'webcomponent' | 'type'> & {
  numberOfSteps: number;
  currentStep: number;
  handleStepChange: (step: number) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

export interface StepperProps extends HasValue<number>, BaseProps {
  type?: StepperType;
  steps?: StepStates;
  isForced?: boolean;
  typography?: TypographyName;
  content?: JSX.Element[];
}
