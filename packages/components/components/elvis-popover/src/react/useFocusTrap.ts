import { useFocusTrap as useFocusTrapToolbox } from '@elvia/elvis-toolbox';
import { RefObject, useEffect } from 'react';

export const useFocusTrap = (trapRef: RefObject<HTMLElement>, active: boolean) => {
  const { trapFocus, releaseFocusTrap } = useFocusTrapToolbox();

  useEffect(() => {
    if (!active) {
      return;
    }
    trapFocus(trapRef);
    const originalFocusedElement = document.activeElement as HTMLElement | null;
    return () => {
      releaseFocusTrap();
      originalFocusedElement?.focus();
    };
  }, [active]);
};
