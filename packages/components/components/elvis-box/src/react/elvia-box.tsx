import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import React, { CSSProperties, FC } from 'react';
import { BoxArea, BoxColoredLine, BoxTitle, BoxContent } from './styledComponents';
import { useSlot } from '@elvia/elvis-toolbox';

export interface BoxProps {
  title?: string | JSX.Element;
  content: string | JSX.Element;
  isColored?: boolean;
  hasBorder?: boolean;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

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
