interface ControlBase {
  type: string;
  group: string;
  disabledBy?: string[];
}

export interface Checkbox extends ControlBase {
  type: 'checkbox';
  label: string;
  value?: boolean;
  children?: { [key: string]: Checkbox };
}

export interface RadioGroup<T = string | number> extends ControlBase {
  type: 'radioGroup';
  value: T;
  radios: Radio<T>[];
}

interface Radio<T> {
  label: string;
  value: T;
}

export interface Switch extends ControlBase {
  type: 'switch';
  label: string;
  value?: boolean;
}

export interface Counter extends ControlBase {
  type: 'counter';
  postfix?: string;
  value: number;
  increment: number;
  min?: number;
  max?: number;
}

export interface Text extends ControlBase {
  type: 'text';
  label: string;
  value?: string;
  inputType?: 'input' | 'textarea';
}

export type CegControl = Checkbox | Switch | RadioGroup | Counter | Text;

export type Controls<T = Record<string, any>> = Partial<{
  [key in keyof T]: T[key] extends boolean
    ? Checkbox | Switch
    : T[key] extends string
    ? RadioGroup<T[key]> | Text
    : RadioGroup | Counter | Text;
}>;

export interface ComponentType<T> {
  name: string;
  controls: Controls<T>;
  groupOrder: string[];
}

export type ControlValue = CegControl['value'];
