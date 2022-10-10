import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type MinuteInterval = '1' | '5' | '10' | '15' | '60';
export type ChangeType = 'hour' | 'minute';
export type ErrorType = 'invalidTime' | 'required';

export interface TimepickerProps {
  value: Date;
  valueOnChange: (value: Date) => void;
  errorOnChange: (error: string) => void;
  minuteInterval: MinuteInterval;
  isDisabled: boolean;
  isCompact: boolean;
  isRequired: boolean;
  showValidationState?: boolean;
  isErrorState?: boolean;
  customError?: string;
  selectNowOnOpen: boolean;
  label: string;
  className: string;
  inlineStyle: CSSProperties;
  webcomponent: ElvisComponentWrapper;
}
