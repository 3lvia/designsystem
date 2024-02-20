import { ComponentPropsWithoutRef } from 'react';

import { BaseProps, HasValue } from '@elvia/elvis-toolbox';

export type ScrollPosition = 'left' | 'center' | 'right' | 'no-scroll';

export interface BaseTabsProps extends BaseProps, HasValue<number> {
  items: string[];
  isInverted?: boolean;
  hasManualActivation?: boolean;
  ariaLabel?: string;
  tabIdPrefix?: string;
  valueOnChange?: (value: number) => void;
}

export interface TabsProps extends BaseTabsProps, ComponentPropsWithoutRef<'div'> {}
