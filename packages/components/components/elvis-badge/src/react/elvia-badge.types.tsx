import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type BadgeColor = 'red' | 'green' | 'neutral';
export interface BaseBadgeProps extends BaseProps {
  badgeColor?: BadgeColor;
  content?: JSX.Element;
  count?: number | string;
}

export interface BadgeProps extends BaseBadgeProps, ComponentPropsWithoutRef<'div'> {}
