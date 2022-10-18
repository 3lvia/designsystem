import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type MinuteInterval = '1' | '5' | '10' | '15' | '60';
export type ChangeType = 'hour' | 'minute';
export type ErrorType = 'invalidTime' | 'required';

export interface ErrorOptions {
  text: string;
  hideText: boolean;
  isErrorState: boolean;
}

export interface TimepickerProps {
  value: Date;
  valueOnChange: (value: Date | null) => void;
  errorOnChange: (error: string) => void;
  minuteInterval: MinuteInterval;
  isDisabled: boolean;
  isCompact: boolean;
  isRequired: boolean;
  errorOptions?: Partial<ErrorOptions>;
  selectNowOnOpen: boolean;
  label: string;
  className: string;
  inlineStyle: CSSProperties;
  webcomponent: ElvisComponentWrapper;
}
