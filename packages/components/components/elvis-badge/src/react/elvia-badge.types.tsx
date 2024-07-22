import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

type DataColors = 'data-1' | 'data-2' | 'data-3' | 'data-4' | 'data-5' | 'data-6';

export type BadgeColor = 'red' | 'green' | 'orange' | 'neutral' | DataColors;
export interface BaseBadgeProps extends BaseProps {
  badgeColor?: BadgeColor;
  content?: JSX.Element;
  count?: number | string;
}

export interface BadgeProps extends BaseBadgeProps, Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
