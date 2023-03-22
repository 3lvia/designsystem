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
  children?: CegControl[];
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
  postfix: string;
  value: number;
  increment: number;
  min?: number;
  max?: number;
}

export interface CegCustomText {
  label: string;
  value: string;
}

export interface ControlConfiguration {
  name: string;
  controls: Controls;
  groupOrder: string[];
}

export type Controls = { [key: string]: CegControl };

export type CegControl = Checkbox | RadioGroup | Switch | Counter;

export type ControlValue = string | number | boolean;
