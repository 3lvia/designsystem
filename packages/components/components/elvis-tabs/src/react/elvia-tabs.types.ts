import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

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
