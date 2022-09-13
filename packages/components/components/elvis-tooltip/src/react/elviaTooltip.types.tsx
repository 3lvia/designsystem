import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type TooltipPosition = 'bottom' | 'top' | 'left' | 'right';

export interface TooltipProps {
  isDisabled?: boolean;
  position?: TooltipPosition;
  message: string;
  trigger: string | JSX.Element;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
