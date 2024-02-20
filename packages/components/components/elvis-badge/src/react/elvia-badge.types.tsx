import { ComponentPropsWithoutRef } from 'react';

import { BaseProps } from '@elvia/elvis-toolbox';

export type BadgeColor = 'red' | 'green' | 'neutral';
export interface BaseBadgeProps extends BaseProps {
  badgeColor?: BadgeColor;
  content?: JSX.Element;
  count?: number | string;
}

export interface BadgeProps extends BaseBadgeProps, ComponentPropsWithoutRef<'div'> {}
