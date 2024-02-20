import { ComponentPropsWithoutRef } from 'react';

import { BaseProps, HasValue } from '@elvia/elvis-toolbox';

export interface DropdownItem {
  value: string;
  label: string;
}
export interface VisibleElements {
  start: number | undefined;
  end: number | undefined;
}
export interface PaginationLabel {
  displaying?: string;
  of?: string;
  label?: string;
}

export interface BasePaginationProps extends BaseProps, HasValue<VisibleElements> {
  numberOfElements?: number;
  lastNumberLimit?: number;
  alignment?: 'left' | 'right';
  dropdownItems?: DropdownItem[];
  dropdownMenuPosition?: 'top' | 'bottom' | 'auto';
  dropdownSelectedItemIndex?: number;
  dropdownSelectedItemIndexOnChange?: (value: number) => void;
  labelOptions?: PaginationLabel;
}

export interface PaginationProps extends BasePaginationProps, ComponentPropsWithoutRef<'div'> {}

export const defaultPaginationDropdownItems: DropdownItem[] = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '40', label: '40' },
];

export const defaultPaginationLabelOptions: PaginationLabel = {
  displaying: 'Viser',
  of: 'av',
  label: 'elementer',
};

export const defaultPaginationValue: VisibleElements = { start: undefined, end: undefined };
