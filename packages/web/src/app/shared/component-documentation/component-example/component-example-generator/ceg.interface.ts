export interface CegFormGroup {
  label: string;
  type: string;
  defaultValue?: string | number;
  propValue?: string;
  propName?: string;
  propSlot?: string;
  formGroupOptions?: CegFormGroupOption[];
  counterMax?: number;
  counterMin?: number;
  counterStepValue?: number;
  counterType?: string;
  dependency?: CegFormDependency[];
}
export interface CegFormGroupOption {
  name: string;
  defaultValue: string;
  propValue?: string;
  propName?: string;
  dependency?: CegFormDependency[];
}
export interface CegFormDependency {
  name: string;
  value: string | string[];
}

export interface FormState {
  [key: string]: string;
}
