import { BaseProps } from '@elvia/elvis-toolbox';

export interface BoxProps extends BaseProps {
  title?: string | JSX.Element;
  content: string | JSX.Element;
  isColored?: boolean;
  hasBorder?: boolean;
}
