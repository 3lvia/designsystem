import { BaseProps } from '@elvia/elvis-toolbox';

export interface BoxProps extends BaseProps {
  title?: string | JSX.Element;
  content: string | JSX.Element;
  isColored?: boolean;
  /**
   * @deprecated Deprecated in version 1.5.0. Box now has the same border on all backgrounds. No replacement needed.
   */
  hasBorder?: boolean;
}
