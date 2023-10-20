export const toastEventName = 'elviaToastOpen';

export type ToastType = 'positive' | 'informative';

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

let elviaToastId = 0;
export const toastContainerId = 'elvia-toast-container';

const listenForToastClosing = (toastId: number, callback?: () => void) => {
  const toastContainer = document.getElementById(toastContainerId);

  const observer = new MutationObserver((event) => {
    const toastWasRemoved = Array.from(event[0].removedNodes).find(
      (el: HTMLElement) => el.getAttribute('data-elvia-toast-id') === toastId.toString(),
    );

    if (toastWasRemoved) {
      callback?.();
      observer.disconnect();
    }
  });

  if (toastContainer) {
    observer.observe(toastContainer, { childList: true });
  }
};

/**
 * Dispatches an event that opens an Elvia toast.
 *
 * @param config The configuration of the toast content.
 * @param callback An optional callback that can be used to perform actions when the toast is closed.
 *
 *
 * @example
 * import { openElviaToast } from '@elvia/elvis-toast';
 *
 * openToast() {
 *  openElviaToast({
 *    title: 'Short title',
 *    body: 'A successful confirmation message.',
 *    duration: 5000,
 *    closable: true,
 *  }, () => {
 *    // Do some optional actions when the toast is closed.
 *  });
 * }
 *
 */
export const openElviaToast = (config: Partial<ToastConfig>, callback?: () => void): void => {
  const defaultConfig: ToastConfig = {
    title: '',
    body: '',
    duration: 7000,
    closable: false,
    status: 'positive',
  };

  const toastId = elviaToastId++;
  const mergedConfig: ToastWithId = { ...defaultConfig, ...config, id: toastId };

  listenForToastClosing(toastId, callback);
  document.dispatchEvent(new CustomEvent(toastEventName, { detail: mergedConfig }));
};
