interface ControlBase {
  type: string;
  group: string;
  disabledBy?: ControlNames<ComponentType>[];
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
  radios: {
    label: string;
    value: string | number;
  }[];
}

export interface Switch extends ControlBase {
  type: 'switch';
  label: string;
  value?: boolean;
}

export interface Counter extends ControlBase {
  type: 'counter';
  postfix: string;
  value: number;
  increment: number;
  min?: number;
  max?: number;
}

export interface Text extends ControlBase {
  type: 'text';
  label: string;
  value: string;
  inputType?: 'input' | 'textarea';
}

export type CegControl = Checkbox | RadioGroup | Switch | Counter | Text;

export type Controls = { [key: string]: CegControl };

export interface ComponentType {
  name: string;
  controls: Controls;
  groupOrder: string[];
}

// Ensure that this type only returns keys in the controls object.
type ControlNames<T extends { controls: Controls }> = keyof T['controls'];

export type ControlValue = CegControl['value'];
