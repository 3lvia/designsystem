import { BaseProps } from '@elvia/elvis-toolbox';

export type BadgeColor = 'red' | 'green' | 'neutral';
export interface BadgeProps extends BaseProps {
  badgeColor?: BadgeColor;
  content?: JSX.Element;
  count?: number | string;
}
