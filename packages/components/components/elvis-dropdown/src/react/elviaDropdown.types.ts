import { IconName } from '@elvia/elvis-icon/react';
import { BaseProps, HasValue } from '@elvia/elvis-toolbox';
import { DropdownItemStatus } from './statusToIconMap';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';

export type ValueType = string | number;
export type DropdownValue = ValueType | ValueType[] | undefined | null;

export interface DropdownItem {
  value: ValueType;
  label: string;
  icon?: IconName;
  isDisabled?: boolean;
  status?: DropdownItemStatus;
  tooltip?: string;
  children?: DropdownItem[];
}

export interface DropdownProps extends BaseProps, HasValue<DropdownValue> {
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `items`.
   */
  options?: never;
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
  selectAllOption?: string;
  noOptionsMessage?: string;
  hasLoadMoreItemsButton?: boolean;
  onItemHover?: (hoveredItem: ValueType | undefined) => void;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
}
