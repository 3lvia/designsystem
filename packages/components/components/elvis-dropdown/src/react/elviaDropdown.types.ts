import { FormFieldSizes, BaseProps, HasValue, HasError } from '@elvia/elvis-toolbox';
import { DropdownItem, DropdownValue, DropdownValueType } from './publicApi.public';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';

export type ErrorType = 'required';

export interface DropdownProps extends BaseProps, HasValue<DropdownValue>, HasError {
  items: DropdownItem[];
  isFullWidth?: boolean;
  isRequired?: boolean;
  isSearchable?: boolean;
  allOptionsSelectedLabel?: string;
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
