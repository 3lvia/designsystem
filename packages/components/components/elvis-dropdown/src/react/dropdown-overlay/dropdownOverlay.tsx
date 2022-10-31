import React, { useContext, useEffect, useRef, useState } from 'react';
import { DropdownContext } from '../elvia-dropdown';
import { DropdownContainerStyles, NoItemsMessage } from './dropdownOverlayStyles';

interface DropdownOverlayProps {
  items: JSX.Element[];
}

export const DropdownOverlay: React.FC<DropdownOverlayProps> = ({ items }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showNoItemsMessage, setShowNoItemsMessage] = useState(false);
  const { focusedIndex, isCompact, items: internalItems, filter, inputIsMouse } = useContext(DropdownContext);

  useEffect(() => {
    console.log('Is mouse: ', inputIsMouse);
    if (!inputIsMouse) {
      const buttonHeight = isCompact ? 40 : 48;
      overlayRef.current?.scrollTo({
        top: buttonHeight * focusedIndex - overlayRef.current?.offsetHeight / 2,
      });
    }
  }, [focusedIndex]);

  useEffect(() => {
    setShowNoItemsMessage(
      !internalItems.some((item) => item.value.toLowerCase().indexOf(filter.toLowerCase()) >= 0),
    );
  }, [filter]);

  return (
    <DropdownContainerStyles ref={overlayRef}>
      {showNoItemsMessage && <NoItemsMessage isCompact={isCompact} />}
      {items}
    </DropdownContainerStyles>
  );
};
