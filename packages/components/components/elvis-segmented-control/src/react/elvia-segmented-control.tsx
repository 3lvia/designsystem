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
import { useDelayedFlag } from './useDelayedFlag';
import { useSegmentedControlHighlighter } from './useSegmentedControlHighlighter';

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
  const {
    ref: containerRef,
    selectedLeft,
    selectedWidth,
  } = useSegmentedControlHighlighter(selectedIndex, items);

  // Delay adding animations to prevent animation on initial render
  const hasAnimation = useDelayedFlag(500);

  const setSelected = useCallback(
    (selectedIndex: number): void => {
      setSelectedIndex(selectedIndex);

      valueOnChange?.(selectedIndex);
      webcomponent?.setProps({ value: selectedIndex }, true);
      webcomponent?.triggerEvent('valueOnChange', selectedIndex);
    },
    [setSelectedIndex, valueOnChange, webcomponent],
  );

  const getIconString = useCallback(
    (icon: string): string => {
      let newIconString = icon;
      if (icon.includes('e-icon ')) {
        if (size === 'large') {
          newIconString = newIconString.replace('e-icon ', 'e-icon e-icon--sm ');
        } else {
          newIconString = newIconString.replace('e-icon ', 'e-icon e-icon--xs ');
        }
      }
      return newIconString;
    },
    [size],
  );

  useEffect(() => {
    setSelectedIndex(value);
  }, [value]);

  return (
    <SegmentedControlContainer
      $type={type}
      selectedWidth={selectedWidth}
      selectedLeft={selectedLeft}
      role="radiogroup"
      hasAnimation={hasAnimation}
      className={className}
      style={inlineStyle}
      ref={containerRef}
      {...rest}
    >
      {items?.map((control, index) => (
        <SegmentedControlLabel
          $type={type}
          size={size}
          isSelected={index === selectedIndex}
          hasAnimation={hasAnimation}
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
                        {
                          CUSTOM_ELEMENT_HANDLING: {
                            tagNameCheck: /^e-icon$/,
                          },
                        },
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
