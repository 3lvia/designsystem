import { BaseProps } from '@elvia/elvis-toolbox';

export const toastEventName = 'elviaToastOpen';

export type ToastType = 'positive' | 'informative';

export interface ToastProps extends BaseProps {}

export interface ToastConfig {
  title: string;
  body: string;
  duration: number;
  closable: boolean;
  status: ToastType;
  customIcon?: string;
}

export interface ToastWithId extends ToastConfig {
  id: number;
}
