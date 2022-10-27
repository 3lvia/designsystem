import { useFocusTrap } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef } from 'react';
import { DropdownContainerStyles } from './dropdownOverlayStyles';

interface DropdownOverlayProps {
  content: React.ReactNode;
}

export const DropdownOverlay: React.FC<DropdownOverlayProps> = ({ content }) => {
  // isMulti: boolean;
  // hasSelectAllOption: boolean;
  // selectAllOption?: Partial<DropdownItemProps>;
  // noOptionsMessage: string;
  // onSelect?: (option: DropdownItemProps | DropdownItemProps[] | undefined) => void;
  const overlayRef = useRef(null);
  const { trapFocus, releaseFocusTrap } = useFocusTrap();

  useEffect(() => {
    trapFocus(overlayRef);

    return () => releaseFocusTrap();
  }, []);

  return <DropdownContainerStyles ref={overlayRef}>{content}</DropdownContainerStyles>;
};
