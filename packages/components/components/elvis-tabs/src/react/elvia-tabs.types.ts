import { HasValue, BaseProps } from '@elvia/elvis-toolbox';

export type ScrollPosition = 'left' | 'center' | 'right' | 'no-scroll';

export interface TabsProps extends BaseProps, HasValue<number> {
  items: string[];
  isInverted?: boolean;
  hasManualActivation?: boolean;
  ariaLabel?: string;
  tabIdPrefix?: string;
  valueOnChange?: (value: number) => void;
}
