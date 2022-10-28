import { IconName } from '@elvia/elvis-icon/react';
import { BaseProps, HasValue } from '@elvia/elvis-toolbox';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';

export type DropdownValue = string | string[] | undefined;

export interface DropdownItemProps {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export interface GlobalDropdownProps {
  isCompact?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  hasSelectAllOption?: boolean;
  selectAllOption?: Partial<DropdownItemProps>;
  noOptionsMessage?: string;
  hasLoadMoreItemsButton?: boolean;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
}

export interface DropdownProps extends BaseProps, HasValue<DropdownValue>, GlobalDropdownProps {
  dropdownOverlay: JSX.Element;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `value`.
   */
  defaultValue?: never;
  isFullWidth?: boolean;
  isSearchable?: boolean;
  allOptionsSelectedLabel?: string;
  errorMessage?: string;
  label?: string;
  menuPosition?: DropdownMenuPosition;
  placeholder?: string;
  placeholderIcon?: IconName;
}
