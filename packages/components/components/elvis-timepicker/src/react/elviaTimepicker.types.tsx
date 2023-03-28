import { BaseProps, HasError, HasValue } from '@elvia/elvis-toolbox';

export type MinuteInterval = '1' | '5' | '10' | '15' | '60';
export type ChangeType = 'hour' | 'minute';
export type ErrorType = 'invalidTime' | 'required';

export interface TimepickerProps extends BaseProps, HasValue<Date | null>, HasError {
  /**
   * @cegType radioGroup
   * @cegValue 10
   * @cegGroup Minute interval
   */
  minuteInterval: MinuteInterval;

  /**
   * @cegType checkbox
   * @cegValue false
   * @cegLabel Disabled
   * @cegGroup State
   */
  isDisabled: boolean;

  /**
   * @cegType checkbox
   * @cegValue false
   * @cegLabel Compact
   * @cegGroup Size
   */
  isCompact: boolean;

  /**
   * @cegType checkbox
   * @cegValue false
   * @cegLabel Full width
   * @cegGroup State
   */
  isFullWidth: boolean;

  /**
   * @cegType checkbox
   * @cegValue false
   * @cegLabel Required
   * @cegGroup Options
   */
  isRequired: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;

  /**
   * @cegType checkbox
   * @cegValue true
   * @cegLabel Select Now On Open
   * @cegGroup Options
   */
  selectNowOnOpen: boolean;
  label: string;

  /**
   * Used by the datepicker range component. Internal use only.
   * @internal
   */
  onFocus: () => void;
}
