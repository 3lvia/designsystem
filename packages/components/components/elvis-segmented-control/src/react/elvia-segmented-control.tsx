import React, { useState, useLayoutEffect, useRef } from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { IconName } from '@elvia/elvis-assets-icons';
import { IconSegmentedControl, SegmentedControlProps } from './elviaSegmentedControl.types';
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
  const [width, setWidth] = useState(0);
  const segmentedControlName = uniqueId('segmented-control-');

  useLayoutEffect(() => {
    // TODO: Fjerne timeout, funker ikke i Vue uten denne nå, dette fikser forsovet også at bakgrunnen ikke animeres inn
    setTimeout(() => {
      if (segmentedControlContainerRef.current) {
        setWidth(segmentedControlContainerRef.current.offsetWidth);
      }
    });
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
      numberOfControls={items && items.length}
      role="radiogroup"
      className={className ?? ''}
      style={{ ...inlineStyle }}
      data-testid="segmented-control-container"
    >
      {items &&
        items.map((control, index) => (
          <SegmentedControlLabel
            scType={type}
            size={size}
            isSelected={index === selectedIndex}
            key={index}
            htmlFor={control.name + index}
            aria-label={type === 'icon' ? (control as IconSegmentedControl).ariaLabel : ''}
            data-testid="segmented-control-label"
          >
            <SegmentedControlInput
              type="radio"
              id={control.name + index}
              name={segmentedControlName}
              checked={index === selectedIndex}
              onChange={() => setSelected(index)}
              data-testid="segmented-control-input"
            ></SegmentedControlInput>
            {type === 'text' && <div data-testid="segmented-control-text">control.name</div>}
            {type === 'icon' && (
              <Icon
                name={(index === selectedIndex ? control.name + 'Color' : control.name) as IconName}
                size={size === 'large' ? 'sm' : 'xs'}
                data-testid="segmented-control-icon"
              />
            )}
          </SegmentedControlLabel>
        ))}
    </SegmentedControlContainer>
  );
};

export default SegmentedControl;
