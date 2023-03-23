// TODO: Ensure that we only can type groups that are in the Groups type
interface ControlBase {
  type: string;
  group: string;
  disabled?: () => boolean;
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

export interface CegCustomText {
  [key: string]: {
    label: string;
    value: string;
    type?: 'input' | 'textarea';
  };
}

export type CegControl = Checkbox | RadioGroup | Switch | Counter;

export type Controls = { [key: string]: CegControl };

export interface ComponentType {
  name: string;
  controls: Controls;
  groupOrder: string[];
  customText?: CegCustomText;
}

export type ControlValue = CegControl['value'];
