import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { DividerOrientation, DividerType, DividerTypography } from './elvia-divider.types';
import { DividerArea, DividerTitle } from './styledComponents';

export interface DividerProps {
  type?: DividerType;
  title?: string | HTMLElement;
  typography?: DividerTypography;
  isInverted?: boolean;
  orientation?: DividerOrientation;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: ElvisComponentWrapper;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'simple',
  typography = 'medium',
  title = '',
  isInverted = false,
  orientation = 'horizontal',
  className,
  inlineStyle,
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
    <div className={`${className ? className : ''}`} style={{ height: '100%', ...inlineStyle }}>
      <DividerArea
        type={type}
        isInverted={isInverted}
        orientation={orientation}
        data-testid="divider-area"
        role="separator"
      >
        {title === '' && type === 'title' && (
          <DividerTitle typography={typography} isInverted={isInverted} ref={dividerTitleRef}></DividerTitle>
        )}
        {title !== '' && type === 'title' && (
          <DividerTitle typography={typography} isInverted={isInverted} data-testid="divider-title">
            {title}
          </DividerTitle>
        )}
      </DividerArea>
    </div>
  );
};

export default Divider;
