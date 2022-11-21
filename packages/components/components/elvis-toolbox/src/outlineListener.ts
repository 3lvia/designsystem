/**
 * Starts a listener for mousedown and keydown keyboard events and adds or removes the outline of the element in focus.
 * @param element The element that should be able to obtain an outline.
 * @param destroy Destroys the listener that was started on the element when set to true.
 */
export const outlineListener = (element: HTMLElement | null, destroy?: boolean): void => {
  if (!element) {
    return;
  }

  const addOutline = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && element.classList.contains('ewc-no-outline')) {
      element.classList.remove('ewc-no-outline');
      // Add mousedown event-listener to remove outline again later
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

  // Start listening for keyboard and mousedown on element to add or remove outline
  element.addEventListener('keydown', addOutline);
  element.addEventListener('mousedown', removeOutline, false);
};
