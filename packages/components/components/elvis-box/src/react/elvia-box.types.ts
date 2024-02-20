import { ComponentPropsWithoutRef } from 'react';

import { BaseProps } from '@elvia/elvis-toolbox';

export interface BaseBoxProps extends BaseProps {
  content: string | JSX.Element;
  isColored?: boolean;
  heading?: string | JSX.Element;
}

export interface BoxProps extends BaseBoxProps, Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
