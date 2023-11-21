import { BaseProps, HasTransitionDuration } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface BaseProgressLinearProps extends BaseProps, HasTransitionDuration {
  ariaLabel?: string;
  ariaRole?: ProgressLinearRole;
  ariaValueText?: string;
  componentId?: string;
  isError?: boolean;
  isIndeterminate?: boolean;
  size?: ProgressLinearSize;
  value?: number;
}

export interface ProgressLinearProps extends BaseProgressLinearProps, ComponentPropsWithoutRef<'div'> {}

export type ProgressLinearSize = 'small' | 'medium' | 'large';

export type ProgressLinearRole = 'meter' | 'progressbar';
