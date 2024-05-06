import { useFocusTrap as useFocusTrapToolbox } from '@elvia/elvis-toolbox';
import { RefObject, useEffect } from 'react';

export const useFocusTrap = (trapRef: RefObject<HTMLElement>, isOpen: boolean) => {
  const { trapFocus, releaseFocusTrap } = useFocusTrapToolbox();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    trapFocus(trapRef);
    return () => {
      releaseFocusTrap();
    };
  }, [isOpen]);
};
