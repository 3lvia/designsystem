import { Tooltip } from '@elvia/elvis-tooltip/react';
import DOMPurify from 'dompurify';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  IconSegmentedControl,
  SegmentedControlProps,
  TextSegmentedControl,
} from './elviaSegmentedControl.types';
import {
  BoldControlTextPlaceholder,
  SegmentedControlContainer,
  SegmentedControlIconContainer,
  SegmentedControlInput,
  SegmentedControlLabel,
} from './styledComponents';

let UNIQUE_SEGMENTED_CONTROL_ID = 0;

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  items,
  value = 0,
  size = 'medium',
  type = 'text',
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [selectedIndex, setSelectedIndex] = useState(value);
  const segmentedControlId = useRef(`ewc-segmented-control-${UNIQUE_SEGMENTED_CONTROL_ID++}`);

  const setSelected = useCallback((selectedIndex: number): void => {
    setSelectedIndex(selectedIndex);

    valueOnChange?.(selectedIndex);
    webcomponent?.setProps({ value: selectedIndex }, true);
    webcomponent?.triggerEvent('valueOnChange', selectedIndex);
  }, []);

  const getIconString = useCallback((icon: string): string => {
    let newIconString = icon;
    if (icon.includes('e-icon ')) {
      if (size === 'large') {
        newIconString = newIconString.replace('e-icon ', 'e-icon e-icon--sm ');
      } else {
        newIconString = newIconString.replace('e-icon ', 'e-icon e-icon--xs ');
      }
    }
    return newIconString;
  }, []);

  useEffect(() => {
    setSelectedIndex(value);
  }, [value]);

  return (
    <SegmentedControlContainer
      $type={type}
      size={size}
      selectedIndex={selectedIndex}
      numberOfControls={items?.length}
      role="radiogroup"
      className={className ?? ''}
      style={inlineStyle}
      {...rest}
    >
      {items?.map((control, index) => (
        <SegmentedControlLabel
          $type={type}
          size={size}
          isSelected={index === selectedIndex}
          key={index}
          htmlFor={segmentedControlId.current + index}
          aria-label={type === 'icon' ? (control as IconSegmentedControl).ariaLabel : undefined}
          data-testid="segmented-control-label"
        >
          <Tooltip
            display="block"
            content={(control as IconSegmentedControl).tooltip ?? ''}
            isDisabled={!(control as IconSegmentedControl).tooltip}
            trigger={
              <>
                <SegmentedControlInput
                  type="radio"
                  id={segmentedControlId.current + index}
                  name={segmentedControlId.current}
                  checked={index === selectedIndex}
                  onChange={() => setSelected(index)}
                />
                {type === 'text' && (
                  <div data-testid="segmented-control-text">
                    <span>{(control as TextSegmentedControl).label}</span>
                    <BoldControlTextPlaceholder aria-hidden="true">
                      {(control as TextSegmentedControl).label}
                    </BoldControlTextPlaceholder>
                  </div>
                )}
                {type === 'icon' && (
                  <SegmentedControlIconContainer
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        getIconString(
                          (control as IconSegmentedControl)[
                            index === selectedIndex ? 'iconSelected' : 'icon'
                          ],
                        ),
                      ),
                    }}
                    data-testid="segmented-control-icon"
                  />
                )}
              </>
            }
          />
        </SegmentedControlLabel>
      ))}
    </SegmentedControlContainer>
  );
};

export default SegmentedControl;
