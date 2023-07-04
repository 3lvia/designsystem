import { HasValue, BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type ScrollPosition = 'left' | 'center' | 'right' | 'no-scroll';

export interface TabsProps extends ComponentPropsWithoutRef<'div'>, BaseProps, HasValue<number> {
  items: string[];
  isInverted?: boolean;
  hasManualActivation?: boolean;
  ariaLabel?: string;
  tabIdPrefix?: string;
  valueOnChange?: (value: number) => void;
}
