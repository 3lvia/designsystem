import { BaseProps, type FormFieldSizes, HasError, HasValue } from '@elvia/elvis-toolbox';
import { MinuteInterval } from './publicApi.public';

export interface TimepickerProps extends BaseProps, HasValue<Date | null>, HasError {
  minuteInterval: MinuteInterval;
  isDisabled: boolean;
  size: FormFieldSizes;
  hasSecondPicker: boolean;
  isFullWidth: boolean;
  isRequired: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  selectNowOnOpen: boolean;
  label: string;
  maxTime?: Date;
  minTime?: Date;

  /**
   * Used by the datepicker range component. Internal use only.
   * @internal
   */
  onFocus: () => void;
}
