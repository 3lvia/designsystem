import { CSSProperties } from 'react';
export interface ProgressLinearProps {
  ariaLabel?: string;
  ariaRole?: ProgressLinearRole;
  ariaValueText?: string;
  className?: string;
  componentId?: string;
  inlineStyle?: CSSProperties;
  isError?: boolean;
  isIndeterminate?: boolean;
  size?: ProgressLinearSize;
  value?: number;
}

export type ProgressLinearSize = 'small' | 'medium';

export type ProgressLinearRole = 'meter' | 'progressbar';
