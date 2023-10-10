import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface BaseBoxProps extends BaseProps {
  /**
   * @deprecated Deprecated in version 2.0.0. Use the `heading` prop instead.
   */
  title?: string;
  content: string | JSX.Element;
  isColored?: boolean;
  /**
   * @deprecated Deprecated in version 1.5.0. Box now has the same border on all backgrounds. No replacement needed.
   */
  hasBorder?: boolean;
  heading?: string | JSX.Element;
}

export interface BoxProps extends BaseBoxProps, ComponentPropsWithoutRef<'div'> {}
