import React, { FC } from 'react';
import { ColorLabel } from '@elvia/elvis-colors';

// eslint-disable-next-line @typescript-eslint/ban-types
type AnyString = string & {};
type ColorLabelOrString = ColorLabel | AnyString;
type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | AnyString;

export interface IconWrapperProps<TIcon extends { getIcon: (color?: ColorLabelOrString) => string }>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /**
   * The icon to render from `@elvia/elvis-assets-icons`.
   */
  icon: TIcon;
  color?: ColorLabelOrString;
  /**
   * Either a size from the `IconSizes` enum (e.g. `'sm'` or `'xl'`) or a custom size.
   */
  size?: IconSizes;
}

/** Can be simplified with the use of `IconType` from `@elvia/elvis-assets-icons` if we are ok with a dependency from toolbox on assets-icons */
export type IconWrapperType<
  TIcon extends { getIcon: (color?: ColorLabelOrString) => string } = {
    getIcon: (color?: ColorLabelOrString) => string;
  },
> = FC<IconWrapperProps<TIcon>>;
