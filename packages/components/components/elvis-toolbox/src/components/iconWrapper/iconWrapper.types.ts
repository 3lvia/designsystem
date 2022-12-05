import React, { FC } from 'react';
import { ElviaColor } from '@elvia/elvis-colors';

type IconSizes =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

export interface IconWrapperProps<TIcon extends { getIcon: (color?: ElviaColor | 'inverted') => string }>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /**
   * The icon to render from `@elvia/elvis-assets-icons`.
   */
  icon: TIcon;
  color?: ElviaColor | 'inverted';
  /**
   * Either a size from the `IconSizes` enum (e.g. `'sm'` or `'xl'`) or a custom size in pixels.
   */
  size?: IconSizes;
}

/** Can be replaced with the use of `IconType` from `@elvia/elvis-assets-icons` if we are ok with a dependency from toolbox on assets-icons */
export type IconWrapperType<
  TIcon extends { getIcon: (color?: ElviaColor | 'inverted') => string } = {
    getIcon: (color?: ElviaColor | 'inverted') => string;
  },
> = FC<IconWrapperProps<TIcon>>;
