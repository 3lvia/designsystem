import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { HasError } from '@elvia/elvis-toolbox';
import { CSSProperties } from 'react';

export type MinuteInterval = '1' | '5' | '10' | '15' | '60';
export type ChangeType = 'hour' | 'minute';
export type ErrorType = 'invalidTime' | 'required';

export interface TimepickerProps extends HasError {
  value: Date;
  valueOnChange: (value: Date | null) => void;
  errorOnChange: (error: string) => void;
  minuteInterval: MinuteInterval;
  isDisabled: boolean;
  isCompact: boolean;
  isRequired: boolean;
  selectNowOnOpen: boolean;
  label: string;
  className: string;
  inlineStyle: CSSProperties;
  webcomponent: ElvisComponentWrapper;
}
