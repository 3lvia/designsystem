import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { ErrorOptions as SinglePickerErrorOptions } from '@elvia/elvis-toolbox';
import { CSSProperties } from 'react';

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
export type ErrorOptions = Partial<BothDatepickers<SinglePickerErrorOptions>>;

export const emptyDateRange: DateRange = {
  start: null,
  end: null,
};

export const defaultLabelOptions: LabelOptions = {
  start: 'Fra dato',
  end: 'Til dato',
};

export const emptyErrorMessage: CustomError = {
  start: '',
  end: '',
};

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
  errorOptions?: ErrorOptions;
  hasAutoOpenEndDatepicker?: boolean;
  errorOnChange?: (errors: CustomError) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  inlineStyle?: CSSProperties;
  disableDates?: DisableDates;
  webcomponent?: ElvisComponentWrapper;
}
