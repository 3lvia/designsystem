import { BaseProps } from '@elvia/elvis-toolbox';
import { TypographyName } from '@elvia/elvis-typography';
import { ComponentPropsWithoutRef } from 'react';

export type AccordionLabelPosition = 'left' | 'center' | 'right';
export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionType = 'normal' | 'overflow' | 'single';
export type AccordionSpacingContent = '8px' | '16px' | '24px';

export interface BaseAccordionProps extends BaseProps {
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
}

export interface AccordionProps
  extends BaseAccordionProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
