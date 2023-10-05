import check from '@elvia/elvis-assets-icons/dist/icons/check';
import close from '@elvia/elvis-assets-icons/dist/icons/close';
import { getThemeColor } from '@elvia/elvis-colors';
import { IconWrapper, useWebComponentState } from '@elvia/elvis-toolbox';
import { useHover } from '@react-aria/interactions';
import React, { FC } from 'react';
import { ChipProps } from './elvia-chip.types';
import { ChipComponent, ChipDot, ChipLoading, ChipTitle } from './styledComponents';

export const Chip: FC<ChipProps> = function ({
  ariaLabel,
  color = 'green',
  isDisabled = false,
  isSelected = false,
  isLoading = false,
  type = 'removable',
  value,
  onDelete,
  isSelectedOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  const [isSelectedState, setIsSelectedState] = useWebComponentState(
    isSelected,
    'isSelected',
    webcomponent,
    isSelectedOnChange,
  );

  const handleOnDelete = (value: ChipProps['value']) => {
    if (!webcomponent) {
      onDelete && onDelete(value);
    } else if (webcomponent) {
      webcomponent.triggerEvent('onDelete', value);
    }
  };

  const getTextColor = (): string => {
    if (isDisabled) {
      return getThemeColor('text-disabled-1');
    } else if (type === 'removable' && isHovered) {
      return getThemeColor('text-5');
    }
    return getThemeColor('text-1');
  };

  const { hoverProps, isHovered } = useHover({});

  return (
    <ChipComponent
      {...hoverProps} // Handles hover / onMouseEnter / onMouseLeave logic
      role={type === 'removable' ? undefined : 'checkbox'}
      aria-checked={type === 'removable' ? undefined : isSelectedState}
      aria-label={ariaLabel}
      color={color}
      onClick={() => (type === 'removable' ? handleOnDelete(value) : setIsSelectedState(!isSelectedState))}
      isDisabled={isDisabled}
      chipType={type}
      isSelected={isSelectedState}
      isHovering={isHovered}
      className={className ?? ''}
      isLoading={isLoading}
      style={inlineStyle}
      disabled={isDisabled}
      data-testid="chip-button"
      {...rest}
    >
      {type === 'choice' && (
        <IconWrapper
          icon={check}
          size="12px"
          color={isSelectedState || isHovered ? 'icon-stroke-1' : 'border-4'}
        />
      )}
      {type === 'legend' && (
        <ChipDot
          color={color}
          showDot={isHovered || isSelectedState}
          isDisabled={isDisabled}
          isHidden={isLoading}
        />
      )}
      {isLoading && (
        <ChipLoading color={color}>
          <span />
          <span />
          <span />
        </ChipLoading>
      )}
      <ChipTitle
        chipType={type}
        isDisabled={isDisabled}
        isHovering={isHovered}
        isHidden={isLoading}
        data-testid="chip-label"
        style={{ color: getTextColor() }}
      >
        {value}
      </ChipTitle>
      {type === 'removable' && <IconWrapper icon={close} size="xxs" color={getTextColor()} />}
    </ChipComponent>
  );
};

export default Chip;
