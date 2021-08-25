import React, { FC, useState, useEffect } from 'react';
import { CheckmarkIcon, ChipsComponent, CloseIcon, ChipsTitle} from './styledComponents';

import classnames from 'classnames';

export type ChipsType = 'standard' | 'clickable';
export type IconType = 'checkmark' | 'dot';
export type ColorType = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'violet';

export interface onChangeValue {
  value: string;
  isSelected: boolean;
}

export interface BaseChipsProps {
  color?: ColorType;
  disabled?: boolean;
  type?: ChipsType;
  iconType?: IconType;
  isInitiallySelected?: boolean;
  value: string;
  onDelete?: (event: string) => void;
  valueOnChange?: (event: onChangeValue) => void;
  webcomponent?: any;
}

export const Chips: FC<BaseChipsProps> = ({
  iconType,
  color = 'green',
  disabled = false,
  isInitiallySelected,
  type='standard',
  value,
  onDelete,
  valueOnChange,
  webcomponent,
}) => {
  const [isSelected, setIsSelected] = useState(isInitiallySelected)
  const [isHovering, setIsHovering] = useState(false)

  const setHover = (newState: boolean) => () => {
    setIsHovering(newState)
  }

  useEffect(()=> {
    isSelected !== undefined && updateSelectedState(value, isSelected)
  },[isSelected])

  const handleOnDelete = (value: string) => {
    if (!webcomponent) {
      onDelete && onDelete(value);
    } else if (webcomponent) {
      webcomponent.setProps({ value: value }, true);
      webcomponent.triggerEvent('onDelete', {value: value});
    }
  };

  const updateSelectedState = (value: string, isSelected: boolean) => {
    if (!webcomponent) {
        valueOnChange && valueOnChange({value: value, isSelected: isSelected});
    }
    else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: {value: value, isSelected: isSelected} }, true);
    }
  }

  return (
      <ChipsComponent
      //aria-label={``}
      aria-selected={isSelected}
      color={color}
      onClick={() => {
        setIsSelected(!isSelected)
        type === 'standard' && handleOnDelete(value)
      }
       }
      disabled={disabled}
      onMouseEnter={setHover(true)}
      onMouseLeave={setHover(false)}
      type={type}
      isSelected={isSelected}
      >
        {iconType === 'checkmark' && <CheckmarkIcon disabled={disabled} className={classnames({
          ['showCheckmarkIcon']: isHovering || isSelected
        })}><i></i>
        </CheckmarkIcon>}
        <ChipsTitle color={color} className={classnames({
          ['dot']: iconType === 'dot',
          ['showDot']: iconType === 'dot' && (isHovering || isSelected),
          ['disabledDot'] : disabled
        })} >
        {value}
        </ChipsTitle>
          {type === 'standard' && <CloseIcon disabled={disabled}><i></i></CloseIcon>}
        </ChipsComponent>
  );
};

export default Chips;
