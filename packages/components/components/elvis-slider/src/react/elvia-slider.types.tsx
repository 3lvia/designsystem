import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type SliderType = 'simple' | 'range';

export interface SliderProps {
  className?: string;
  hasInputField?: boolean;
  hasPercent?: boolean;
  hasTooltip?: boolean;
  hasHelpValues?: boolean;
  inlineStyle?: CSSProperties;
  isDisabled?: boolean;
  label?: string | LabelTextType;
  max?: number;
  min?: number;
  type?: SliderType;
  unit?: string;
  value?: number | SliderValues;
  valueOnChange?: (value: number | SliderValues) => void;
  webcomponent?: ElvisComponentWrapper;
}

export type Extremum = {
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

export type LabelTextType = {
  left: string;
  right: string;
};

export type TooltipPopupSides = 'left' | 'right';
