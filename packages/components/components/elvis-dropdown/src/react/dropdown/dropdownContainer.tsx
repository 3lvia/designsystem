import React from 'react';

interface DropdownProps {}

export const DropdownContainer = React.forwardRef<HTMLDivElement, DropdownProps>((_, ref) => {
  return <div ref={ref}></div>;
});

DropdownContainer.displayName = 'DropdownContainerComponent';
