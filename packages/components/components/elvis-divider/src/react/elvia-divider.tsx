import React, { useEffect, useRef } from 'react';
import { DividerOrientation, DividerType, DividerTypography } from './elvia-divider.types';
import { DividerArea, DividerTitle } from './styledComponents';

export interface DividerProps {
  type?: DividerType;
  title?: string | HTMLElement;
  typography?: DividerTypography;
  isInverted?: boolean;
  orientation?: DividerOrientation;
  webcomponent: any;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'simple',
  typography = 'medium',
  title = '',
  isInverted = false,
  orientation = 'horizontal',
  webcomponent,
}) => {
  const dividerTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Web component - Placing slots at the right place
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (dividerTitleRef.current && webcomponent.getSlot('title')) {
      dividerTitleRef.current.innerHTML = '';
      dividerTitleRef.current.appendChild(webcomponent.getSlot('title'));
    }
  });

  return (
    <DividerArea type={type} isInverted={isInverted} orientation={orientation} data-testid="divider-area">
      {title === '' && type === 'title' && (
        <DividerTitle typography={typography} isInverted={isInverted} ref={dividerTitleRef}></DividerTitle>
      )}
      {title !== '' && type === 'title' && (
        <DividerTitle typography={typography} isInverted={isInverted} data-testid="divider-title">
          {title}
        </DividerTitle>
      )}
    </DividerArea>
  );
};

export default Divider;
