import React, { useState } from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { IconName } from '@elvia/elvis-assets-icons';
import {
  TextSegmentedControl,
  IconSegmentedControl,
  SegmentedControlProps,
} from './elviaSegmentedControl.types';
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
  const [selectedIndex, setSelectedIndex] = useState(value);
  const segmentedControlName = uniqueId('ewc-segmented-control-');

  const setSelected = (selectedIndex: number): void => {
    setSelectedIndex(selectedIndex);
    if (!webcomponent && valueOnChange) {
      valueOnChange(selectedIndex);
    } else if (webcomponent) {
      webcomponent.setProps({ value: selectedIndex }, true);
      webcomponent.triggerEvent('valueOnChange', selectedIndex);
    }
  };

  return (
    <SegmentedControlContainer
      scType={type}
      size={size}
      selectedIndex={selectedIndex}
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
            htmlFor={'segmented-control-' + index}
            aria-label={type === 'icon' ? (control as IconSegmentedControl).ariaLabel : undefined}
            data-testid="segmented-control-label"
          >
            <SegmentedControlInput
              type="radio"
              id={'segmented-control-' + index}
              name={segmentedControlName}
              checked={index === selectedIndex}
              onChange={() => setSelected(index)}
              data-testid="segmented-control-input"
            ></SegmentedControlInput>
            {type === 'text' && (
              <div data-testid="segmented-control-text">{(control as TextSegmentedControl).label}</div>
            )}
            {type === 'icon' &&
              (index !== selectedIndex ? (
                <Icon
                  name={(control as IconSegmentedControl).iconName as IconName}
                  size={size === 'large' ? 'sm' : 'xs'}
                  data-testid="segmented-control-icon"
                />
              ) : (
                <Icon
                  name={(control as IconSegmentedControl).iconNameSelected as IconName}
                  size={size === 'large' ? 'sm' : 'xs'}
                  data-testid="segmented-control-icon"
                />
              ))}
          </SegmentedControlLabel>
        ))}
    </SegmentedControlContainer>
  );
};

export default SegmentedControl;
