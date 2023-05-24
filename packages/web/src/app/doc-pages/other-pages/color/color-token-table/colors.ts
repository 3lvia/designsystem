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
 * Extract the color hex (or 'transparent') from the returned value from `getThemeColor`.
 */
const getColor = (label: ColorLabel, theme: ThemeName) => {
  const color = getThemeColor(label, theme);
  if (color.includes('transparent')) {
    return 'transparent';
  }

  const hex = color.match(/#[0-9a-f]{6}/i)?.[0];
  if (!hex) {
    throw new Error(`Error in color-token-table. Cannot find color ${label} from theme ${theme}`);
  }
  return hex;
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonly<T[P]> : Readonly<T[P]>;
};

interface Link {
  title: string;
  path: string;
}

interface Color {
  hex: string;
  label: string;
}

interface TableColor<TToken extends ColorLabel> {
  token: TToken;
  role: string;
  light: Color;
  dark: Color;
  links?: ReadonlyArray<Link>;
}

export type TableColorArray<TToken extends ColorLabel = ColorLabel> = DeepReadonly<TableColor<TToken>[]>;

/** Define color arrays below here */

export const textColorsDefault = [
  {
    token: 'text-1',
    role: 'Primary text',
    light: { hex: getColor('text-1', 'light'), label: 'Black' },
    dark: { hex: getColor('text-1', 'dark'), label: 'Dark-white' },
  },
  {
    token: 'text-2',
    role: 'Muted text',
    light: { hex: getColor('text-2', 'light'), label: 'Grey-80' },
    dark: { hex: getColor('text-2', 'dark'), label: 'Dark-grey-10' },
    links: [
      { title: 'Breadcrumb', path: '/components/breadcrumb' },
      { title: 'Date picker', path: '/components/datepicker' },
    ],
  },
  {
    token: 'text-3',
    role: 'Placeholder text',
    light: { hex: getColor('text-3', 'light'), label: 'Grey-70' },
    dark: { hex: getColor('text-3', 'dark'), label: 'Dark-grey-20' },
    links: [
      { title: 'Text field', path: '/components/input' },
      { title: 'Date picker', path: '/components/datepicker' },
      { title: 'Time picker', path: '/components/timepicker' },
    ],
  },
] as const satisfies TableColorArray<TextLabels>;

export const textColorsState = [
  {
    token: 'text-disabled-1',
    role: 'Primary disabled text color',
    light: { hex: getColor('text-disabled-1', 'light'), label: 'Grey-30' },
    dark: { hex: getColor('text-disabled-1', 'dark'), label: 'Dark-grey-40' },
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
    light: { hex: getColor('text-disabled-2', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('text-disabled-2', 'dark'), label: 'Dark-grey-60' },
    links: [
      { title: 'Primary button', path: '/components/button' },
      { title: 'Danger button', path: '/components/button' },
    ],
  },
] as const satisfies TableColorArray<TextLabels>;

export const backgroundColorsDefault = [
  {
    token: 'background-1',
    role: 'Main background for the interface option 1',
    light: { hex: getColor('background-1', 'light'), label: 'White' },
    dark: { hex: getColor('background-1', 'dark'), label: 'Dark-grey' },
  },
  {
    token: 'background-2',
    role: 'Main background for the interface option 2',
    light: { hex: getColor('background-2', 'light'), label: 'Grey-5' },
    dark: { hex: getColor('background-2', 'dark'), label: 'Dark-grey' },
  },
] as const satisfies TableColorArray<BackgroundLabels>;

export const backgroundColorsElement = [
  {
    token: 'background-element-1',
    role: 'Element background color option 1',
    light: { hex: getColor('background-element-1', 'light'), label: 'White' },
    dark: { hex: getColor('background-element-1', 'dark'), label: 'Transparent' },
  },
  {
    token: 'background-element-2',
    role: 'Element background color option 2',
    light: { hex: getColor('background-element-2', 'light'), label: 'Grey-5' },
    dark: { hex: getColor('background-element-2', 'dark'), label: 'Dark-grey-70' },
  },
  // TODO: add more here
] as const satisfies TableColorArray<BackgroundLabels>;

export const borderColors = [] as const satisfies TableColorArray<BorderLabels>;

export const dataColors = [] as const satisfies TableColorArray<DataLabels>;

export const signalColors = [] as const satisfies TableColorArray<SignalLabels>;
