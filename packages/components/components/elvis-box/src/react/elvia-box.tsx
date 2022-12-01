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

  console.log(
    'nonce value:',
    typeof window.__webpack_nonce__ !== undefined ? window.__webpack_nonce__ : 'undefined',
  );

  return (
    <div className={`${className ? className : ''}`} style={inlineStyle} {...rest}>
      <BoxArea data-testid="box-area">
        {title && <BoxTitle data-testid="box-title">{title}</BoxTitle>}
        {!title && <BoxTitle ref={boxTitle}></BoxTitle>}
        {content && (
          <BoxContent hasBorder={hasBorder} data-testid="box-content">
            {isColored && <BoxColoredLine data-testid="box-colored-line"></BoxColoredLine>}
            {content}
          </BoxContent>
        )}
        {!content && (
          <BoxContent hasBorder={hasBorder} data-testid="box-no-content">
            {isColored && <BoxColoredLine></BoxColoredLine>}
            <div ref={boxContent}></div>
          </BoxContent>
        )}
      </BoxArea>
    </div>
  );
};

export default Box;
