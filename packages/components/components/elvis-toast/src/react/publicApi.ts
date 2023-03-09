import { ToastConfig, toastEventName } from './elviaToast.types';

export const openElviaToast = (config: Partial<ToastConfig>): void => {
  const defaultConfig: ToastConfig = {
    title: '',
    body: '',
    duration: 7000,
    closable: false,
    status: 'positive',
  };

  const mergedConfig = { ...defaultConfig, ...config };

  document.dispatchEvent(new CustomEvent(toastEventName, { detail: mergedConfig }));
};
