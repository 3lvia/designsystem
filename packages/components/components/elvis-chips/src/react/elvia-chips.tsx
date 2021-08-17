import React, { FC, useState, useEffect } from 'react';
import { CheckmarkIcon, ChipsComponent, CloseIcon, ChipsTitle} from './styledComponents';

import classnames from 'classnames';

export type ChipsType = 'standard' | 'clickableCheckmark' | 'clickableDot';
export type ColorType = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'violet';

export interface BaseChipsProps {
  className?: string;
  color?: ColorType;
  disabled?: boolean;
  type?: ChipsType;
  isInitiallySelected?: boolean;
  value: string;
  onDelete?: (event: string) => void;
  valueOnChange?: (event: string) => void;
  webcomponent?: any;
}

export const Chips: FC<BaseChipsProps> = ({
  className,
  color = 'green',
  disabled = false,
  type='standard',
  isInitiallySelected,
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
    updateSelectedState(value)
  },[isSelected])

  const handleOnDelete = (value: string) => {
    if (!webcomponent) {
      onDelete(value);
    } else if (webcomponent) {
      console.log("handleOnDelete")
      webcomponent.setProps({ value: value }, true);
      webcomponent.triggerEvent('onDelete');
    }
  };

  const updateSelectedState = (value: string) => {
    if (!webcomponent) {
      if (valueOnChange) {
        isSelected ? valueOnChange(value) : valueOnChange('');
      }
    }
    else if (webcomponent) {
      // True -> Prevents rerender
      isSelected ? webcomponent.setProps({ value: value }, true) : webcomponent.setProps({ value: '' }, true);
    }
  }

  return (
      <ChipsComponent
      //aria-label={``}
      aria-selected={isSelected}
      className={className}
      color={color}
      onClick={() => {
        setIsSelected(!isSelected)
        onDelete && handleOnDelete(value)
      }
       }
      disabled={disabled}
      onMouseEnter={setHover(true)}
      onMouseLeave={setHover(false)}
      type={type}
      isSelected={isSelected}
      >
        {type === 'clickableCheckmark' && <CheckmarkIcon disabled={disabled} className={classnames({
          ['showCheckmarkIcon']: isHovering || isSelected
        })}><i></i>
        </CheckmarkIcon>}
        <ChipsTitle color={color} className={classnames({
          ['dot']: type === 'clickableDot',
          ['clickableDot']: type === 'clickableDot' && (isHovering || isSelected),
          ['disabledDot'] : disabled
        })} >
        {value}
        </ChipsTitle>
          {type === 'standard' && <CloseIcon disabled={disabled}><i></i></CloseIcon>}
        </ChipsComponent>
  );
};

export default Chips;
