import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { ChipComponent, ChipDot, ChipTitle } from './styledComponents';
import { ChipType, ColorType, onChangeValue } from './elvia-chip.types';
import { Icon } from '@elvia/elvis-icon/react';
import { useHover } from '@react-aria/interactions';

import classnames from 'classnames';
import { getColor } from '@elvia/elvis-colors';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import config from './config';

export interface BaseChipProps {
  ariaLabel?: string;
  color?: ColorType;
  isDisabled?: boolean;
  type?: ChipType;
  selected?: boolean;
  value: string;
  onDelete?: (event: string) => void;
  valueOnChange?: (event: onChangeValue) => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: ElvisComponentWrapper;
}

export const Chip: FC<BaseChipProps> = function ({
  ariaLabel,
  color = 'green',
  isDisabled = false,
  selected = false,
  type = 'removable',
  value,
  onDelete,
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(config, arguments[0]);

  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleOnDelete = (value: string) => {
    if (!webcomponent) {
      onDelete && onDelete(value);
    } else if (webcomponent) {
      webcomponent.triggerEvent('onDelete', value);
    }
  };

  const updateSelectedState = (value: string, isSelected: boolean) => {
    setIsSelected(isSelected);
    if (!webcomponent) {
      valueOnChange && valueOnChange({ value: value, isSelected: isSelected });
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: { value: value, isSelected: isSelected } }, true);
    }
  };

  const { hoverProps, isHovered } = useHover({});

  return (
    <ChipComponent
      {...hoverProps} // Handles hover / onMouseEnter / onMouseLeave logic
      role={type === 'removable' ? undefined : 'checkbox'}
      aria-checked={type === 'removable' ? undefined : isSelected}
      aria-label={ariaLabel}
      color={color}
      onClick={() => {
        type === 'removable' ? handleOnDelete(value) : updateSelectedState(value, !isSelected);
      }}
      disabled={isDisabled}
      chipType={type}
      isSelected={isSelected}
      isHovering={isHovered}
      className={`${className ? className : ''}`}
      style={inlineStyle}
      data-testid="chip-button"
      {...rest}
    >
      {type === 'choice' && (
        <Icon
          name="check"
          customSize="12px"
          inlineStyle={{
            paddingRight: '8px',
            visibility: isHovered || isSelected ? 'visible' : 'hidden',
            opacity: isDisabled ? '0.3' : '1',
          }}
        />
      )}
      {type === 'legend' && (
        <ChipDot
          color={color}
          className={classnames('dot', {
            ['showDot']: isHovered || isSelected,
            ['disabledDot']: isDisabled,
          })}
        />
      )}
      <ChipTitle disabled={isDisabled} data-testid="chip-label">
        {value}
      </ChipTitle>
      {type === 'removable' && (
        <Icon
          name="close"
          size="xxs"
          inlineStyle={{ marginLeft: '8px' }}
          color={isDisabled ? getColor('disabled') : undefined}
        />
      )}
    </ChipComponent>
  );
};

export default Chip;
