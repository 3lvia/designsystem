import React, { FC } from 'react';
import { BoxArea, BoxColoredLine, BoxHeading, BoxContent } from './styledComponents';
import { useSlot } from '@elvia/elvis-toolbox';
import { BoxProps } from './elvia-box.types';

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
