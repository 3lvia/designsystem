import { FormFieldSizes, BaseProps, HasValue, HasError } from '@elvia/elvis-toolbox';
import { DropdownItemStatus } from './statusToIconMap';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';

export type DropdownValueType = string | number;
export type DropdownValue = DropdownValueType | DropdownValueType[] | undefined | null;

export interface DropdownItem {
  value: DropdownValueType;
  label: string;
  icon?: string;
  isDisabled?: boolean;
  status?: DropdownItemStatus;
  tooltip?: string;
  children?: DropdownItem[];
}

export interface DropdownProps extends BaseProps, HasValue<DropdownValue>, HasError {
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
  /**
   * @deprecated Removed in version 6.0.0. Replaced by `errorOptions.text`.
   */
  errorMessage?: string;
  label?: string;
  menuPosition?: DropdownMenuPosition;
  placeholder?: string;
  placeholderIcon?: string;
  /**
   * @deprecated Removed in version 7.0.0. Replaced by `size`.
   */
  isCompact?: boolean;
  size?: FormFieldSizes;
  isDisabled?: boolean;
  isMulti?: boolean;
  hasSelectAllOption?: boolean;
  selectAllOption?: string;
  noOptionsMessage?: string;
  hasLoadMoreItemsButton?: boolean;
  onItemHover?: (hoveredItem: DropdownValueType | undefined) => void;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
  ariaLabel?: string;
}
