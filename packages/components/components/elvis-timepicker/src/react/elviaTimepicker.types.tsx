import { BaseProps, HasError, HasValue } from '@elvia/elvis-toolbox';

export type MinuteInterval = '1' | '5' | '10' | '15' | '60';
export type ChangeType = 'hour' | 'minute';
export type ErrorType = 'invalidTime' | 'required';

export interface TimepickerProps extends BaseProps, HasValue<Date | null>, HasError {
  minuteInterval: MinuteInterval;
  isDisabled: boolean;
  isCompact: boolean;
  isRequired: boolean;
  selectNowOnOpen: boolean;
  label: string;
}
