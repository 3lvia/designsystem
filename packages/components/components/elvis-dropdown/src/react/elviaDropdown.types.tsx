import { IconName } from '@elvia/elvis-icon/react';
import { BaseProps, HasValue } from '@elvia/elvis-toolbox';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';

export type DropdownValue = string | string[] | undefined;

export interface DropdownItem {
  value: string;
  label: string;
  icon?: string;
  isDisabled?: boolean;
  status?: string;
  tooltip?: string;
  children?: DropdownItem[];
}

export interface DropdownProps extends BaseProps, HasValue<DropdownValue> {
  items: DropdownItem[];
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

  isCompact?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  hasSelectAllOption?: boolean;
  selectAllOption?: Partial<DropdownItem>;
  noOptionsMessage?: string;
  hasLoadMoreItemsButton?: boolean;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
}
