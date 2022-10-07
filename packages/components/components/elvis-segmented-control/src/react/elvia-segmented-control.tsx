import React, { useState, useLayoutEffect, useRef } from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { IconName } from '@elvia/elvis-assets-icons';
import { SegmentedControlProps } from './elviaSegmentedControl.types';
import { SegmentedControlContainer, SegmentedControlLabel, SegmentedControlInput } from './styledComponents';
import uniqueId from 'lodash.uniqueid';

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  items,
  value = 0,
  size = 'medium',
  type = 'text',
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const segmentedControlContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(value);
  const segmentedControlName = uniqueId('segmented-control-');
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (segmentedControlContainerRef.current) {
      setWidth(segmentedControlContainerRef.current.offsetWidth);
    }
  }, []);

  const setSelected = (selectedIndex: number): void => {
    setSelectedIndex(selectedIndex);
    if (!webcomponent && valueOnChange) {
      valueOnChange(selectedIndex);
    } else if (webcomponent) {
      webcomponent.setProps({ value: selectedIndex }, true);
    }
  };

  return (
    <SegmentedControlContainer
      ref={segmentedControlContainerRef}
      scType={type}
      size={size}
      selectedIndex={selectedIndex}
      widthOfContainer={width}
      numberOfControls={items.length}
      role="radiogroup"
      className={className ?? ''}
      style={{ ...inlineStyle }}
    >
      {items.map((control, index) => (
        <SegmentedControlLabel
          scType={type}
          size={size}
          isSelected={index === selectedIndex}
          key={index}
          htmlFor={control + index}
        >
          <SegmentedControlInput
            type="radio"
            id={control + index}
            name={segmentedControlName}
            checked={index === selectedIndex}
            onChange={() => setSelected(index)}
          ></SegmentedControlInput>
          {type === 'text' && control}
          {type === 'icon' && (
            <Icon
              name={(index === selectedIndex ? control + 'Color' : control) as IconName}
              size={size === 'large' ? 'sm' : 'xs'}
            />
          )}
        </SegmentedControlLabel>
      ))}
    </SegmentedControlContainer>
  );
};

export default SegmentedControl;
