import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type SliderType = 'simple' | 'range';

export interface SliderProps {
  className?: string;
  hasHintValues?: boolean;
  hasInputField?: boolean;
  hasPercent?: boolean;
  hasTooltip?: boolean;
  inlineStyle?: CSSProperties;
  isCompact?: boolean;
  isDisabled?: boolean;
  label?: string | LabelTextType;
  max?: number;
  min?: number;
  title?: string;
  type?: SliderType;
  unit?: string;
  value?: number | SliderValues;
  valueOnChange?: (value: number | SliderValues) => void;
  webcomponent?: ElvisComponentWrapper;
}

export type BothSliders<T> = {
  left: T;
  right: T;
};

export type Extremum = {
  minimum: number;
  maximum: number;
};

export type SliderValues = BothSliders<number>;

export type TextFieldsValues = Partial<BothSliders<number | string>>;

export type ToolTipState = BothSliders<boolean>;

export type SliderErrors = {
  leftTextfield?: string;
  rightTextfield?: string;
};

export type LabelTextType = BothSliders<string>;

export type TooltipPopupSides = 'left' | 'right';
