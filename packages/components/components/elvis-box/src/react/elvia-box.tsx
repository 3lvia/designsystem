import React, { CSSProperties, FC, useEffect, useRef } from 'react';
import { BoxArea, BoxColoredLine, BoxTitle, BoxContent } from './styledComponents';
export interface BoxProps {
  content: string | HTMLElement;
  title?: string;
  isColored?: boolean;
  hasBorder?: boolean;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent: any;
}

const Box: FC<BoxProps> = ({
  content,
  title,
  isColored = false,
  hasBorder = false,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const boxContent = useRef<HTMLDivElement>(null);
  const boxTitle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (boxContent.current && webcomponent.getSlot('content')) {
      boxContent.current.innerHTML = '';
      boxContent.current.appendChild(webcomponent.getSlot('content'));
    }

    if (boxTitle.current && webcomponent.getSlot('title')) {
      boxTitle.current.innerHTML = '';
      boxTitle.current.appendChild(webcomponent.getSlot('title'));
    }
  }, [webcomponent]);

  return (
    <div className={`${className ? className : ''}`} style={inlineStyle}>
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
