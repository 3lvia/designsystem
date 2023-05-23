export interface BaseColor {
  color: string;
  contrastText?: string;
}

/**
 * Base colors are the colors that are used to create the theme colors, and are not directly linked to a label.
 */
export interface BaseColors {
  'primary-colors': { [key: string]: BaseColor };
  'signal-colors': { [key: string]: BaseColor };
  'data-colors': { [key: string]: BaseColor };
  'grey-colors': { [key: string]: BaseColor };
  'internal-colors': { 'focus-outline': BaseColor };
}

export interface Color {
  hex: string;
  contrast?: string;
}

export type TextLabels = 'text-1' | 'text-2' | 'text-3' | 'text-disabled-1' | 'text-disabled-2';
export type BackgroundLabels =
  | 'background-1'
  | 'background-2'
  | 'background-element-1'
  | 'background-element-2'
  | 'background-element-3'
  | 'background-element-4'
  | 'background-element-5'
  | 'background-overlay-1'
  | 'background-overlay-2'
  | 'background-overlay-3'
  | 'background-disabled-1'
  | 'background-disabled-2'
  | 'background-hover-1'
  | 'background-hover-2'
  | 'background-selected-1'
  | 'background-selected-2';
export type BorderLabels =
  | 'border-1'
  | 'border-2'
  | 'border-3'
  | 'border-4'
  | 'border-5'
  | 'border-disabled-1'
  | 'border-hover-1'
  | 'border-selected-1'
  | 'border-selected-2';
export type SignalLabels =
  | 'signal-success'
  | 'signal-caution'
  | 'signal-warning'
  | 'signal-error'
  | 'signal-info';
export type DataLabels = 'data-1' | 'data-2' | 'data-3' | 'data-4' | 'data-5' | 'data-6';
export type IconColors =
  | 'icon-stroke'
  | 'icon-filled-foreground'
  | 'icon-filled-background'
  | 'icon-filled-foreground-colored'
  | (SignalLabels extends `signal-${infer T}` ? `icon-${T}` : never);
export type StaticLabels = 'static-white' | 'static-black';

export type ColorLabel =
  | TextLabels
  | BackgroundLabels
  | BorderLabels
  | SignalLabels
  | DataLabels
  | IconColors
  | StaticLabels;

export interface Theme {
  text: { [label in TextLabels]: Color };
  background: { [label in BackgroundLabels]: Color };
  border: { [label in BorderLabels]: Color };
  signal: { [label in SignalLabels]: Color };
  data: { [label in DataLabels]: Color };
  icon: { [label in IconColors]: Color };
  static: { [label in StaticLabels]: Color };
}

export type ThemeName = 'light' | 'dark';
export type ThemeClassName = `e-theme-${ThemeName}`;
