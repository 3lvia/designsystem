import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { ChipCheckmarkIcon, ChipComponent, ChipCloseIcon, ChipTitle } from './styledComponents';
import { ChipType, ColorType, onChangeValue } from './elvia-chip.types';

import classnames from 'classnames';

export interface BaseChipProps {
  ariaLabel?: string;
  color?: ColorType;
  disabled?: boolean;
  type?: ChipType;
  selected?: boolean;
  value: string;
  onDelete?: (event: string) => void;
  valueOnChange?: (event: onChangeValue) => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: any;
}

export const Chip: FC<BaseChipProps> = ({
  ariaLabel,
  color = 'green',
  disabled = false,
  selected = false,
  type = 'removable',
  value,
  onDelete,
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const [isSelected, setIsSelected] = useState(selected);
  const [isHovering, setIsHovering] = useState(false);

  const setHover = (newState: boolean) => () => {
    setIsHovering(newState);
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleOnDelete = (value: string) => {
    if (!webcomponent) {
      onDelete && onDelete(value);
    } else if (webcomponent) {
      webcomponent.triggerEvent('onDelete', { value: value });
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

  return (
    <ChipComponent
      aria-label={ariaLabel}
      aria-selected={isSelected}
      color={color}
      onClick={() => {
        type === 'removable' ? handleOnDelete(value) : updateSelectedState(value, !isSelected);
      }}
      disabled={disabled}
      onMouseEnter={setHover(true)}
      onMouseLeave={setHover(false)}
      chipType={type}
      isSelected={isSelected}
      className={`${className ? className : ''}`}
      style={inlineStyle}
      data-testid="chip-button"
    >
      {type === 'choice' && (
        <ChipCheckmarkIcon
          disabled={disabled}
          className={classnames({
            ['showCheckmarkIcon']: isHovering || isSelected,
          })}
        >
          <i></i>
        </ChipCheckmarkIcon>
      )}
      <ChipTitle
        color={color}
        disabled={disabled}
        className={classnames({
          ['dot']: type === 'legend',
          ['showDot']: type === 'legend' && (isHovering || isSelected),
          ['disabledDot']: disabled,
        })}
        data-testid="chip-label"
      >
        {value}
      </ChipTitle>
      {type === 'removable' && (
        <ChipCloseIcon disabled={disabled}>
          <i></i>
        </ChipCloseIcon>
      )}
    </ChipComponent>
  );
};

export default Chip;
