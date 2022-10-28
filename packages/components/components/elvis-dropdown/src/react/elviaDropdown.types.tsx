import { IconName } from '@elvia/elvis-icon/react';
import { BaseProps, HasValue } from '@elvia/elvis-toolbox';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';

export type DropdownValue = DropdownItemProps | Array<DropdownItemProps> | undefined;

export interface DropdownItemProps {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export interface DropdownProps extends BaseProps, HasValue<DropdownValue> {
  dropdownOverlay: JSX.Element;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `value`.
   */
  defaultValue?: never;
  isCompact?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  isFullWidth?: boolean;
  isSearchable?: boolean;
  hasSelectAllOption?: boolean;
  selectAllOption?: Partial<DropdownItemProps>;
  allOptionsSelectedLabel?: string;
  errorMessage?: string;
  label?: string;
  menuPosition?: DropdownMenuPosition;
  noOptionsMessage?: string;
  placeholder?: string;
  placeholderIcon?: IconName;
  hasLoadMoreItemsButton?: boolean;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
}
