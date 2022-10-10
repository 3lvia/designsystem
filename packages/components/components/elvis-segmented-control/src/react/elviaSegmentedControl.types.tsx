import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';
import { IconName } from '@elvia/elvis-assets-icons';

export type Type = 'text' | 'icon';
export type Size = 'large' | 'medium' | 'small';

export interface SegmentedControl {
  name: string;
}
export interface IconSegmentedControl {
  name: IconName;
  ariaLabel: string;
}

export interface SegmentedControlProps {
  items: SegmentedControl[] | IconSegmentedControl[];
  value?: number;
  type?: Type;
  size?: Size;
  valueOnChange?: (value: number) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

// Styling
export interface SegmentedControlContainerProps {
  scType: string;
  size: string;
  selectedIndex: number;
  widthOfContainer: number;
  numberOfControls: number;
}

export interface SegmentedControlLabelProps {
  scType: string;
  size: string;
  isSelected: boolean;
}
