import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type VerticalPosition = 'bottom' | 'top';
export type HorizontalPosition = 'left' | 'right';

export interface BaseContextMenuProps extends BaseProps {
  content?: string | JSX.Element;
  horizontalPosition?: HorizontalPosition;
  isSelectable?: boolean;
  isShowing?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  trigger?: JSX.Element;
  verticalPosition?: VerticalPosition;
}

export interface ContextMenuProps extends BaseContextMenuProps, ComponentPropsWithoutRef<'div'> {}
