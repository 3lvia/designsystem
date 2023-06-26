import React, { FC } from 'react';
import { BoxArea, BoxColoredLine, BoxHeading, BoxContent } from './styledComponents';
import { useSlot, warnDeprecatedProps } from '@elvia/elvis-toolbox';
import { BoxProps } from './elvia-box.types';
import { config } from './config';

const Box: FC<BoxProps> = function ({
  heading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  content,
  isColored = false,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);

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

export default Box;
