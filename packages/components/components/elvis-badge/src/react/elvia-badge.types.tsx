import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

type DataColors =
  | 'green-apple'
  | 'blue-berry'
  | 'purple-plum'
  | 'orange-mango'
  | 'red-tomato'
  | 'violet-grape';

export type BadgeColor = 'red' | 'green' | 'orange' | 'neutral' | DataColors;
export interface BaseBadgeProps extends BaseProps {
  badgeColor?: BadgeColor;
  content?: JSX.Element;
  count?: number | string;
}

export interface BadgeProps extends BaseBadgeProps, Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
