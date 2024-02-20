import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type ChipType = 'removable' | 'legend' | 'choice';
export type ColorType = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'violet';

export interface BaseChipProps extends BaseProps {
  ariaLabel?: string;
  color?: ColorType;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: ChipType;
  isSelected?: boolean;
  value: string | number;
  image?: JSX.Element;
  onDelete?: (value: ChipProps['value']) => void;
  isSelectedOnChange?: (isSelected: NonNullable<ChipProps['isSelected']>) => void;
}

export interface ChipProps
  extends BaseChipProps,
    Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'color' | 'value'> {}
