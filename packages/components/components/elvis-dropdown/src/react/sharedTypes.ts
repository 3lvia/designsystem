// These types will be exported for both React and Web components, and must therefore not import from ANY files that use React-specific types
export type DropdownItemStatus = 'error' | 'warning' | 'info' | 'informative';
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
