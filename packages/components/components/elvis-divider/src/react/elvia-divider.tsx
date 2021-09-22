import React, { useEffect, useRef } from 'react';
import * as StyledDivider from './styledComponents';

export type DividerType = 'simple' | 'title' | 'curved';
export type DividerTypography = 'medium' | 'caps';
export interface DividerProps {
  type?: DividerType;
  title?: string | HTMLElement;
  typography?: DividerTypography;
  isInverted?: boolean;
  webcomponent: any;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'simple',
  typography = 'medium',
  title = '',
  isInverted = false,
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
    <StyledDivider.DividerArea type={type} isInverted={isInverted}>
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
