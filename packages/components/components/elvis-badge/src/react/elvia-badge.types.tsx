import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';
export type BadgeColor = 'red' | 'green' | 'black' | 'white';
export interface BadgeProps {
  badgeColor?: BadgeColor;
  className?: string;
  content?: JSX.Element;
  count?: number | string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
