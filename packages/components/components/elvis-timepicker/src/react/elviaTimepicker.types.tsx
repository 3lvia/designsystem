import { BaseProps, HasError } from '@elvia/elvis-toolbox';

export type MinuteInterval = '1' | '5' | '10' | '15' | '60';
export type ChangeType = 'hour' | 'minute';
export type ErrorType = 'invalidTime' | 'required';

export interface TimepickerProps extends BaseProps, HasError {
  value: Date;
  valueOnChange: (value: Date | null) => void;
  errorOnChange: (error: string) => void;
  minuteInterval: MinuteInterval;
  isDisabled: boolean;
  isCompact: boolean;
  isRequired: boolean;
  selectNowOnOpen: boolean;
  label: string;
}
