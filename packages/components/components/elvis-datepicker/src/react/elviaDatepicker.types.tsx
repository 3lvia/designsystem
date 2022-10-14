import React, { CSSProperties } from 'react';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

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
  value?: Date | null;
  label?: string;
  isCompact?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isRequired?: boolean;
  hasSelectDateOnOpen?: boolean;
  customError?: string;
  minDate?: Date;
  maxDate?: Date;
  valueOnChange?: (value: Date | null) => void;
  valueOnChangeISOString?: (value: string | null) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onReset?: () => void;
  webcomponent?: ElvisComponentWrapper;
  placeholder?: string;
  isOpen?: boolean;
  className?: string;
  inlineStyle?: CSSProperties;
  hasOptionalText?: boolean;
  showValidation?: boolean;
  showValidationState?: boolean;
  isErrorState?: boolean;
  errorOnChange?: (error: string) => void;
  hasValidation?: boolean;
  hasErrorPlaceholderElement?: boolean;
  clearButtonText?: string;
  disableDate?: (day: Date) => boolean;
  resetTime?: boolean;
  /**
   * This is used for internal purposes, and should not be used by the user.
   * @internal
   */
  dateRangeProps?: DatepickerRangeProps;
}
