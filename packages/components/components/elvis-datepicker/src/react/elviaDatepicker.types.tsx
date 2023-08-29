import { BaseProps, HasError, HasValue, FormFieldSizes } from '@elvia/elvis-toolbox';

export type ErrorType = 'invalidDate' | 'required' | 'beforeMinDate' | 'afterMaxDate';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Props that are specific to the date range picker component.
 * @internal
 */
export interface DatepickerRangeProps {
  selectedDateRange?: DateRange;
  whichRangePicker?: 'start' | 'end';
}

export interface DatepickerProps extends BaseProps, HasValue<Date | null>, HasError {
  clearButtonText?: string;
  disableDate?: (day: Date) => boolean;
  hasOptionalText?: boolean;
  hasSelectDateOnOpen?: boolean;
  size?: FormFieldSizes;
  /**
   * @deprecated Removed in version 7.0.0. Replaced by `size`.
   */
  isCompact?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isOpen?: boolean;
  isRequired?: boolean;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  onClose?: () => void;
  onOpen?: () => void;
  onReset?: () => void;
  placeholder?: string;
  resetTime?: boolean;
  valueOnChangeISOString?: (value: string | null) => void;

  /**
   * This is used for internal purposes, and should not be used by the user.
   * @internal
   */
  dateRangeProps?: DatepickerRangeProps;

  /**
   * This is used for internal purposes, and should not be used by the user.
   * @internal
   */
  onFocus?: () => void;
}
