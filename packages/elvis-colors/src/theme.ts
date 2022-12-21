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

type BackgroundLabels =
  | 'color-background-primary'
  | 'color-background-secondary'
  | 'color-background-tertiary'
  | 'color-background-element'
  | 'color-background-element-zebra'
  | 'color-background-overlay'
  | 'color-background-header'
  | 'color-background-accent'
  | 'color-background-accent-strong';
type TextLabels = 'color-text-primary' | 'color-text-secondary' | 'color-text-placeholder';
type StateLabels =
  | 'color-state-on'
  | 'color-state-caution'
  | 'color-state-warning'
  | 'color-state-error'
  | 'color-state-hover-green'
  | 'color-state-hover-grey'
  | 'color-state-disabled'
  | 'color-state-focus';
type DataLabels =
  | 'color-data-green'
  | 'color-data-violet'
  | 'color-data-blue'
  | 'color-data-purple'
  | 'color-data-orange'
  | 'color-data-red';

export type ColorLabel = BackgroundLabels | TextLabels | StateLabels | DataLabels;

export interface Theme {
  background: { [label in BackgroundLabels]: Color };
  text: { [label in TextLabels]: Color };
  state: { [label in StateLabels]: Color };
  data: { [label in DataLabels]: Color };
}

export type ThemeName = 'light' | 'dark';
