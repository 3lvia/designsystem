import { CSSProperties } from 'react';

import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

export type ChipType = 'removable' | 'legend' | 'choice';
export type ColorType = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'violet';

export interface ChipProps {
  ariaLabel?: string;
  color?: ColorType;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `isDisabled`.
   */
  disabled?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: ChipType;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `isSelected`.
   */
  selected?: boolean;
  isSelected?: boolean;
  value: string | number;
  onDelete?: (value: ChipProps['value']) => void;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `isSelectedOnChange()`.
   */
  valueOnChange?: (event: { value: string; isSelected: boolean }) => void;
  isSelectedOnChange?: (isSelected: NonNullable<ChipProps['isSelected']>) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
