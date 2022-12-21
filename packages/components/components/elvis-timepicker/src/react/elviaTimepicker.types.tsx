import { BaseProps, HasError, HasValue } from '@elvia/elvis-toolbox';

export type MinuteInterval = '1' | '5' | '10' | '15' | '60';
export type ChangeType = 'hour' | 'minute';
export type ErrorType = 'invalidTime' | 'required';

export interface TimepickerProps extends BaseProps, HasValue<Date | null>, HasError {
  minuteInterval: MinuteInterval;
  isDisabled: boolean;
  isCompact: boolean;
  isRequired: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  selectNowOnOpen: boolean;
  label: string;

  /**
   * Used by the datepicker range component. Internal use only.
   * @internal
   */
  onInputFocus: () => void;
}
