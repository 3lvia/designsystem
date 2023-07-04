import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type DividerType = 'simple' | 'heading' | 'curved';
export type DividerTypography = 'medium' | 'caps';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends ComponentPropsWithoutRef<'div'>, BaseProps {
  type?: DividerType;
  heading?: string | JSX.Element;
  typography?: DividerTypography;
  orientation?: DividerOrientation;
}
