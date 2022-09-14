import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type TooltipPosition = 'bottom' | 'top' | 'left' | 'right';

export interface TooltipProps {
  isDisabled?: boolean;
  position?: TooltipPosition;
  content: string | JSX.Element;
  trigger: string | JSX.Element;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
