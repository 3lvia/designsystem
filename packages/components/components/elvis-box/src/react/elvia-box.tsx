import React, { FC } from 'react';
import { BoxArea, BoxColoredLine, BoxTitle, BoxContent } from './styledComponents';
import { useSlot } from '@elvia/elvis-toolbox';
import { BoxProps } from './elvia-box.types';

const Box: FC<BoxProps> = ({
  title,
  content,
  isColored = false,
  hasBorder = false,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const { ref: boxContent } = useSlot<HTMLDivElement>('content', webcomponent);
  const { ref: boxTitle } = useSlot<HTMLDivElement>('title', webcomponent);

  return (
    <BoxArea className={className} style={inlineStyle} {...rest} data-testid="box-area">
      <BoxTitle ref={boxTitle} data-testid="box-title">
        {title}
      </BoxTitle>
      <BoxContent hasBorder={hasBorder} data-testid="box-content">
        {isColored && <BoxColoredLine data-testid="box-colored-line"></BoxColoredLine>}
        {content ? content : <div ref={boxContent}></div>}
      </BoxContent>
    </BoxArea>
  );
};

export default Box;
