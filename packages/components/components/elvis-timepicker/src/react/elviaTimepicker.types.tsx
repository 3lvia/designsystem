import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export type MinuteGranularity = '1' | '5' | '15' | '60';
export type ChangeType = 'hour' | 'minute';

export interface TimepickerProps {
  value: Date;
  valueOnChange: (value: Date) => void;
  minuteGranularity: MinuteGranularity;
  isDisabled: boolean;
  isCompact: boolean;
  selectNowOnOpen: boolean;
  label: string;
  className: string;
  inlineStyle: CSSProperties;
  webcomponent: ElvisComponentWrapper;
}
