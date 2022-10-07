import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';
import { IconName } from '@elvia/elvis-assets-icons';

export interface SegmentedControlProps {
  items: string[] | IconName[];
  value?: number;
  type?: 'text' | 'icon';
  size?: 'large' | 'medium' | 'small';
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
