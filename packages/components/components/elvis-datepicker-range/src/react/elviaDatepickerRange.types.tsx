import { MinuteInterval } from '@elvia/elvis-timepicker/react';
import {
  BaseProps,
  FormFieldSizes,
  HasValue,
  ErrorOptions as SinglePickerErrorOptions,
} from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

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
export type ErrorOptions = Partial<BothDatepickers<Partial<SinglePickerErrorOptions>>>;

export const emptyDateRange: DateRange = {
  start: null,
  end: null,
};

export const defaultLabelOptions: LabelOptions = {
  start: 'Fra dato',
  end: 'Til dato',
};

export const emptyErrorMessage: CustomError = {
  start: undefined,
  end: undefined,
};

export interface BaseDatepickerRangeProps extends BaseProps, HasValue<DateRange> {
  valueOnChangeISOString?: (value: DateRangeString) => void;
  labelOptions?: LabelOptions;
  size?: FormFieldSizes;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isRequired?: IsRequired | boolean;
  isVertical?: boolean;
  hasTimepickers?: boolean;
  timepickerInterval?: MinuteInterval;
  hasSelectDateOnOpen?: boolean;
  errorOptions?: ErrorOptions;
  hasAutoOpenEndDatepicker?: boolean;
  errorOnChange?: (errors: CustomError) => void;
  minDate?: Date;
  maxDate?: Date;
  disableDates?: DisableDates;
}

export interface DatepickerRangeProps extends BaseDatepickerRangeProps, ComponentPropsWithoutRef<'div'> {}
