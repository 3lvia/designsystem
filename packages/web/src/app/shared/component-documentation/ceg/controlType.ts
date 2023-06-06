/** Used to allow arbitrary strings in a type union while keeping autocomplete support */
type AnyString = string & {};

interface ControlBase {
  readonly type: string;
  readonly group: string;
  readonly excludedFromDOM?: boolean;
}

export interface Checkbox<T = Record<string, any>> extends ControlBase {
  readonly type: 'checkbox';
  readonly label: string;
  value?: boolean;
  readonly childOf?: keyof T;
}

export interface RadioGroup<T = string | number> extends ControlBase {
  readonly type: 'radioGroup';
  value: T;
  readonly radios: Radio<T>[];
}

interface Radio<T> {
  readonly label: (T extends string ? Capitalize<T> : T) | AnyString;
  value: T;
}

export interface Switch extends ControlBase {
  readonly type: 'switch';
  readonly label: string;
  value?: boolean;
}

export interface SlotToggle extends ControlBase {
  readonly type: 'slotToggle';
  readonly label: string;
  value?: boolean;
}

export interface Counter extends ControlBase {
  readonly type: 'counter';
  readonly postfix?: string;
  value: number;
  readonly increment: number;
  readonly min: number;
  readonly max: number;
}

export interface Text extends ControlBase {
  readonly type: 'text';
  readonly label: string;
  value?: string;
  readonly inputType?: 'input' | 'textarea';
  readonly placeholder?: string;
}

export type CegControl<T = Record<string, any>> =
  | Checkbox<T>
  | Switch
  | SlotToggle
  | RadioGroup
  | Counter
  | Text;

export type Controls<T = Record<string, any>> = Readonly<
  Partial<{
    [K in keyof T]: NonNullable<T[K]> extends boolean
      ? Checkbox<T> | Switch
      : NonNullable<T[K]> extends string
      ? RadioGroup<T[K]> | Text
      : RadioGroup<T[K]> | Counter | Text | SlotToggle;
  }>
>;

export type StaticProps<T> = {
  readonly [K in keyof T]?: T[K];
};

export type DisabledBy<T = Record<string, any>> = Readonly<
  Partial<{
    [K in keyof T]: Array<keyof T>;
  }>
>;

export interface ComponentType<T extends Record<string, any>> {
  readonly type?: string;
  readonly controls: Controls<T>;
  readonly groupOrder: string[];
  /**
   * Events should be added to staticProps, sent in as an empty event, to be visible in the example code.
   *
   * Example:
   * ```valueOnChange: () => ''```
   */
  readonly staticProps?: Partial<StaticProps<T>>;
  readonly hiddenSlots?: (string & keyof T)[];
  readonly disabledControls?: DisabledBy<T>;
}

export type ControlValue = CegControl['value'];

export interface SlotVisibility {
  slotName: string;
  isVisible: boolean;
}
