import React from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { TertiaryButton } from '@elvia/elvis-toolbox';
import { DropdownItem } from '../elviaDropdown.types';
import { LoadMoreButtonStyles, SpinContainer } from './dropdownOverlayStyles';

interface LoadMoreProps {
  item: DropdownItem;
  focusedValue?: string;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
  isCompact: boolean;
  onHover: (item: DropdownItem) => void;
}

export const LoadMoreButton: React.FC<LoadMoreProps> = ({
  item,
  focusedValue,
  onLoadMoreItems,
  isLoadingMoreItems,
  isCompact,
  onHover,
}) => {
  return (
    <>
      <LoadMoreButtonStyles
        onClick={() => !isLoadingMoreItems && onLoadMoreItems && onLoadMoreItems()}
        onMouseEnter={() => onHover(item)}
        isLoading={isLoadingMoreItems}
      >
        <TertiaryButton tabIndex={-1} isActive={focusedValue === item.value} size={isCompact ? 'sm' : 'md'}>
          <SpinContainer>
            <Icon size="xs" name="sync" />
          </SpinContainer>
          {item.label}
        </TertiaryButton>
      </LoadMoreButtonStyles>
    </>
  );
};
