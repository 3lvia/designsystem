import React, { useContext, useEffect, useRef } from 'react';
import { DropdownContext } from '../elvia-dropdown';
import { DropdownContainerStyles } from './dropdownOverlayStyles';

interface DropdownOverlayProps {
  items: JSX.Element[];
}

export const DropdownOverlay: React.FC<DropdownOverlayProps> = ({ items }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { focusedIndex, isCompact } = useContext(DropdownContext);

  useEffect(() => {
    const buttonHeight = isCompact ? 40 : 48;
    // overlayRef.current?.scrollTo({
    //   top: buttonHeight * focusedIndex - overlayRef.current?.offsetHeight / 2,
    // });
  }, [focusedIndex]);

  return <DropdownContainerStyles ref={overlayRef}>{items}</DropdownContainerStyles>;
};
