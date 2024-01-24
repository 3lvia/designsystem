import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  TextSegmentedControl,
  IconSegmentedControl,
  SegmentedControlProps,
} from './elviaSegmentedControl.types';
import {
  SegmentedControlContainer,
  SegmentedControlLabel,
  SegmentedControlInput,
  SegmentedControlIconContainer,
  BoldControlTextPlaceholder,
} from './styledComponents';
import DOMPurify from 'dompurify';

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
          {type === 'icon' &&
            (index !== selectedIndex ? (
              <SegmentedControlIconContainer
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(getIconString((control as IconSegmentedControl).icon)),
                }}
                data-testid="segmented-control-icon"
              />
            ) : (
              <SegmentedControlIconContainer
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(getIconString((control as IconSegmentedControl).iconSelected)),
                }}
                data-testid="segmented-control-icon"
              />
            ))}
        </SegmentedControlLabel>
      ))}
    </SegmentedControlContainer>
  );
};

export default SegmentedControl;
