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
  tooltip?: string;
}

export interface BaseSegmentedControlProps extends BaseProps, HasValue<number> {
  items: TextSegmentedControl[] | IconSegmentedControl[];
  type?: Type;
  size?: Size;
}

export interface SegmentedControlProps extends BaseSegmentedControlProps, ComponentPropsWithoutRef<'div'> {}

// Styling
export interface SegmentedControlContainerProps {
  $type: Type;
  selectedLeft: string;
  selectedWidth: string;
  hasAnimation: boolean;
}

export interface SegmentedControlLabelProps {
  $type: Type;
  size: string;
  isSelected: boolean;
  hasAnimation: boolean;
}
