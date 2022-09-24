import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type SliderType = 'simple' | 'range';

export interface SliderProps {
  className?: string;
  disabled: boolean;
  hasInputField: boolean;
  inlineStyle?: CSSProperties;
  max: number;
  min: number;
  sliderType?: SliderType;
  step: number;
  webcomponent?: ElvisComponentWrapper;
}

export type Extrema = {
  minimum: number;
  maximum: number;
};
export type SliderValues = {
  left: number;
  right: number;
};

export type TextFieldsValues = {
  left?: number | string;
  right?: number | string;
};
