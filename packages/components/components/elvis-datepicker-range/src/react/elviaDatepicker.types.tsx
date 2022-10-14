import { CSSProperties } from 'react';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

export type BothDatepickers<T> = {
  start: T;
  end: T;
};

export type DateRange = BothDatepickers<Date | null>;
export type DateRangeString = BothDatepickers<string | null>;
export type LabelOptions = Partial<BothDatepickers<string>>;
export type DisableDates = Partial<BothDatepickers<(day: Date) => boolean>>;
export type IsRequired = Partial<BothDatepickers<boolean>>;
export type IsErrorState = Partial<BothDatepickers<boolean>>;
export type CustomError = Partial<BothDatepickers<string>>;

export interface DatepickerRangeProps {
  value?: DateRange;
  valueOnChange?: (value: DateRange) => void;
  valueOnChangeISOString?: (value: DateRangeString) => void;
  labelOptions?: LabelOptions;
  isCompact?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isRequired?: IsRequired | boolean;
  isVertical?: boolean;
  hasSelectDateOnOpen?: boolean;
  hasAutoOpenEndDatepicker?: boolean;
  showValidationState?: boolean;
  isErrorState?: IsErrorState;
  customError?: CustomError;
  hasErrorPlaceholderElement?: boolean;
  errorOnChange?: (errors: CustomError) => void;
  minDate?: Date;
  maxDate?: Date;
  disableDates?: DisableDates;
  resetTime?: boolean;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
