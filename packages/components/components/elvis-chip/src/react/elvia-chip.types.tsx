export type ChipType = 'removable' | 'legend' | 'choice';
export type ColorType = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'violet';

export interface onChangeValue {
  value: string;
  isSelected: boolean;
}
