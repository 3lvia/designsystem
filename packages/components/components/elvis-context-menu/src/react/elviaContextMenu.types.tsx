import { BaseProps } from '@elvia/elvis-toolbox';

export type VerticalPosition = 'bottom' | 'top';
export type HorizontalPosition = 'left' | 'right';

export interface ContextMenuProps extends BaseProps {
  content?: string | JSX.Element;
  horizontalPosition?: HorizontalPosition;
  isSelectable?: boolean;
  isShowing?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  trigger?: JSX.Element;
  verticalPosition?: VerticalPosition;
}
