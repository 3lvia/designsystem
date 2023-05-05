import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { DividerOrientation, DividerType, DividerTypography } from './elvia-divider.types';
import { DividerArea, DividerHeading } from './styledComponents';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import { config } from './config';

export interface DividerProps {
  type?: DividerType;
  heading?: string | JSX.Element;
  typography?: DividerTypography;
  orientation?: DividerOrientation;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

export const Divider: React.FC<DividerProps> = function ({
  type = 'simple',
  typography = 'medium',
  heading = '',
  orientation = 'horizontal',
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);

  const dividerHeadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Web component - Placing slots at the right place
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (dividerHeadingRef.current && webcomponent.getSlot('heading')) {
      dividerHeadingRef.current.innerHTML = '';
      dividerHeadingRef.current.appendChild(webcomponent.getSlot('heading'));
    }
  });

  return (
    <DividerArea
      type={type}
      orientation={orientation}
      role="separator"
      className={className ? className : ''}
      style={inlineStyle}
      {...rest}
    >
      {heading === '' && type === 'title' && (
        <DividerHeading typography={typography} ref={dividerHeadingRef}></DividerHeading>
      )}
      {heading !== '' && type === 'title' && (
        <DividerHeading typography={typography} data-testid="divider-title">
          {heading}
        </DividerHeading>
      )}
    </DividerArea>
  );
};

export default Divider;
