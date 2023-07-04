import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type BadgeColor = 'red' | 'green' | 'neutral';
export interface BadgeProps extends ComponentPropsWithoutRef<'div'>, BaseProps {
  badgeColor?: BadgeColor;
  content?: JSX.Element;
  count?: number | string;
}
