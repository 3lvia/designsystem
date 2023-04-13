interface ControlBase {
  readonly type: string;
  readonly group: string;
  disabledBy?: string[];
}

export interface Checkbox extends ControlBase {
  readonly type: 'checkbox';
  readonly label: string;
  value?: boolean;
  readonly children?: { [key: string]: Checkbox };
}

export interface RadioGroup<T = string | number> extends ControlBase {
  readonly type: 'radioGroup';
  value: T;
  readonly radios: Radio<T>[];
}

interface Radio<T> {
  readonly label: string;
  value: T;
}

export interface Switch extends ControlBase {
  readonly type: 'switch';
  readonly label: string;
  value?: boolean;
}

export interface Counter extends ControlBase {
  readonly type: 'counter';
  readonly postfix?: string;
  value: number;
  readonly increment: number;
  readonly min?: number;
  readonly max?: number;
}

export interface Text extends ControlBase {
  readonly type: 'text';
  readonly label: string;
  value?: string;
  readonly inputType?: 'input' | 'textarea';
}

export type CegControl = Checkbox | Switch | RadioGroup | Counter | Text;

export type Controls<T = Record<string, any>> = Readonly<
  Partial<{
    [key in keyof T]: T[key] extends boolean
      ? Checkbox | Switch
      : T[key] extends string
      ? RadioGroup<T[key]> | Text
      : RadioGroup | Counter | Text;
  }>
>;

export type StaticProps<T> = {
  readonly [K in keyof T]?: T[K];
};

export interface ComponentType<T> {
  readonly name?: string;
  readonly controls?: Controls<T>;
  readonly groupOrder?: string[];
  readonly staticProps?: StaticProps<T>;
}

export type ControlValue = CegControl['value'];
