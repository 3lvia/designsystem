import {
  BaseProps,
  HasValue,
  ErrorOptions as SingleSliderErrorOptions,
  FormFieldSizes,
} from '@elvia/elvis-toolbox';

export interface SliderProps extends BaseProps, HasValue<number | BothSliders<number>> {
  ariaLabel?: string | BothSliders<string>;
  errorOnChange?: (error: string) => void;
  errorOptions?: ErrorOptions;
  hasHints?: boolean;
  hasInputField?: boolean;
  heading?: string;
  isDisabled?: boolean;
  max?: number;
  min?: number;
  size?: FormFieldSizes;
  unit?: string;
  type?: SliderType;
}

export type SliderType = 'simple' | 'range';
export type Sides = 'left' | 'right';

export type BothSliders<T> = Record<Sides, T>;

export type FormFieldInputValues = Partial<BothSliders<string>>;

export type SimpleSliderErrorOptions = Partial<SingleSliderErrorOptions>;
export type RangeSliderErrorOptions = Partial<BothSliders<Partial<SingleSliderErrorOptions>>>;

export type ErrorOptions = SimpleSliderErrorOptions | RangeSliderErrorOptions | undefined;

export type ErrorType = 'invalidValue' | 'NaN' | undefined;
