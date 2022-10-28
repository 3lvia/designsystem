import { useFocusTrap } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef } from 'react';
import { DropdownContainerStyles } from './dropdownOverlayStyles';

interface DropdownOverlayProps {
  items: JSX.Element[];
}

export const DropdownOverlay: React.FC<DropdownOverlayProps> = ({ items }) => {
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

  return <DropdownContainerStyles ref={overlayRef}>{items}</DropdownContainerStyles>;
};
