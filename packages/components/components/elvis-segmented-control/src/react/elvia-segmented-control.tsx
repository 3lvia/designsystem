import React, { useState } from 'react';
import { Icon, IconName } from '@elvia/elvis-icon/react';
import { SegmentedControlProps } from './elviaSegmentedControl.types';
import { SegmentedControlContainer, SegmentedControlRadio, SegmentedControlInput } from './styledComponents';
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
  const [selectedIndex, setSelectedIndex] = useState(value);
  const segmentedControlName = uniqueId('segmented-control-');

  const setSelected = (selectedIndex: number): void => {
    setSelectedIndex(selectedIndex);
    if (!webcomponent && valueOnChange) {
      valueOnChange(selectedIndex);
    } else if (webcomponent) {
      webcomponent.setProps({ value: selectedIndex }, true);
    }
  };

  const getMaxLengthOfLabel = (): number => {
    return Math.max(...items.map((control) => control.length));
  };

  return (
    <>
      <SegmentedControlContainer
        scType={type}
        size={size}
        selectedIndex={selectedIndex}
        maxLengthOfLabel={getMaxLengthOfLabel()}
        role="radiogroup"
        className={className ?? ''}
        style={{ ...inlineStyle }}
      >
        {items.map((control, index) => (
          <SegmentedControlRadio
            scType={type}
            size={size}
            isSelected={index === selectedIndex}
            maxLengthOfLabel={getMaxLengthOfLabel()}
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
          </SegmentedControlRadio>
        ))}
      </SegmentedControlContainer>
    </>
  );
};

export default SegmentedControl;
