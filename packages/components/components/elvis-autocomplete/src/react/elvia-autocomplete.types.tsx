import { FormFieldSizes, BaseProps, HasValue, HasError } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type AutocompleteItemStatus = 'error' | 'warning' | 'info';
export type AutocompleteMenuPosition = 'top' | 'bottom' | 'auto';

export interface AutocompleteItem {
  value: string | null;
  label: string;
  status?: AutocompleteItemStatus;
  tooltip?: string;
}

export interface AutocompleteProps
  extends ComponentPropsWithoutRef<'label'>,
    BaseProps,
    HasValue<string | null>,
    HasError {
  items: [];
  ariaLabel?: string;
  hasLoadMoreItemsButton?: boolean;
  hasOptionalText?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isLoadingMoreItems?: boolean;
  label?: string;
  menuPosition?: AutocompleteMenuPosition;
  noOptionsMessage?: string;
  onLoadMoreItems?: () => void;
  placeholder?: string;
  size?: FormFieldSizes;
}
