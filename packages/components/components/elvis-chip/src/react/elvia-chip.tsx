import React, { FC } from 'react';
import { ChipComponent, ChipDot, ChipTitle, ChipLoading } from './styledComponents';
import { ChipProps } from './elvia-chip.types';
import { useHover } from '@react-aria/interactions';
import { warnDeprecatedProps, useWebComponentState, IconWrapper } from '@elvia/elvis-toolbox';
import { config } from './config';
import check from '@elvia/elvis-assets-icons/dist/icons/check';
import close from '@elvia/elvis-assets-icons/dist/icons/close';

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
  warnDeprecatedProps(config, arguments[0]);

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
      data-testid="chip-button"
      {...rest}
    >
      {type === 'choice' && (
        <IconWrapper icon={check} size="12px" color={isSelectedState || isHovered ? 'text-1' : 'border-4'} />
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
      <ChipTitle isDisabled={isDisabled} isHidden={isLoading} data-testid="chip-label">
        {value}
      </ChipTitle>
      {type === 'removable' && (
        <IconWrapper icon={close} size="xxs" color={isDisabled ? 'text-disabled-1' : undefined} />
      )}
    </ChipComponent>
  );
};

export default Chip;
