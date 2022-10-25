import { BaseProps, HasError } from '@elvia/elvis-toolbox';

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

export interface DatepickerProps extends BaseProps, HasError {
  clearButtonText?: string;
  disableDate?: (day: Date) => boolean;
  errorOnChange?: (error: string) => void;
  hasOptionalText?: boolean;
  hasSelectDateOnOpen?: boolean;
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
  value?: Date | null;
  valueOnChange?: (value: Date | null) => void;
  valueOnChangeISOString?: (value: string | null) => void;

  /**
   * This is used for internal purposes, and should not be used by the user.
   * @internal
   */
  dateRangeProps?: DatepickerRangeProps;
}
