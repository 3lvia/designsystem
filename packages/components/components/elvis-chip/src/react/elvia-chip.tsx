import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { ChipComponent, ChipDot, ChipTitle, Loading } from './styledComponents';
import { ChipType, ColorType } from './elvia-chip.types';
import { Icon } from '@elvia/elvis-icon/react';
import { useHover } from '@react-aria/interactions';

import classnames from 'classnames';
import { getColor } from '@elvia/elvis-colors';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import config from './config';

export interface ChipProps {
  ariaLabel?: string;
  color?: ColorType;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `isDisabled`.
   */
  disabled?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: ChipType;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `isSelected`.
   */
  selected?: boolean;
  isSelected?: boolean;
  value: string | number;
  onDelete?: (event: ChipProps['value']) => void;
  /**
   * @deprecated Removed in version 2.0.0. Replaced by `isSelectedOnChange()`.
   */
  valueOnChange?: (event: { value: string; isSelected: boolean }) => void;
  isSelectedOnChange?: (isSelected: NonNullable<ChipProps['isSelected']>) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

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
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(config, arguments[0]);

  const [isSelectedState, setIsSelectedState] = useState(isSelected);
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    setIsSelectedState(isSelected);
  }, [isSelected]);

  const handleOnDelete = (value: ChipProps['value']) => {
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
      webcomponent.setProps({ isSelected: newIsSelected }, true);
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
      onClick={() => {
        setIsAnimation(true);
        setTimeout(() => {
          setIsAnimation(false);
        }, 300);
        type === 'removable' ? handleOnDelete(value) : updateSelectedState(!isSelectedState);
      }}
      disabled={isDisabled}
      chipType={type}
      isSelected={isSelectedState}
      isHovering={isHovered}
      className={`${className ? className : ''}`}
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
            paddingRight: '8px',
            opacity: decideChoiceCheckmarkIconOpacity(),
          }}
        />
      )}
      {type === 'legend' && (
        <ChipDot
          color={color}
          className={classnames('dot', {
            ['showDot']: isHovered || isSelectedState,
            ['disabledDot']: isDisabled,
            ['hideDot']: isLoading,
          })}
        />
      )}
      {isLoading && (
        <Loading color={color}>
          <span />
          <span />
          <span />
        </Loading>
      )}
      <ChipTitle
        className={classnames({
          ['hide']: isLoading,
          ['disabled']: isDisabled,
          ['fadeIn']: isAnimation && !isLoading,
        })}
        disabled={isDisabled}
        data-testid="chip-label"
      >
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
