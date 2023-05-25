import {
  ColorLabel,
  BackgroundLabels,
  BorderLabels,
  DataLabels,
  SignalLabels,
  TextLabels,
  ThemeName,
  DarkThemeColorName,
  LightThemeColorName,
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

interface Color<
  TLabel extends string = `Dark-${DarkThemeColorName}` | Capitalize<LightThemeColorName> | 'Transparent',
> {
  hex: string;
  label: TLabel;
}

interface TableColor<TToken extends ColorLabel> {
  token: TToken;
  role: string;
  light: Color<Capitalize<LightThemeColorName>>;
  dark: Color<`Dark-${DarkThemeColorName}` | 'Transparent'>;
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
    light: { hex: getColor('background-2', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('background-2', 'dark'), label: 'Dark-grey' },
  },
] as const satisfies TableColorArray<BackgroundLabels>;

export const backgroundColorsElement = [
  {
    token: 'background-element-1',
    role: 'Element background color option 1',
    light: { hex: getColor('background-element-1', 'light'), label: 'White' },
    dark: { hex: getColor('background-element-1', 'dark'), label: 'Transparent' },
    links: [
      { title: 'Card', path: '/components/card' },
      { title: 'Alert', path: '/components/alert' },
      { title: 'Input', path: '/components/input' },
      { title: 'Segmented control', path: '/components/segmented-control' },
    ],
  },
  {
    token: 'background-element-2',
    role: 'Element background color option 2',
    light: { hex: getColor('background-element-2', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('background-element-2', 'dark'), label: 'Dark-grey-70' },
    links: [{ title: 'Table (zebra row)', path: '/components/table' }],
  },
  {
    token: 'background-element-3',
    role: 'Element background color option 3',
    light: { hex: getColor('background-element-3', 'light'), label: 'Grey-10' },
    dark: { hex: getColor('background-element-3', 'dark'), label: 'Dark-grey-60' },
    links: [{ title: 'Tag', path: '/components/tag' }],
  },
  {
    token: 'background-element-4',
    role: 'Element background color option 4 (Large surface background - e.g. the Elvia curve',
    light: { hex: getColor('background-element-4', 'light'), label: 'Grey' },
    dark: { hex: getColor('background-element-4', 'dark'), label: 'Dark-grey' },
  },
  {
    token: 'background-element-5',
    role: 'Element background color option 5',
    light: { hex: getColor('background-element-5', 'light'), label: 'White' },
    dark: { hex: getColor('background-element-5', 'dark'), label: 'Dark-grey-70' },
    links: [{ title: 'Box', path: '/components/box' }],
  },
] as const satisfies TableColorArray<BackgroundLabels>;

export const backgroundColorsOverlay = [
  {
    token: 'background-overlay-1',
    role: 'Overlay background color',
    light: { hex: getColor('background-overlay-1', 'light'), label: 'White' },
    dark: { hex: getColor('background-overlay-1', 'dark'), label: 'Dark-grey-70' },
    links: [
      { title: 'Popover', path: '/components/popover' },
      { title: 'Modal', path: '/components/modal' },
      { title: 'Toast', path: '/components/toast' },
    ],
  },
  {
    token: 'background-overlay-2',
    role: 'Stronger overlay background color',
    light: { hex: getColor('background-overlay-2', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('background-overlay-2', 'dark'), label: 'Dark-grey-70' },
    links: [{ title: 'Tooltip', path: '/components/tooltip' }],
  },
  {
    token: 'background-overlay-3',
    role: 'Overlay background color',
    light: { hex: getColor('background-overlay-3', 'light'), label: 'Grey-10' },
    dark: { hex: getColor('background-overlay-3', 'dark'), label: 'Dark-grey-60' },
    links: [{ title: 'Header', path: '/components/header' }],
  },
] as const satisfies TableColorArray<BackgroundLabels>;

export const backgroundColorsStates = [
  {
    token: 'background-disabled-1',
    role: 'Disabled color for backgrounds',
    light: { hex: getColor('background-disabled-1', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('background-disabled-1', 'dark'), label: 'Dark-grey-60' },
    links: [
      { title: 'Radio button', path: '/components/radiobutton' },
      { title: 'Checkbox', path: '/components/checkbox' },
    ],
  },
  {
    token: 'background-disabled-2',
    role: 'Stronger disabled color for backgrounds',
    light: { hex: getColor('background-disabled-2', 'light'), label: 'Grey-30' },
    dark: { hex: getColor('background-disabled-2', 'dark'), label: 'Dark-grey-40' },
    links: [
      { title: 'Primary button', path: '/components/button' },
      { title: 'Toggle', path: '/components/toggle' },
    ],
  },
  {
    token: 'background-hover-1',
    role: 'Hover color for backgrounds',
    light: { hex: getColor('background-hover-1', 'light'), label: 'Green' },
    dark: { hex: getColor('background-hover-1', 'dark'), label: 'Dark-green' },
    links: [
      { title: 'Primary button', path: '/components/button' },
      { title: 'Radio button', path: '/components/radiobutton' },
      { title: 'Checkbox', path: '/components/checkbox' },
    ],
  },
  {
    token: 'background-hover-2',
    role: 'Hover color for backgrounds',
    light: { hex: getColor('background-hover-2', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('background-hover-2', 'dark'), label: 'Dark-grey-60' },
    links: [
      { title: 'Dropdown', path: '/components/dropdown' },
      { title: 'Time picker', path: '/components/timepicker' },
      { title: 'Date picker', path: '/components/datepicker' },
    ],
  },
  {
    token: 'background-selected-1',
    role: 'Selected color for backgrounds',
    light: { hex: getColor('background-selected-1', 'light'), label: 'Green' },
    dark: { hex: getColor('background-selected-1', 'dark'), label: 'Dark-green' },
    links: [
      { title: 'Date picker', path: '/components/datepicker' },
      { title: 'Chips', path: '/components/chips' },
      { title: 'Checkbox', path: '/components/checkbox' },
    ],
  },
  {
    token: 'background-selected-2',
    role: 'Selected color for backgrounds',
    light: { hex: getColor('background-selected-2', 'light'), label: 'Grey-10' },
    dark: { hex: getColor('background-selected-2', 'dark'), label: 'Dark-grey-50' },
    links: [
      { title: 'Dropdown', path: '/components/dropdown' },
      { title: 'Time picker', path: '/components/timepicker' },
      { title: 'Date picker', path: '/components/datepicker' },
    ],
  },
] as const satisfies TableColorArray<BackgroundLabels>;

// export const borderColors = [
//   {
//     token: 'border-1',
//     role: 'Border color',
//     light: { hex: getColor('border-1', 'light'), label: 'Grey-20' },
//     dark: { hex: getColor('border-1', 'dark'), label: 'Dark-grey-20' },
//     links: [
//       { title: 'Input', path: '/components/input' },
//       { title: 'Table (zebra row)', path: '/components/table' },
//       { title: 'Table (zebra row)', path: '/components/table' },
//       { title: 'Tag', path: '/components/tag' },
//     ],
//   },
// ] as const satisfies TableColorArray<BorderLabels>;

export const dataColors = [] as const satisfies TableColorArray<DataLabels>;

export const signalColors = [] as const satisfies TableColorArray<SignalLabels>;
