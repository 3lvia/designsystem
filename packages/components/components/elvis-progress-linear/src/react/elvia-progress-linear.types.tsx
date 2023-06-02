import { BaseProps, HasTransitionDuration } from '@elvia/elvis-toolbox';

export interface ProgressLinearProps extends BaseProps, HasTransitionDuration {
  ariaLabel?: string;
  ariaRole?: ProgressLinearRole;
  ariaValueText?: string;
  componentId?: string;
  isError?: boolean;
  isIndeterminate?: boolean;
  size?: ProgressLinearSize;
  value?: number;
}

export type ProgressLinearSize = 'small' | 'medium';

export type ProgressLinearRole = 'meter' | 'progressbar';
