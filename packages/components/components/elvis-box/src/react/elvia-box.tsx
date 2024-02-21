import { useSlot } from '@elvia/elvis-toolbox';
import React, { FC } from 'react';

import { BoxProps } from './elvia-box.types';
import { BoxArea, BoxColoredLine, BoxContent, BoxHeading } from './styledComponents';

export const Box: FC<BoxProps> = function ({
  heading,
  content,
  isColored = false,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  const { ref: boxContent } = useSlot<HTMLDivElement>('content', webcomponent);
  const { ref: boxHeading } = useSlot<HTMLDivElement>('heading', webcomponent);

  return (
    <BoxArea className={className} style={inlineStyle} {...rest} data-testid="box-area">
      <BoxHeading ref={boxHeading}>{heading}</BoxHeading>
      <BoxContent data-testid="box-content">
        {isColored && <BoxColoredLine data-testid="box-colored-line"></BoxColoredLine>}
        {content ? content : <div ref={boxContent}></div>}
      </BoxContent>
    </BoxArea>
  );
};
