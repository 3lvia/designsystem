import {
  AssortedLabels,
  BackgroundLabels,
  BorderLabels,
  ColorLabel,
  DarkThemeColorName,
  DataLabels,
  IconColors as IconLabels,
  IllustrationLabels,
  LightThemeColorName,
  SignalLabels,
  TextLabels,
  ThemeName,
  getThemeColor,
} from '@elvia/elvis-colors';

/**
 * Extract the color hex (or 'transparent') from the returned value from `getThemeColor`.
 */
const getColor = (label: ColorLabel, theme: ThemeName) => {
  const isInverted = theme === 'dark';
  const color = getThemeColor(label, { isInverted: isInverted });
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

type ColorTableLabels = ColorLabel | 'icon-[signal-type]';

interface Link {
  title: string;
  path: string;
}

interface Color<
  TLabel extends string =
    | `Dark-${DarkThemeColorName}`
    | Capitalize<LightThemeColorName>
    | 'Transparent'
    | 'Dark-black/ dark-white'
    | 'Dark-signal',
> {
  hex: string;
  label: TLabel;
}

interface TableColor<TToken extends ColorTableLabels> {
  token: TToken;
  role?: string;
  warning?: string;
  light: Color<Capitalize<LightThemeColorName> | 'Black/white' | 'Signal'>;
  dark: Color<`Dark-${DarkThemeColorName}` | 'Transparent' | 'Dark-black/ dark-white' | 'Dark-signal'>;
  links?: ReadonlyArray<Link>;
  example?: string;
}

export type TableColorArray<TToken extends ColorTableLabels = ColorTableLabels> = DeepReadonly<
  TableColor<TToken>[]
>;

/** Define color arrays below here */

export const textColorsDefault = [
  {
    token: 'text-1',
    role: 'Primary text. E.g. titles, body text, special text',
    light: { hex: getColor('text-1', 'light'), label: 'Black' },
    dark: { hex: getColor('text-1', 'dark'), label: 'Dark-white' },
    links: [{ title: 'Typography', path: '/brand/typography' }],
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
    role: 'Light text on dark grey background',
    light: { hex: getColor('text-3', 'light'), label: 'White' },
    dark: { hex: getColor('text-3', 'dark'), label: 'Dark-white' },
    links: [{ title: 'Tooltip', path: '/components/tooltip' }],
  },
  {
    token: 'text-4',
    role: 'Text for dark backgrounds switching to light in dark theme',
    light: { hex: getColor('text-4', 'light'), label: 'White' },
    dark: { hex: getColor('text-4', 'dark'), label: 'Dark-black' },
    links: [
      { title: 'Button', path: '/components/button' },
      { title: 'Badge', path: '/components/badge' },
      { title: 'Segmented controls', path: '/components/segmented-control' },
    ],
  },
  {
    token: 'text-5',
    role: 'Text for light backgrounds that are not switching',
    light: { hex: getColor('text-5', 'light'), label: 'Black' },
    dark: { hex: getColor('text-5', 'dark'), label: 'Dark-black' },
    links: [
      { title: 'Button', path: '/components/button' },
      { title: 'Badge', path: '/components/badge' },
    ],
  },
] as const satisfies TableColorArray<TextLabels>;

export const textColorsState = [
  {
    token: 'text-disabled-1',
    role: 'Primary disabled text color',
    light: { hex: getColor('text-disabled-1', 'light'), label: 'Grey-30' },
    dark: { hex: getColor('text-disabled-1', 'dark'), label: 'Dark-grey-30' },
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
    dark: { hex: getColor('text-disabled-2', 'dark'), label: 'Dark-grey-50' },
    links: [
      { title: 'Primary button', path: '/components/button' },
      { title: 'Danger button', path: '/components/button' },
    ],
  },
  {
    token: 'text-placeholder-1',
    role: 'Placeholder text',
    light: { hex: getColor('text-placeholder-1', 'light'), label: 'Grey-70' },
    dark: { hex: getColor('text-placeholder-1', 'dark'), label: 'Dark-grey-20' },
    links: [
      { title: 'Text field', path: '/components/input' },
      { title: 'Date picker', path: '/components/datepicker' },
      { title: 'Time picker', path: '/components/timepicker' },
      { title: 'Slider', path: '/components/slider' },
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
    light: { hex: getColor('background-2', 'light'), label: 'Grey-02' },
    dark: { hex: getColor('background-2', 'dark'), label: 'Dark-grey' },
  },
  {
    token: 'background-3',
    role: `Large dark surface background (e.g. the Elvia curve and footer).`,
    warning: `The background class also inverts all components inside the element (in light theme) to function as desired on the dark background.`,
    light: { hex: getColor('background-3', 'light'), label: 'Grey' },
    dark: { hex: getColor('background-3', 'dark'), label: 'Dark-grey-70' },
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
    light: { hex: getColor('background-element-2', 'light'), label: 'Grey-02' },
    dark: { hex: getColor('background-element-2', 'dark'), label: 'Dark-grey-70' },
    links: [{ title: 'Table (zebra row)', path: '/components/table' }],
  },
  {
    token: 'background-element-3',
    role: 'Element background color option 3',
    light: { hex: getColor('background-element-3', 'light'), label: 'Grey-10' },
    dark: { hex: getColor('background-element-3', 'dark'), label: 'Dark-grey-50' },
    links: [{ title: 'Tag', path: '/components/tag' }],
  },
  {
    token: 'background-element-4',
    role: 'Element background color option 4',
    light: { hex: getColor('background-element-4', 'light'), label: 'White' },
    dark: { hex: getColor('background-element-4', 'dark'), label: 'Dark-grey-70' },
    links: [
      { title: 'Box', path: '/components/box' },
      { title: 'Modal', path: '/components/modal' },
    ],
  },
  {
    token: 'background-element-5',
    role: 'Element background color option 5',
    light: { hex: getColor('background-element-5', 'light'), label: 'Black' },
    dark: { hex: getColor('background-element-5', 'dark'), label: 'Dark-white' },
    links: [
      { title: 'Button', path: '/components/button' },
      { title: 'Badge', path: '/components/badge' },
    ],
  },
  {
    token: 'background-element-6',
    role: 'Element background color option 6',
    light: { hex: getColor('background-element-6', 'light'), label: 'White' },
    dark: { hex: getColor('background-element-6', 'dark'), label: 'Dark-black' },
    links: [
      { title: 'Header', path: '/components/header' },
      { title: 'Table (header)', path: '/components/table' },
    ],
  },
] as const satisfies TableColorArray<BackgroundLabels>;

export const backgroundColorsOverlay = [
  {
    token: 'background-overlay-1',
    role: 'Overlay background color',
    light: { hex: getColor('background-overlay-1', 'light'), label: 'White' },
    dark: { hex: getColor('background-overlay-1', 'dark'), label: 'Dark-grey-60' },
    links: [
      { title: 'Popover', path: '/components/popover' },
      { title: 'Toast', path: '/components/toast' },
    ],
  },
  {
    token: 'background-overlay-2',
    role: 'Stronger overlay background color',
    light: { hex: getColor('background-overlay-2', 'light'), label: 'Grey-80' },
    dark: { hex: getColor('background-overlay-2', 'dark'), label: 'Dark-grey-50' },
    links: [{ title: 'Tooltip', path: '/components/tooltip' }],
  },
  {
    token: 'background-overlay-3',
    role: 'Overlay background color',
    light: { hex: getColor('background-overlay-3', 'light'), label: 'White' },
    dark: { hex: getColor('background-overlay-3', 'dark'), label: 'Dark-black' },
    links: [{ title: 'Header (overlays)', path: '/components/header' }],
  },
] as const satisfies TableColorArray<BackgroundLabels>;

export const backgroundColorsStates = [
  {
    token: 'background-disabled-1',
    role: 'Disabled color for backgrounds',
    light: { hex: getColor('background-disabled-1', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('background-disabled-1', 'dark'), label: 'Dark-grey-50' },
    links: [
      { title: 'Radio button', path: '/components/radiobutton' },
      { title: 'Checkbox', path: '/components/checkbox' },
    ],
  },
  {
    token: 'background-disabled-2',
    role: 'Stronger disabled color for backgrounds',
    light: { hex: getColor('background-disabled-2', 'light'), label: 'Grey-30' },
    dark: { hex: getColor('background-disabled-2', 'dark'), label: 'Dark-grey-30' },
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
    dark: { hex: getColor('background-hover-2', 'dark'), label: 'Dark-grey-50' },
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
    dark: { hex: getColor('background-selected-2', 'dark'), label: 'Dark-grey-40' },
    links: [
      { title: 'Dropdown', path: '/components/dropdown' },
      { title: 'Time picker', path: '/components/timepicker' },
      { title: 'Date picker', path: '/components/datepicker' },
    ],
  },
  {
    token: 'background-readonly-1',
    role: 'Read-only color for backgrounds',
    light: { hex: getColor('background-readonly-1', 'light'), label: 'Grey-02' },
    dark: { hex: getColor('background-readonly-1', 'dark'), label: 'Dark-grey-60' },
    links: [{ title: 'Input', path: '/components/input' }],
  },
] as const satisfies TableColorArray<BackgroundLabels>;

export const borderColors = [
  {
    token: 'border-1',
    role: 'Border color option 1 - high contrast to grab attention',
    light: { hex: getColor('border-1', 'light'), label: 'Black' },
    dark: { hex: getColor('border-1', 'dark'), label: 'Dark-white' },
    links: [
      { title: 'Input', path: '/components/input' },
      { title: 'Alert', path: '/components/alert' },
      { title: 'Secondary button', path: '/components/button' },
      { title: 'Link', path: '/components/link' },
      { title: 'Slider', path: '/components/slider' },
      { title: 'Segmented control', path: '/components/segmented-control' },
      { title: 'Carousel', path: '/components/carousel' },
    ],
  },
  {
    token: 'border-2',
    role: 'Border color option 2 - low contrast to blend in',
    light: { hex: getColor('border-2', 'light'), label: 'Grey-10' },
    dark: { hex: getColor('border-2', 'dark'), label: 'Dark-grey-40' },
    links: [
      { title: 'Table', path: '/components/table' },
      { title: 'Divider', path: '/components/divider' },
    ],
  },
  {
    token: 'border-3',
    role: 'Border color option 3 - medium contrast for subtle distinction',
    light: { hex: getColor('border-3', 'light'), label: 'Grey-20' },
    dark: { hex: getColor('border-3', 'dark'), label: 'Dark-grey-40' },
    links: [
      { title: 'Divider', path: '/components/divider' },
      { title: 'Slider', path: '/components/slider' },
    ],
  },
  {
    token: 'border-4',
    role: 'Border color option 4 - extra low contrast to decorate',
    light: { hex: getColor('border-4', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('border-4', 'dark'), label: 'Dark-grey-50' },
    links: [{ title: 'Card', path: '/components/card' }],
  },
  {
    token: 'border-5',
    role: 'Border color option 5 - extra low contrast to decorate',
    light: { hex: getColor('border-5', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('border-5', 'dark'), label: 'Transparent' },
    links: [{ title: 'Box', path: '/components/box' }],
  },
  {
    token: 'border-6',
    role: 'Border color option 6',
    light: { hex: getColor('border-6', 'light'), label: 'Grey-60' },
    dark: { hex: getColor('border-6', 'dark'), label: 'Dark-grey-20' },
    links: [{ title: 'Table', path: '/components/table' }],
  },
] as const satisfies TableColorArray<BorderLabels>;

export const borderColorsStates = [
  {
    token: 'border-disabled-1',
    role: 'Disabled border color',
    light: { hex: getColor('border-disabled-1', 'light'), label: 'Grey-30' },
    dark: { hex: getColor('border-disabled-1', 'dark'), label: 'Dark-grey-30' },
    links: [
      { title: 'Input', path: '/components/input' },
      { title: 'Radio button', path: '/components/radiobutton' },
      { title: 'Checkbox', path: '/components/checkbox' },
      { title: 'Chip', path: '/components/chip' },
      { title: 'Secondary button', path: '/components/button' },
    ],
  },
  {
    token: 'border-hover-1',
    role: 'Hover border color',
    light: { hex: getColor('border-hover-1', 'light'), label: 'Green' },
    dark: { hex: getColor('border-hover-1', 'dark'), label: 'Dark-green' },
    links: [
      { title: 'Link', path: '/components/link' },
      { title: 'Card', path: '/components/card' },
    ],
  },
  {
    token: 'border-selected-1',
    role: 'Selected border color',
    light: { hex: getColor('border-selected-1', 'light'), label: 'Green' },
    dark: { hex: getColor('border-selected-1', 'dark'), label: 'Dark-green' },
    links: [
      { title: 'Drag & drop', path: '/components/drag-and-drop' },
      { title: 'Tertiary button', path: '/components/button' },
    ],
  },
  {
    token: 'border-selected-2',
    role: 'Selected border color',
    light: { hex: getColor('border-selected-2', 'light'), label: 'Black' },
    dark: { hex: getColor('border-selected-2', 'dark'), label: 'Dark-white' },
    links: [
      { title: 'Drag & drop', path: '/components/drag-and-drop' },
      { title: 'Radio filter', path: '/components/radio-filter' },
    ],
  },
] as const satisfies TableColorArray<BorderLabels>;

export const signalColors = [
  {
    token: 'signal-positive',
    role: 'Provide a positive response to users like confirmation or success',
    light: { hex: getColor('signal-positive', 'light'), label: 'Green' },
    dark: { hex: getColor('signal-positive', 'dark'), label: 'Dark-green' },
  },
  {
    token: 'signal-caution',
    role: 'Give attention to something that the users needs to know',
    light: { hex: getColor('signal-caution', 'light'), label: 'Yellow' },
    dark: { hex: getColor('signal-caution', 'dark'), label: 'Dark-yellow' },
  },
  {
    token: 'signal-warning',
    role: 'Give attention to something to avoid errors',
    light: { hex: getColor('signal-warning', 'light'), label: 'Orange' },
    dark: { hex: getColor('signal-warning', 'dark'), label: 'Dark-orange' },
  },
  {
    token: 'signal-danger',
    role: 'Something goes wrong',
    light: { hex: getColor('signal-danger', 'light'), label: 'Red' },
    dark: { hex: getColor('signal-danger', 'dark'), label: 'Dark-red' },
  },
  {
    token: 'signal-info',
    role: 'Inform users (neutral)',
    light: { hex: getColor('signal-info', 'light'), label: 'Black' },
    dark: { hex: getColor('signal-info', 'dark'), label: 'Dark-white' },
  },
] as const satisfies TableColorArray<SignalLabels>;

export const dataColors = [
  {
    token: 'data-1',
    light: { hex: getColor('data-1', 'light'), label: 'Green-apple' },
    dark: { hex: getColor('data-1', 'dark'), label: 'Dark-green-apple' },
  },
  {
    token: 'data-2',
    light: { hex: getColor('data-2', 'light'), label: 'Violet-grape' },
    dark: { hex: getColor('data-2', 'dark'), label: 'Dark-violet-grape' },
  },
  {
    token: 'data-3',
    light: { hex: getColor('data-3', 'light'), label: 'Blue-berry' },
    dark: { hex: getColor('data-3', 'dark'), label: 'Dark-blue-berry' },
  },
  {
    token: 'data-4',
    light: { hex: getColor('data-4', 'light'), label: 'Purple-plum' },
    dark: { hex: getColor('data-4', 'dark'), label: 'Dark-purple-plum' },
  },
  {
    token: 'data-5',
    light: { hex: getColor('data-5', 'light'), label: 'Orange-mango' },
    dark: { hex: getColor('data-5', 'dark'), label: 'Dark-orange-mango' },
  },
  {
    token: 'data-6',
    light: { hex: getColor('data-6', 'light'), label: 'Red-tomato' },
    dark: { hex: getColor('data-6', 'dark'), label: 'Dark-red-tomato' },
  },
] as const satisfies TableColorArray<DataLabels>;

export const dataColors50 = [
  {
    token: 'data-1-50',
    light: { hex: getColor('data-1-50', 'light'), label: 'Green-apple-50' },
    dark: { hex: getColor('data-1-50', 'dark'), label: 'Dark-green-apple-50' },
  },
  {
    token: 'data-2-50',
    light: { hex: getColor('data-2-50', 'light'), label: 'Violet-grape-50' },
    dark: { hex: getColor('data-2-50', 'dark'), label: 'Dark-violet-grape-50' },
  },
  {
    token: 'data-3-50',
    light: { hex: getColor('data-3-50', 'light'), label: 'Blue-berry-50' },
    dark: { hex: getColor('data-3-50', 'dark'), label: 'Dark-blue-berry-50' },
  },
  {
    token: 'data-4-50',
    light: { hex: getColor('data-4-50', 'light'), label: 'Purple-plum-50' },
    dark: { hex: getColor('data-4-50', 'dark'), label: 'Dark-purple-plum-50' },
  },
  {
    token: 'data-5-50',
    light: { hex: getColor('data-5-50', 'light'), label: 'Orange-mango-50' },
    dark: { hex: getColor('data-5-50', 'dark'), label: 'Dark-orange-mango-50' },
  },
  {
    token: 'data-6-50',
    light: { hex: getColor('data-6-50', 'light'), label: 'Red-tomato-50' },
    dark: { hex: getColor('data-6-50', 'dark'), label: 'Dark-red-tomato-50' },
  },
] as const satisfies TableColorArray<DataLabels>;

export const dataColors30 = [
  {
    token: 'data-1-30',
    light: { hex: getColor('data-1-30', 'light'), label: 'Green-apple-30' },
    dark: { hex: getColor('data-1-30', 'dark'), label: 'Dark-green-apple-30' },
  },
  {
    token: 'data-2-30',
    light: { hex: getColor('data-2-30', 'light'), label: 'Violet-grape-30' },
    dark: { hex: getColor('data-2-30', 'dark'), label: 'Dark-violet-grape-30' },
  },
  {
    token: 'data-3-30',
    light: { hex: getColor('data-3-30', 'light'), label: 'Blue-berry-30' },
    dark: { hex: getColor('data-3-30', 'dark'), label: 'Dark-blue-berry-30' },
  },
  {
    token: 'data-4-30',
    light: { hex: getColor('data-4-30', 'light'), label: 'Purple-plum-30' },
    dark: { hex: getColor('data-4-30', 'dark'), label: 'Dark-purple-plum-30' },
  },
  {
    token: 'data-5-30',
    light: { hex: getColor('data-5-30', 'light'), label: 'Orange-mango-30' },
    dark: { hex: getColor('data-5-30', 'dark'), label: 'Dark-orange-mango-30' },
  },
  {
    token: 'data-6-30',
    light: { hex: getColor('data-6-30', 'light'), label: 'Red-tomato-30' },
    dark: { hex: getColor('data-6-30', 'dark'), label: 'Dark-red-tomato-30' },
  },
] as const satisfies TableColorArray<DataLabels>;

export const dataColors10 = [
  {
    token: 'data-1-10',
    light: { hex: getColor('data-1-10', 'light'), label: 'Green-apple-10' },
    dark: { hex: getColor('data-1-10', 'dark'), label: 'Dark-green-apple-10' },
  },
  {
    token: 'data-2-10',
    light: { hex: getColor('data-2-10', 'light'), label: 'Violet-grape-10' },
    dark: { hex: getColor('data-2-10', 'dark'), label: 'Dark-violet-grape-10' },
  },
  {
    token: 'data-3-10',
    light: { hex: getColor('data-3-10', 'light'), label: 'Blue-berry-10' },
    dark: { hex: getColor('data-3-10', 'dark'), label: 'Dark-blue-berry-10' },
  },
  {
    token: 'data-4-10',
    light: { hex: getColor('data-4-10', 'light'), label: 'Purple-plum-10' },
    dark: { hex: getColor('data-4-10', 'dark'), label: 'Dark-purple-plum-10' },
  },
  {
    token: 'data-5-10',
    light: { hex: getColor('data-5-10', 'light'), label: 'Orange-mango-10' },
    dark: { hex: getColor('data-5-10', 'dark'), label: 'Dark-orange-mango-10' },
  },
  {
    token: 'data-6-10',
    light: { hex: getColor('data-6-10', 'light'), label: 'Red-tomato-10' },
    dark: { hex: getColor('data-6-10', 'dark'), label: 'Dark-red-tomato-10' },
  },
] as const satisfies TableColorArray<DataLabels>;

export const iconColors = [
  {
    token: 'icon-stroke-1',
    example: '<e-icon name="checkCircle" size="sm"></e-icon>',
    role: 'Stroke icons',
    light: { hex: getColor('icon-stroke-1', 'light'), label: 'Black' },
    dark: { hex: getColor('icon-stroke-1', 'dark'), label: 'Dark-white' },
  },
  {
    token: 'icon-filled-background-1',
    example: '<e-icon name="checkCircleFilled" size="sm"></e-icon>',
    role: 'Background color for filled icons',
    light: { hex: getColor('icon-filled-background-1', 'light'), label: 'Black' },
    dark: { hex: getColor('icon-filled-background-1', 'dark'), label: 'Dark-white' },
  },
  {
    token: 'icon-filled-foreground-1',
    example:
      '<e-icon name="checkCircleFilledColor" size="sm"></e-icon><e-icon name="checkCircleFilled" size="sm"></e-icon>',
    role: 'Automatically selects the best foreground color that contrasts best with the background (either black or white)',
    light: { hex: 'black/white', label: 'Black/white' },
    dark: { hex: 'dark-black/dark-white', label: 'Dark-black/ dark-white' },
  },
  {
    token: 'icon-[signal-type]',
    example:
      '<e-icon name="checkCircle" size="sm" class="e-icon--color-positive"></e-icon><e-icon name="checkCircleFilledColor" size="sm"></e-icon>',
    role: 'Icons can use all the different signal colors. E.g. e-color-icon-positive',
    light: { hex: 'signal', label: 'Signal' },
    dark: { hex: 'dark-signal', label: 'Dark-signal' },
  },
] as const satisfies TableColorArray<IconLabels | 'icon-[signal-type]'>;

export const assortedColors = [
  {
    token: 'static-black',
    role: 'Stays black in both themes',
    light: { hex: getColor('static-black', 'light'), label: 'Black' },
    dark: { hex: getColor('static-black', 'dark'), label: 'Dark-black' },
  },
  {
    token: 'static-white',
    role: 'Stays white in both themes',
    light: { hex: getColor('static-white', 'light'), label: 'White' },
    dark: { hex: getColor('static-white', 'dark'), label: 'Dark-white' },
  },
  {
    token: 'brand-accent',
    role: 'Brand color that can be used for accents like bullet points in lists',
    light: { hex: getColor('brand-accent', 'light'), label: 'Green' },
    dark: { hex: getColor('brand-accent', 'dark'), label: 'Dark-green' },
  },
  {
    token: 'focus-outline',
    role: 'Color only used for focus outline. Should not be used elsewhere.',
    light: { hex: getColor('focus-outline', 'light'), label: 'Focus-outline' },
    dark: { hex: getColor('focus-outline', 'dark'), label: 'Dark-focus-outline' },
  },
] as const satisfies TableColorArray<AssortedLabels>;

export const illustrationColors = [
  {
    token: 'illustration-main-1',
    role: 'Illustrations color option',
    light: { hex: getColor('illustration-main-1', 'light'), label: 'Grey' },
    dark: { hex: getColor('illustration-main-1', 'dark'), label: 'Dark-grey' },
  },
  {
    token: 'illustration-main-2',
    role: 'Illustrations color option',
    light: { hex: getColor('illustration-main-2', 'light'), label: 'White' },
    dark: { hex: getColor('illustration-main-2', 'dark'), label: 'Dark-white' },
  },
  {
    token: 'illustration-main-3',
    role: `Illustrations color option`,
    light: { hex: getColor('illustration-main-3', 'light'), label: 'Grey' },
    dark: { hex: getColor('illustration-main-3', 'dark'), label: 'Dark-white' },
  },
  {
    token: 'illustration-main-4',
    role: `Illustrations color option`,
    light: { hex: getColor('illustration-main-4', 'light'), label: 'Grey' },
    dark: { hex: getColor('illustration-main-4', 'dark'), label: 'Dark-white' },
  },
  {
    token: 'illustration-main-5',
    role: `Illustrations color for details`,
    light: { hex: getColor('illustration-main-5', 'light'), label: 'Green' },
    dark: { hex: getColor('illustration-main-5', 'dark'), label: 'Dark-green' },
  },
] as const satisfies TableColorArray<IllustrationLabels>;

export const illustrationColorsShade = [
  {
    token: 'illustration-shade-1',
    role: 'Illustration shade option',
    light: { hex: getColor('illustration-shade-1', 'light'), label: 'Grey-05' },
    dark: { hex: getColor('illustration-shade-1', 'dark'), label: 'Dark-grey-05' },
  },
  {
    token: 'illustration-shade-2',
    role: 'Illustration shade option',
    light: { hex: getColor('illustration-shade-2', 'light'), label: 'Grey-10' },
    dark: { hex: getColor('illustration-shade-2', 'dark'), label: 'Dark-grey-10' },
  },
  {
    token: 'illustration-shade-3',
    role: `Illustration shade option`,
    light: { hex: getColor('illustration-shade-3', 'light'), label: 'Grey-20' },
    dark: { hex: getColor('illustration-shade-3', 'dark'), label: 'Dark-grey-30' },
  },
  {
    token: 'illustration-shade-4',
    role: `Illustration shade option`,
    light: { hex: getColor('illustration-shade-4', 'light'), label: 'Grey-30' },
    dark: { hex: getColor('illustration-shade-4', 'dark'), label: 'Dark-grey-40' },
  },
] as const satisfies TableColorArray<IllustrationLabels>;

export const illustrationColorsBackground = [
  {
    token: 'illustration-background-1',
    role: 'Illustration background option (primary)',
    light: { hex: getColor('illustration-background-1', 'light'), label: 'Grey-10' },
    dark: { hex: getColor('illustration-background-1', 'dark'), label: 'Dark-grey-10' },
  },
  {
    token: 'illustration-background-2',
    role: 'Illustration background option (secondary)',
    light: { hex: getColor('illustration-background-2', 'light'), label: 'Green-apple-30' },
    dark: { hex: getColor('illustration-background-2', 'dark'), label: 'Dark-green-apple-30' },
  },
  {
    token: 'illustration-background-3',
    role: `Illustration background option (tertiary)`,
    light: { hex: getColor('illustration-background-3', 'light'), label: 'Blue-berry-30' },
    dark: { hex: getColor('illustration-background-3', 'dark'), label: 'Dark-blue-berry-30' },
  },
  {
    token: 'illustration-background-4',
    role: `Illustration background option (tertiary)`,
    light: { hex: getColor('illustration-background-4', 'light'), label: 'Purple-plum-30' },
    dark: { hex: getColor('illustration-background-4', 'dark'), label: 'Dark-purple-plum-30' },
  },
  {
    token: 'illustration-background-5',
    role: `Illustration background option (tertiary)`,
    light: { hex: getColor('illustration-background-5', 'light'), label: 'Red-tomato-30' },
    dark: { hex: getColor('illustration-background-5', 'dark'), label: 'Dark-red-tomato-30' },
  },
  {
    token: 'illustration-background-6',
    role: `Illustration background option (tertiary)`,
    light: { hex: getColor('illustration-background-6', 'light'), label: 'Orange-mango-30' },
    dark: { hex: getColor('illustration-background-6', 'dark'), label: 'Dark-orange-mango-30' },
  },
] as const satisfies TableColorArray<IllustrationLabels>;
