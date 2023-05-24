import {
  ColorLabel,
  BackgroundLabels,
  BorderLabels,
  DataLabels,
  SignalLabels,
  TextLabels,
  ThemeName,
  getThemeColor,
} from '@elvia/elvis-colors';

/**
 * Extract the color hex from the returned value from `getThemeColor`.
 */
const getColorHex = (label: ColorLabel, theme: ThemeName) => {
  const color = getThemeColor(label, theme);
  const hex = color.match(/#[0-9a-f]{6}/i)?.[0];
  if (!hex) {
    throw new Error(`Error in color-token-table. Cannot find color ${label} from theme ${theme}`);
  }
  return hex;
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonly<T[P]> : Readonly<T[P]>;
};

type Link = {
  title: string;
  path: string;
};

type Color = {
  hex: string;
  label: string;
};

type TableColor<TToken extends ColorLabel> = {
  token: TToken;
  role: string;
  light: Color;
  dark: Color;
  links?: Link[];
};

/** A color label with disabled, hovered, or selected in it is defined as a state-color label */
type StateLabel<T extends ColorLabel> = T extends `${string}${'disabled' | 'hover' | 'selected'}${string}`
  ? T
  : never;

type DefaultLabel<T extends ColorLabel> = T extends StateLabel<T> ? never : T;

export type TableColorArray<TToken extends ColorLabel = ColorLabel> = {
  default: DeepReadonly<TableColor<DefaultLabel<TToken>>[]>;
  state: DeepReadonly<TableColor<StateLabel<TToken>>[]>;
};

/** Define color arrays below here */

export const textColors = {
  default: [
    {
      token: 'text-1',
      role: 'Primary text',
      light: { hex: getColorHex('text-1', 'light'), label: 'Black' },
      dark: { hex: getColorHex('text-1', 'dark'), label: 'Dark-white' },
    },
    {
      token: 'text-2',
      role: 'Muted text',
      light: { hex: getColorHex('text-2', 'light'), label: 'Grey-80' },
      dark: { hex: getColorHex('text-2', 'dark'), label: 'Dark-grey-10' },
      links: [
        { title: 'Breadcrumb', path: '/components/breadcrumb' },
        { title: 'Date picker', path: '/components/datepicker' },
      ],
    },
    {
      token: 'text-3',
      role: 'Placeholder text',
      light: { hex: getColorHex('text-3', 'light'), label: 'Grey-70' },
      dark: { hex: getColorHex('text-3', 'dark'), label: 'Dark-grey-20' },
      links: [
        { title: 'Text field', path: '/components/input' },
        { title: 'Date picker', path: '/components/datepicker' },
        { title: 'Time picker', path: '/components/timepicker' },
      ],
    },
  ],
  state: [
    {
      token: 'text-disabled-1',
      role: 'Primary disabled text color',
      light: { hex: getColorHex('text-disabled-1', 'light'), label: 'Grey-30' },
      dark: { hex: getColorHex('text-disabled-1', 'dark'), label: 'Dark-grey-40' },
      links: [
        { title: 'Radio button', path: '/components/radiobutton' },
        { title: 'Checkbox', path: '/components/checkbox' },
        { title: 'Chip', path: '/components/chip' },
        { title: 'Secondary button', path: '/components/button' },
      ],
    },
    {
      token: 'text-disabled-2',
      role: 'Disabled text color',
      light: { hex: getColorHex('text-disabled-2', 'light'), label: 'Grey-05' },
      dark: { hex: getColorHex('text-disabled-2', 'dark'), label: 'Dark-grey-60' },
      links: [
        { title: 'Primary button', path: '/components/button' },
        { title: 'Danger button', path: '/components/button' },
      ],
    },
  ],
} as const satisfies TableColorArray<TextLabels>;

export const backgroundColors = {
  default: [],
  state: [],
} as const satisfies TableColorArray<BackgroundLabels>;

export const borderColors = {
  default: [],
  state: [],
} as const satisfies TableColorArray<BorderLabels>;

export const dataColors = {
  default: [],
  state: [],
} as const satisfies TableColorArray<DataLabels>;

export const signalColors = {
  default: [],
  state: [],
} as const satisfies TableColorArray<SignalLabels>;
