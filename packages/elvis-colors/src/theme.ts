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
  | 'background-primary'
  | 'background-secondary'
  | 'background-tertiary'
  | 'background-element'
  | 'background-element-zebra'
  | 'background-overlay'
  | 'background-header'
  | 'background-accent'
  | 'background-accent-strong';
type TextLabels = 'text-primary' | 'text-secondary' | 'text-placeholder';
type StateLabels =
  | 'state-on'
  | 'state-caution'
  | 'state-warning'
  | 'state-error'
  | 'state-hover-green'
  | 'state-hover-grey'
  | 'state-selected-grey'
  | 'state-disabled'
  | 'state-focus';
type DataLabels = 'data-green' | 'data-violet' | 'data-blue' | 'data-purple' | 'data-orange' | 'data-red';

export type ColorLabel = BackgroundLabels | TextLabels | StateLabels | DataLabels;

export interface Theme {
  background: { [label in BackgroundLabels]: Color };
  text: { [label in TextLabels]: Color };
  state: { [label in StateLabels]: Color };
  data: { [label in DataLabels]: Color };
}

export type ThemeName = 'light' | 'dark';
export type ThemeClassName = `e-theme-${ThemeName}`;
