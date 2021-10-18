import React, { FC, useState, useEffect } from 'react';
import { CheckmarkIcon, ChipComponent, CloseIcon, ChipTitle } from './styledComponents';

import classnames from 'classnames';

export type ChipType = 'removable' | 'legend' | 'choice';
export type ColorType = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'violet';

export interface onChangeValue {
  value: string;
  isSelected: boolean;
}

export interface BaseChipProps {
  ariaLabel?: string;
  color?: ColorType;
  disabled?: boolean;
  type?: ChipType;
  selected?: boolean;
  value: string;
  onDelete?: (event: string) => void;
  valueOnChange?: (event: onChangeValue) => void;
  webcomponent?: any;
}

export const Chip: FC<BaseChipProps> = ({
  ariaLabel,
  color = 'green',
  disabled = false,
  selected,
  type = 'removable',
  value,
  onDelete,
  valueOnChange,
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
      type={type}
      isSelected={isSelected}
    >
      {type === 'choice' && (
        <CheckmarkIcon
          disabled={disabled}
          className={classnames({
            ['showCheckmarkIcon']: isHovering || isSelected,
          })}
        >
          <i></i>
        </CheckmarkIcon>
      )}
      <ChipTitle
        color={color}
        className={classnames({
          ['dot']: type === 'legend',
          ['showDot']: type === 'legend' && (isHovering || isSelected),
          ['disabledDot']: disabled,
        })}
      >
        {value}
      </ChipTitle>
      {type === 'removable' && (
        <CloseIcon disabled={disabled}>
          <i></i>
        </CloseIcon>
      )}
    </ChipComponent>
  );
};

export default Chip;
