import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { IconName } from '@elvia/elvis-icon/react';
import { CSSProperties } from 'react';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';

export type DropdownValue = DropdownItemProps | Array<DropdownItemProps> | undefined;

export interface DropdownItemProps {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export interface DropdownProps {
  dropdownOverlay: JSX.Element;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `value`.
   */
  defaultValue?: never;
  value: DropdownValue;
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
  valueOnChange?: (selectedOptions: DropdownItemProps | Array<DropdownItemProps> | undefined) => void;
  hasLoadMoreItemsButton?: boolean;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
