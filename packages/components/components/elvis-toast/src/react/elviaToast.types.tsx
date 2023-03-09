export const toastEventName = 'elviaToastOpen';

export type ToastType = 'positive' | 'informative';

export interface ToastConfig {
  title: string;
  body: string;
  duration: number;
  closable: boolean;
  status: ToastType;
}
