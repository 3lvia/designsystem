import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type SliderType = 'simple' | 'range';

type Value = {
  min: number;
  max: number;
};

export interface SliderProps {
  className?: string;
  disabled?: boolean;
  displayTooptip?: boolean;
  hasInputField?: boolean;
  inlineStyle?: CSSProperties;
  label?: string;
  max?: number;
  min?: number;
  percent?: boolean;
  step?: number;
  type?: SliderType;
  unit?: string;
  value?: number | Value;
  valueOnChange?: (value: number | Value) => void;
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

export type ToolTipState = {
  left: boolean;
  right?: boolean;
};
export type SliderErrors = {
  leftTextfield?: string;
  rightTextfield?: string;
};

export type TooltipPopupSides = 'left' | 'right';
