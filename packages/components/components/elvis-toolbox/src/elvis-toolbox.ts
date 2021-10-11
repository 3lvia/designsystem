import { throttle } from 'lodash';

const customThrottle = (func: () => void, limit: number, options: { trailing: boolean }): any => {
  return throttle(func, limit, options);
};

const outlineListener = (element: HTMLElement, destroy?: boolean): void => {
  if (!element) {
    return;
  }

  const addOutline = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && element.classList.contains('ewc-no-outline')) {
      element.classList.remove('ewc-no-outline');
      // Add mousedown event-listener to remove outline again
      element.addEventListener('mousedown', removeOutline, false);
    }
  };

  const removeOutline = () => {
    if (!element.classList.contains('ewc-no-outline')) {
      element.classList.add('ewc-no-outline');
      // Remove mousedown event-listener until next tab happens
      element.removeEventListener('mousedown', removeOutline, false);
    }
  };

  // If destroy is true -> Remove all listeners and return
  if (destroy) {
    element.removeEventListener('keydown', addOutline);
    element.removeEventListener('mousedown', removeOutline, false);
    return;
  }

  // Start listening for keyboard-events and mousedown on element to add or remove outline
  element.addEventListener('keydown', addOutline);
  element.addEventListener('mousedown', removeOutline, false);
};

export default { throttle: customThrottle, outlineListener: outlineListener };
