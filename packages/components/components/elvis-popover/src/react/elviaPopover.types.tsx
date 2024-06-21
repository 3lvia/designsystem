import { BaseProps } from '@elvia/elvis-toolbox';
import { CSSProperties, ComponentPropsWithoutRef } from 'react';

export type VerticalPosition = 'bottom' | 'top';
export type HorizontalPosition = 'left' | 'center' | 'right';

export interface BasePopoverProps extends BaseProps {
  heading?: string;
  content?: string | JSX.Element;
  horizontalPosition?: HorizontalPosition;
  verticalPosition?: VerticalPosition;
  trigger?: JSX.Element;
  hasCloseButton?: boolean;
  display?: CSSProperties['display'];
  noPadding?: boolean;
  isShowing?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface PopoverProps extends BasePopoverProps, Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
