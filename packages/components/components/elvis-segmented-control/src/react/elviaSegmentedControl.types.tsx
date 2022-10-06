import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';
import { IconName } from '@elvia/elvis-assets-icons';

export interface SegmentedControlProps {
  controls: string[] | IconName[];
  value: number;
  size: 'large' | 'medium' | 'small';
  type?: 'text' | 'icon';
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
  maxLengthOfLabel: number;
}

export interface SegmentedControlRadioProps {
  scType: string;
  size: string;
  isSelected: boolean;
  maxLengthOfLabel: number;
}
