import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { ChipComponent, ChipDot, ChipTitle } from './styledComponents';
import { ChipType, ColorType } from './elvia-chip.types';
import { Icon } from '@elvia/elvis-icon/react';
import { useHover } from '@react-aria/interactions';

import classnames from 'classnames';
import { getColor } from '@elvia/elvis-colors';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';

export interface BaseChipProps {
  ariaLabel?: string;
  color?: ColorType;
  disabled?: boolean;
  type?: ChipType;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `isSelected`.
   */
  selected?: boolean;
  isSelected?: boolean;
  value: string;
  onDelete?: (event: BaseChipProps['value']) => void;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `selectedOnChange()`.
   */
  valueOnChange?: (event: { value: string; isSelected: boolean }) => void;
  isSelectedOnChange?: (isSelected: NonNullable<BaseChipProps['isSelected']>) => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: ElvisComponentWrapper;
}

export const Chip: FC<BaseChipProps> = ({
  ariaLabel,
  color = 'green',
  disabled = false,
  isSelected = false,
  type = 'removable',
  value,
  onDelete,
  isSelectedOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [isSelectedState, setIsSelectedState] = useState(isSelected);

  useEffect(() => {
    setIsSelectedState(isSelected);
  }, [isSelected]);

  const handleOnDelete = (value: string) => {
    if (!webcomponent) {
      onDelete && onDelete(value);
    } else if (webcomponent) {
      webcomponent.triggerEvent('onDelete', value);
    }
  };

  const updateSelectedState = (newIsSelected: boolean) => {
    setIsSelectedState(newIsSelected);
    if (!webcomponent) {
      isSelectedOnChange && isSelectedOnChange(newIsSelected);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ isSelected: newIsSelected }, true);
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
      onClick={() => {
        type === 'removable' ? handleOnDelete(value) : updateSelectedState(!isSelectedState);
      }}
      disabled={disabled}
      chipType={type}
      isSelected={isSelectedState}
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
            opacity: disabled ? '0.3' : isHovered || isSelectedState ? '1' : '0.05',
          }}
        />
      )}
      {type === 'legend' && (
        <ChipDot
          color={color}
          className={classnames('dot', {
            ['showDot']: isHovered || isSelectedState,
            ['disabledDot']: disabled,
          })}
        />
      )}
      <ChipTitle disabled={disabled} data-testid="chip-label">
        {value}
      </ChipTitle>
      {type === 'removable' && (
        <Icon
          name="close"
          size="xxs"
          inlineStyle={{ marginLeft: '8px' }}
          color={disabled ? getColor('disabled') : undefined}
        />
      )}
    </ChipComponent>
  );
};

export default Chip;
