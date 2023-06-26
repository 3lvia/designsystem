import { BaseProps } from '@elvia/elvis-toolbox';

export interface BoxProps extends BaseProps {
  /**
   * @deprecated Deprecated in version 2.0.0. Use the `heading` prop instead.
   */
  title?: string | JSX.Element;
  content: string | JSX.Element;
  isColored?: boolean;
  /**
   * @deprecated Deprecated in version 1.5.0. Box now has the same border on all backgrounds. No replacement needed.
   */
  hasBorder?: boolean;
  heading?: string | JSX.Element;
}
