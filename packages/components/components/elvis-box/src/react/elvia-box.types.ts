import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface BaseBoxProps extends BaseProps {
  content: string | JSX.Element;
  isColored?: boolean;
  heading?: string | JSX.Element;
}

export interface BoxProps extends BaseBoxProps, Omit<ComponentPropsWithoutRef<'div'>, 'content'> {}
