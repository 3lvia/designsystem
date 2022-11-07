import React from 'react';
import { DropdownItemStyles } from '../dropdown-item/dropdownItemStyles';
import { Divider } from './dropdownOverlayStyles';

interface LoadMoreProps {
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
  isCompact?: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreProps> = ({
  onLoadMoreItems,
  isLoadingMoreItems,
  isCompact,
}) => {
  return (
    <>
      <Divider />
      <DropdownItemStyles
        onClick={() => onLoadMoreItems && onLoadMoreItems()}
        disabled={isLoadingMoreItems}
        isCompact={isCompact}
      >
        Last inn flere
      </DropdownItemStyles>
    </>
  );
};
