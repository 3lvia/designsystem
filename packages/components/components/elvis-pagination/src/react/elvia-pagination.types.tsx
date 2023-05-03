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

export interface DeprecatedPaginationProps {
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `alignment`.
   */
  isRightAligned?: boolean;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `dropdownMenuPosition`.
   */
  dropdownMenuPos?: string;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `dropdownSelectedItemIndex`.
   */
  selectedDropdownItemIndex?: number;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `dropdownSelectedItemIndexOnChange`.
   */
  selectedDropdownItemIndexOnChange?: (value: number) => void;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `labelOptions.displaying`.
   */
  labelDisplaying?: string;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `labelOptions.label`.
   */
  label?: string;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `labelOptions.of`.
   */
  labelOf?: string;
}

export interface PaginationProps extends BaseProps, HasValue<VisibleElements>, DeprecatedPaginationProps {
  numberOfElements?: number;
  lastNumberLimit?: number;
  alignment?: 'left' | 'right';
  dropdownItems?: DropdownItem[];
  dropdownMenuPosition?: 'top' | 'bottom' | 'auto';
  dropdownSelectedItemIndex?: number;
  dropdownSelectedItemIndexOnChange?: (value: number) => void;
  labelOptions?: PaginationLabel;
}

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
