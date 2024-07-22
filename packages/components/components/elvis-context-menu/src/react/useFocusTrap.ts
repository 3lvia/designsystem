import { useFocusTrap as useFocusTrapToolbox } from '@elvia/elvis-toolbox';
import { RefObject, useEffect } from 'react';

export const useFocusTrap = (trapRef: RefObject<HTMLElement>, active: boolean) => {
  const { trapFocus, releaseFocusTrap } = useFocusTrapToolbox();

  useEffect(() => {
    if (!active) {
      return;
    }
    const originalFocusedElement = document.activeElement as HTMLElement | null;
    trapFocus(trapRef);
    return () => {
      releaseFocusTrap();
      originalFocusedElement?.focus();
    };
  }, [active]);
};
