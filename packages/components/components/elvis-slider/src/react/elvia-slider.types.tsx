import { BaseProps, HasValue, ErrorOptions as ErrorOptionsBase, FormFieldSizes } from '@elvia/elvis-toolbox';

export interface SliderProps extends BaseProps, HasValue<number | SliderValues> {
  ariaLabel?: string | BothSliders<string>;
  hasHintValues?: boolean;
  hasInputField?: boolean;
  size?: FormFieldSizes;
  isDisabled?: boolean;
  label?: string | BothSliders<string>;
  max?: number;
  min?: number;
  heading?: string;
  type?: SliderType;
  unit?: string;
  errorOptions?: ErrorOptions;
}

export type SliderType = 'simple' | 'range';
export type Sides = 'left' | 'right';

export type BothSliders<T> = Record<Sides, T>;

export type SliderValues = BothSliders<number>;
export type FormFieldInputValues = Partial<BothSliders<string>>;

interface SimpleSliderErrorOptions extends Partial<ErrorOptionsBase> {
  type?: 'simple';
}

interface RangeSliderErrorOptions extends BothSliders<Partial<ErrorOptionsBase>> {
  type?: 'range';
}

export type ErrorOptions = SimpleSliderErrorOptions | RangeSliderErrorOptions;

export type ErrorOptionKeys = keyof ErrorOptionsBase;
