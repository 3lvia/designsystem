import React, { FC } from 'react';
import { ChipComponent, ChipDot, ChipTitle, ChipLoading } from './styledComponents';
import { ChipProps } from './elvia-chip.types';
import { Icon } from '@elvia/elvis-icon/react';
import { useHover } from '@react-aria/interactions';
import { getColor } from '@elvia/elvis-colors';
import { warnDeprecatedProps, useWebComponentState } from '@elvia/elvis-toolbox';
import config from './config';

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

  const decideChoiceCheckmarkIconOpacity = () => {
    if (isDisabled) {
      return '0.3';
    } else if (isHovered || isSelectedState) {
      return '1';
    } else {
      return '0.05';
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
      disabled={isDisabled}
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
        <Icon
          name="check"
          customSize="12px"
          inlineStyle={{
            opacity: decideChoiceCheckmarkIconOpacity(),
          }}
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
      <ChipTitle isDisabled={isDisabled} isHidden={isLoading} data-testid="chip-label">
        {value}
      </ChipTitle>
      {type === 'removable' && (
        <Icon name="close" size="xxs" color={isDisabled ? getColor('disabled') : undefined} />
      )}
    </ChipComponent>
  );
};

export default Chip;
