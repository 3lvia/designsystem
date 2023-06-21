import { HasValue } from '@elvia/elvis-toolbox';
import { BaseProps } from '@elvia/elvis-toolbox';

export interface TabsProps extends BaseProps, HasValue<number> {
  items: string[];
  isInverted?: boolean;
  hasManualActivation?: boolean;
  ariaLabel?: string;
  tabIdPrefix?: string;
}
