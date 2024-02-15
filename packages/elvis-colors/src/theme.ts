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

export type TextLabels =
  | 'text-1'
  | 'text-2'
  | 'text-3'
  | 'text-4'
  | 'text-5'
  | 'text-disabled-1'
  | 'text-disabled-2'
  | 'text-placeholder-1';
export type BackgroundLabels =
  | 'background-1'
  | 'background-2'
  | 'background-element-1'
  | 'background-element-2'
  | 'background-element-3'
  | 'background-3'
  | 'background-element-4'
  | 'background-element-5'
  | 'background-element-6'
  | 'background-overlay-1'
  | 'background-overlay-2'
  | 'background-overlay-3'
  | 'background-disabled-1'
  | 'background-disabled-2'
  | 'background-hover-1'
  | 'background-hover-2'
  | 'background-selected-1'
  | 'background-selected-2'
  | 'background-readonly-1';
export type BorderLabels =
  | 'border-1'
  | 'border-2'
  | 'border-3'
  | 'border-4'
  | 'border-5'
  | 'border-6'
  | 'border-disabled-1'
  | 'border-hover-1'
  | 'border-selected-1'
  | 'border-selected-2';
export type SignalLabels =
  | 'signal-positive'
  | 'signal-caution'
  | 'signal-warning'
  | 'signal-danger'
  | 'signal-info';
type BaseDataLabels = 'data-1' | 'data-2' | 'data-3' | 'data-4' | 'data-5' | 'data-6';
export type DataLabels = BaseDataLabels | `${BaseDataLabels}-${'10' | '30' | '50'}`;

export type IconColors =
  | 'icon-stroke-1'
  | 'icon-filled-foreground-1'
  | 'icon-filled-background-1'
  | (SignalLabels extends `signal-${infer T}` ? `icon-${T}` : never);
export type AssortedLabels = 'static-white' | 'static-black' | 'brand-accent' | 'focus-outline';
export type IllustrationLabels =
  | 'illustration-main-1'
  | 'illustration-main-2'
  | 'illustration-main-3'
  | 'illustration-main-4'
  | 'illustration-main-5'
  | 'illustration-shade-1'
  | 'illustration-shade-2'
  | 'illustration-shade-3'
  | 'illustration-shade-4'
  | 'illustration-background-1'
  | 'illustration-background-2'
  | 'illustration-background-3'
  | 'illustration-background-4'
  | 'illustration-background-5'
  | 'illustration-background-6';

export type ColorLabel =
  | TextLabels
  | BackgroundLabels
  | BorderLabels
  | SignalLabels
  | DataLabels
  | IconColors
  | AssortedLabels
  | IllustrationLabels;

export interface Theme {
  text: { [label in TextLabels]: Color };
  background: { [label in BackgroundLabels]: Color };
  border: { [label in BorderLabels]: Color };
  signal: { [label in SignalLabels]: Color };
  data: { [label in DataLabels]: Color };
  icon: { [label in IconColors]: Color };
  assorted: { [label in AssortedLabels]: Color };
  illustration: { [label in IllustrationLabels]: Color };
}

export type ThemeName = 'light' | 'dark';
export type ThemeClassName = `e-theme-${ThemeName}`;
