import { BaseProps, HasValue, ErrorOptions as ErrorOptionsBase } from '@elvia/elvis-toolbox';

export interface SliderProps extends BaseProps, HasValue<number | BothSliders<number>> {
  ariaLabel?: string | BothSliders<string>;
  hasHintValues?: boolean;
  hasInputField?: boolean;
  hasPercent?: boolean;
  hasTooltip?: boolean;
  isCompact?: boolean;
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

export type BothSliders<T> = {
  left: T;
  right: T;
};

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
