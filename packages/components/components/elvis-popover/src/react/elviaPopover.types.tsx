import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type VerticalPosition = 'bottom' | 'top';
export type HorizontalPosition = 'left' | 'center' | 'right';
export type PopoverType = 'informative' | 'list';

export interface PopoverProps {
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `heading`.
   */
  header?: string;
  heading?: string;
  content?: string | JSX.Element;
  /**
   * @deprecated Deprecated in version 7.0.0. Use the 'ContextMenu' component instead.
   */
  type?: PopoverType;
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
  horizontalPosition?: HorizontalPosition;
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `verticalPosition`.
   */
  posY?: 'top' | 'bottom';
  verticalPosition?: VerticalPosition;

  trigger?: JSX.Element;
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by 'hasCloseButton'.
   */
  hasCloseBtn?: boolean;
  hasCloseButton?: boolean;
  isShowing?: boolean;
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by 'onOpen' & 'onClose'
   */
  isShowingOnChange?: (isShowing: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  /**
   * @deprecated Deprecated in version 7.0.0. Use the 'ContextMenu' component instead.
   */
  disableAutoClose?: boolean;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
