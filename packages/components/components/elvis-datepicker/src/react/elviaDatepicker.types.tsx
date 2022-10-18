import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type ErrorType = 'invalidDate' | 'required';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Props that are specific to the date range picker component.
 * @internal
 */
export interface DatepickerRangeProps {
  selectedDateRange?: DateRange;
  hoveredDateRange?: DateRange;
  onDateElementPointerMove?: (day: Date, event?: React.PointerEvent<HTMLButtonElement>) => void;
  onDatepickerPopoverPointerMove?: (event: React.PointerEvent<HTMLDivElement>) => void;
  whichRangePicker?: 'start' | 'end';
}

export interface DatepickerProps {
  clearButtonText?: string;
  customError?: string;
  disableDate?: (day: Date) => boolean;
  errorOnChange?: (error: string) => void;
  hasErrorPlaceholderElement?: boolean;
  hasOptionalText?: boolean;
  hasSelectDateOnOpen?: boolean;
  hasValidation?: boolean;
  isCompact?: boolean;
  isDisabled?: boolean;
  isErrorState?: boolean;
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
  showValidation?: boolean;
  showValidationState?: boolean;
  value?: Date | null;
  valueOnChange?: (value: Date | null) => void;
  valueOnChangeISOString?: (value: string | null) => void;

  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;

  /**
   * This is used for internal purposes, and should not be used by the user.
   * @internal
   */
  dateRangeProps?: DatepickerRangeProps;
}
