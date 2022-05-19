export type DropdownOption = {
  value: string;
  label: string;
};

export type SelectionNumber = {
  start: number;
  end: number;
};

export interface PaginationLabel {
  displaying?: string;
  of?: string;
  label?: string;
}
