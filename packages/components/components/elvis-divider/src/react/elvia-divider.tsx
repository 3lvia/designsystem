import React, { useEffect, useRef } from 'react';
import * as StyledDivider from './styledComponents';

export type DividerType = 'simple' | 'title' | 'curved';
export type DividerTypography = 'medium' | 'caps';
export interface DividerProps {
  type?: DividerType;
  title?: string | HTMLElement;
  typography?: DividerTypography;
  isInverted?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'simple',
  typography = 'medium',
  title = 'Title',
  isInverted = false,
}) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const dividerTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Web component - Placing slots at the right place
    if (
      dividerRef.current &&
      dividerRef.current.parentElement &&
      dividerRef.current.parentElement.parentElement
    ) {
      dividerRef.current.parentElement.parentElement.querySelectorAll('[slot]').forEach((element: any) => {
        if (dividerTitleRef.current && element.slot === 'title') {
          dividerTitleRef.current.innerHTML = '';
          dividerTitleRef.current.appendChild(element);
        }
      });
    }
  });

  return (
    <StyledDivider.DividerArea type={type} isInverted={isInverted} ref={dividerRef}>
      {title && type === 'title' && (
        <StyledDivider.DividerTitle typography={typography} isInverted={isInverted}>
          {title}
        </StyledDivider.DividerTitle>
      )}
      {!title && type === 'title' && (
        <StyledDivider.DividerTitle
          typography={typography}
          isInverted={isInverted}
          ref={dividerTitleRef}
        ></StyledDivider.DividerTitle>
      )}
    </StyledDivider.DividerArea>
  );
};

export default Divider;
