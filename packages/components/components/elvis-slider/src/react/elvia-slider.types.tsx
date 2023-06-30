import { ComponentPropsWithoutRef } from 'react';
import {
  BaseProps,
  HasValue,
  ErrorOptions as SingleSliderErrorOptions,
  FormFieldSizes,
} from '@elvia/elvis-toolbox';

export type SliderProps = {
  errorOnChange?: (error: string) => void;
  hasHints?: boolean;
  hasInputField?: boolean;
  isDisabled?: boolean;
  label?: string;
  max?: number;
  min?: number;
  size?: FormFieldSizes;
  unit?: string;
} & BaseProps &
  ComponentPropsWithoutRef<'div'> &
  SliderPropsValue;

type SliderPropsValue =
  | ({
      type?: 'simple';
      errorOptions?: SimpleSliderErrorOptions;
      ariaLabel?: string;
    } & HasValue<number>)
  | ({
      type: 'range';
      errorOptions?: RangeSliderErrorOptions;
      ariaLabel?: BothSliders<string>;
    } & HasValue<BothSliders<number>>);

export type SliderType = 'simple' | 'range';
export type Side = 'left' | 'right';

export type BothSliders<T> = Record<Side, T>;

export type FormFieldInputValue = Partial<BothSliders<string>>;

export type SimpleSliderErrorOptions = Partial<SingleSliderErrorOptions>;
export type RangeSliderErrorOptions = Partial<BothSliders<Partial<SingleSliderErrorOptions>>>;

export type ErrorType = 'invalidValue' | 'NaN' | undefined;
