import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type Type = 'text' | 'icon';
export type Size = 'large' | 'medium' | 'small';

export interface TextSegmentedControl {
  label: string;
}
export interface IconSegmentedControl {
  icon: string;
  iconSelected: string;
  ariaLabel: string;
}

export interface SegmentedControlProps extends ComponentPropsWithoutRef<'div'>, BaseProps, HasValue<number> {
  items: TextSegmentedControl[] | IconSegmentedControl[];
  type?: Type;
  size?: Size;
}

// Styling
export interface SegmentedControlContainerProps {
  scType: Type;
  size: Size;
  selectedIndex: number;
  numberOfControls: number;
}

export interface SegmentedControlLabelProps {
  scType: Type;
  size: string;
  isSelected: boolean;
}
