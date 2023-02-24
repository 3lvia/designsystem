import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { DividerOrientation, DividerType, DividerTypography } from './elvia-divider.types';
import { DividerArea, DividerTitle } from './styledComponents';

export interface DividerProps {
  type?: DividerType;
  title?: string | JSX.Element;
  typography?: DividerTypography;
  orientation?: DividerOrientation;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'simple',
  typography = 'medium',
  title = '',
  orientation = 'horizontal',
  className,
  inlineStyle,
  webcomponent,
  ...rest
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
    <DividerArea
      type={type}
      orientation={orientation}
      data-testid="divider-area"
      role="separator"
      className={className ? className : ''}
      style={inlineStyle}
      {...rest}
    >
      {title === '' && type === 'title' && (
        <DividerTitle typography={typography} ref={dividerTitleRef}></DividerTitle>
      )}
      {title !== '' && type === 'title' && (
        <DividerTitle typography={typography} data-testid="divider-title">
          {title}
        </DividerTitle>
      )}
    </DividerArea>
  );
};

export default Divider;
