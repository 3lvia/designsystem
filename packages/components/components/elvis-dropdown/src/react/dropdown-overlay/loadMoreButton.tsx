import { Icon } from '@elvia/elvis-icon/react';
import { TertiaryButton } from '@elvia/elvis-toolbox';
import React, { useState } from 'react';
import { LoadMoreButtonStyles, SpinContainer } from './dropdownOverlayStyles';

interface LoadMoreProps {
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
  isCompact: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreProps> = ({
  onLoadMoreItems,
  isLoadingMoreItems,
  isCompact,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <LoadMoreButtonStyles
        onClick={() => !isLoadingMoreItems && onLoadMoreItems && onLoadMoreItems()}
        onMouseEnter={() => !isLoadingMoreItems && setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        isLoading={isLoadingMoreItems}
      >
        <TertiaryButton tabIndex={-1} isActive={isActive} size={isCompact ? 'sm' : 'md'}>
          <SpinContainer>
            <Icon size="xs" name="sync" />
          </SpinContainer>
          Last inn flere
        </TertiaryButton>
      </LoadMoreButtonStyles>
    </>
  );
};
