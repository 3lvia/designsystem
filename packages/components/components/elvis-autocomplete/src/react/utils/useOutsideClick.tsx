import { useEffect, RefObject } from 'react';

/**
 * Custom hook to execute a callback function when clicking outside of a list of given refs.
 * @param refs - Array of React refs, representing elements to check if clicked inside.
 * @param callback - Callback function to execute when clicking outside the provided refs.
 *
 * @example
 * useOutsideClickListener([connectedElementRef, popoverRef], () => setIsShowing(false));
 */
export const useOutsideClickListener = (refs: RefObject<HTMLElement>[], callback: () => void): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!refs.some((ref) => ref.current?.contains(event.target as Node))) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
};
