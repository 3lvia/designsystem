export type Controls = { [key: string]: CegControlGroup | CegControl };

export interface CegControlGroup {
  title: string;
  controls: { [key: string]: CegControl };
}

export type CegControl = Checkbox | RadioGroup | Switch | Counter;

export type ControlValue = string | number | boolean;

interface CanBeDisabled {
  disabled?: () => boolean;
}

export interface Checkbox extends CanBeDisabled {
  type: 'checkbox';
  label: string;
  value?: boolean;
  children?: CegControl[];
}

export interface RadioGroup extends CanBeDisabled {
  type: 'radioGroup';
  value: string | number;
  radios: Radio[];
}

interface Radio {
  label: string;
  value: string | number;
}

export interface Switch extends CanBeDisabled {
  type: 'switch';
  label: string;
  value?: boolean;
}

export interface Counter {
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
