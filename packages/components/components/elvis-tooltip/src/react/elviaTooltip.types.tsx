import { CSSProperties, RefObject } from 'react';

import { BaseProps } from '@elvia/elvis-toolbox';

export type TooltipPosition = 'bottom' | 'top' | 'left' | 'right';

export interface TooltipProps extends BaseProps {
  isDisabled?: boolean;
  showDelay?: number;
  position?: TooltipPosition;
  content: string | JSX.Element;
  trigger: string | JSX.Element;
  display?: CSSProperties['display'];
  /**
   * @internal
   */
  triggerAreaRef?: RefObject<HTMLElement>;
}
