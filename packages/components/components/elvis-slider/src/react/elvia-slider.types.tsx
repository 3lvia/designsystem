import { ComponentPropsWithoutRef } from 'react';
import {
  BaseProps,
  HasValue,
  ErrorOptions as SingleSliderErrorOptions,
  FormFieldSizes,
} from '@elvia/elvis-toolbox';

export type SliderProps = {
  ariaLabel?: string | BothSliders<string>;
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
    } & HasValue<number>)
  | ({
      type: 'range';
      errorOptions?: RangeSliderErrorOptions;
    } & HasValue<BothSliders<number>>);

export type SliderType = 'simple' | 'range';
export type Sides = 'left' | 'right';

export type BothSliders<T> = Record<Sides, T>;

export type FormFieldInputValues = Partial<BothSliders<string>>;

export type SimpleSliderErrorOptions = Partial<SingleSliderErrorOptions>;
export type RangeSliderErrorOptions = Partial<BothSliders<Partial<SingleSliderErrorOptions>>>;

export type ErrorType = 'invalidValue' | 'NaN' | undefined;
