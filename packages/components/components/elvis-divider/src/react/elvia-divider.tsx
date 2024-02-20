import React from 'react';

import { useSlot } from '@elvia/elvis-toolbox';

import { DividerProps } from './elvia-divider.types';
import { DividerArea, DividerHeading } from './styledComponents';

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
  const { ref: dividerHeadingRef } = useSlot<HTMLDivElement>('heading', webcomponent);

  return (
    <DividerArea
      type={type}
      orientation={orientation}
      role="separator"
      className={className ?? ''}
      style={inlineStyle}
      {...rest}
    >
      {heading === '' && type === 'heading' && (
        <DividerHeading typography={typography} ref={dividerHeadingRef}></DividerHeading>
      )}
      {heading !== '' && type === 'heading' && (
        <DividerHeading typography={typography} data-testid="divider-heading">
          {heading}
        </DividerHeading>
      )}
    </DividerArea>
  );
};

export default Divider;
