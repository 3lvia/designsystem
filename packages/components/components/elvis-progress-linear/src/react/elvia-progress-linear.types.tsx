import { BaseProps, HasTransitionDuration } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface ProgressLinearProps
  extends ComponentPropsWithoutRef<'div'>,
    BaseProps,
    HasTransitionDuration {
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
