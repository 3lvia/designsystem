import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type VerticalPosition = 'bottom' | 'top';
export type HorizontalPosition = 'left' | 'center' | 'right';

export interface PopoverProps extends ComponentPropsWithoutRef<'div'>, BaseProps {
  heading?: string;
  content?: string | JSX.Element;
  horizontalPosition?: HorizontalPosition;
  verticalPosition?: VerticalPosition;
  trigger?: JSX.Element;
  hasCloseButton?: boolean;
  isShowing?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
