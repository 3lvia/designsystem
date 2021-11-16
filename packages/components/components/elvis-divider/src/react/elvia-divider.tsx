import React, { useEffect, useRef } from 'react';
import * as StyledDivider from './styledComponents';

export type DividerType = 'simple' | 'title' | 'curved';
export type DividerTypography = 'medium' | 'caps';
export type DividerOrientation = 'horizontal' | 'vertical';
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
    <StyledDivider.DividerArea type={type} isInverted={isInverted} orientation={orientation}>
      {title === '' && type === 'title' && (
        <StyledDivider.DividerTitle
          typography={typography}
          isInverted={isInverted}
          ref={dividerTitleRef}
        ></StyledDivider.DividerTitle>
      )}
      {title !== '' && type === 'title' && (
        <StyledDivider.DividerTitle typography={typography} isInverted={isInverted}>
          {title}
        </StyledDivider.DividerTitle>
      )}
    </StyledDivider.DividerArea>
  );
};

export default Divider;
