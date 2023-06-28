import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type VerticalPosition = 'bottom' | 'top';
export type HorizontalPosition = 'left' | 'center' | 'right';

interface DeprecatedPopoverProps {
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `heading`.
   */
  header?: string;
  /**
   * @deprecated Deprecated in version 7.0.0. Use the 'ContextMenu' component instead.
   */
  type?: 'informative' | 'list';
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `isSelectable`.
   */
  selectable?: boolean;
  /**
   * @deprecated Deprecated in version 7.0.0. Use the 'ContextMenu' component instead.
   */
  isSelectable?: boolean;
  /**
   * @deprecated Deprecated in version 7.0.0. Use the 'ContextMenu' component instead.
   */
  hasDivider?: boolean;
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `horizontalPosition`.
   */
  posX?: 'left' | 'right' | 'center';
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `verticalPosition`.
   */
  posY?: 'top' | 'bottom';
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by 'hasCloseButton'.
   */
  hasCloseBtn?: boolean;
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by 'onOpen' & 'onClose'
   */
  isShowingOnChange?: (isShowing: boolean) => void;
  /**
   * @deprecated Deprecated in version 7.0.0. Use the 'ContextMenu' component instead.
   */
  disableAutoClose?: boolean;
}

export interface PopoverProps extends ComponentPropsWithoutRef<'div'>, BaseProps, DeprecatedPopoverProps {
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
