import { type BaseProps } from '@elvia/elvis-toolbox';
import { type CSSProperties, type ComponentPropsWithoutRef } from 'react';

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
  display?: CSSProperties['display'];
}

export interface ContextMenuProps
  extends BaseContextMenuProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
