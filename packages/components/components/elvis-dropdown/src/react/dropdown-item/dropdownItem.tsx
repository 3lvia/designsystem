import React, { useState } from 'react';
import { DropdownItemStyles } from './dropdownItemStyles';

interface DropdownItemProps {
  isDisabled?: boolean;
  isSelected?: boolean;
  label: string;
  value: string;
  content?: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  isDisabled,
  isSelected,
  label,
  value,
  content,
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const [isMulti, setIsMulti] = useState(false);

  const initialize = (isCompact: boolean, isMulti: boolean) => {
    setIsCompact(isCompact);
    setIsMulti(isMulti);
  };

  return (
    <DropdownItemStyles isCompact={isCompact} isActive={isSelected} disabled={isDisabled}>
      {content}
    </DropdownItemStyles>
  );
};
