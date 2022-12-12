import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { TypographyName } from '@elvia/elvis-typography';
import { CSSProperties } from 'react';

export type AccordionLabelPosition = 'left' | 'center' | 'right';
export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionType = 'normal' | 'overflow' | 'single';
export type AccordionSpacingContent = '8px' | '16px' | '24px';

export interface AccordionProps {
  content?: string | JSX.Element;
  isOpen?: boolean;
  isHovering?: boolean;
  isFullWidth?: boolean;
  openLabel?: string;
  closeLabel?: string;
  openDetailText?: string;
  closeDetailText?: string;
  openAriaLabel?: string;
  closeAriaLabel?: string;
  hasBoldLabel?: boolean;
  isStartAligned?: boolean;
  labelPosition?: AccordionLabelPosition;
  size?: AccordionSize;
  type?: AccordionType;
  spacingAboveContent?: AccordionSpacingContent;
  spacingBelowContent?: AccordionSpacingContent;
  overflowHeight?: number;
  typography?: TypographyName;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
