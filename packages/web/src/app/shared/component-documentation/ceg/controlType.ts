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

export interface RadioGroup extends ControlBase {
  type: 'radioGroup';
  value: string | number;
  radios: Radio[];
}

interface Radio {
  label: string;
  value: string | number;
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

export type CegControl = Checkbox | RadioGroup | Switch | Counter | Text;

export type Controls<T> = Partial<Record<keyof T, CegControl>>;

export interface ComponentType<T> {
  name: string;
  controls: Controls<T>;
  groupOrder: string[];
}

export type ControlValue = CegControl['value'];
export type CegTypes = CegControl['type'];
