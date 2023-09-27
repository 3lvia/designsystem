import React, { MouseEvent } from 'react';
import { TertiaryButton, IconWrapper, FormFieldSizes } from '@elvia/elvis-toolbox';
import { DropdownItem, DropdownValueType } from '../publicApi.public';
import { LoadMoreButtonStyles, SpinContainer } from './dropdownOverlayStyles';
import { getDropdownItemId } from '../dropdownListUtils';
import sync from '@elvia/elvis-assets-icons/dist/icons/sync';

interface LoadMoreProps {
  item: DropdownItem;
  focusedValue?: DropdownValueType;
  onLoadMoreItems?: () => void;
  isLoadingMoreItems?: boolean;
  size: FormFieldSizes;
  onHover: (item: DropdownItem) => void;
}

export const LoadMoreButton: React.FC<LoadMoreProps> = ({
  item,
  focusedValue,
  onLoadMoreItems,
  isLoadingMoreItems,
  size,
  onHover,
}) => {
  const preventInputElementBlur = (ev: MouseEvent<HTMLDivElement>): void => {
    ev.preventDefault();
  };

  return (
    <>
      <LoadMoreButtonStyles
        onClick={() => !isLoadingMoreItems && onLoadMoreItems && onLoadMoreItems()}
        onMouseEnter={() => onHover(item)}
        onMouseDown={preventInputElementBlur}
        isLoading={isLoadingMoreItems}
        id={getDropdownItemId(item.value)}
      >
        <TertiaryButton
          tabIndex={-1}
          isActive={focusedValue === item.value}
          size={size === 'small' ? 'sm' : 'md'}
        >
          <SpinContainer>
            <IconWrapper icon={sync} size="xs" />
          </SpinContainer>
          {item.label}
        </TertiaryButton>
      </LoadMoreButtonStyles>
    </>
  );
};
