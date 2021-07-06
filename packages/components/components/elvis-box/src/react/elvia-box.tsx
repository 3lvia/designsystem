import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';

export interface BoxProps {
  content: string | HTMLElement;
  title?: string;
  isColored?: boolean;
  hasBorder?: boolean;
  webcomponent: any;
}

const ElviaColors = {
  elviaCharge: '#29d305',
  elviaOn: '#ffffff',
  elviaOff: '#000000',
  grey10: '#E9E9E9',
};

const BoxArea = styled.div`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
`;
const BoxColoredLine = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 4px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: ${ElviaColors.elviaCharge};
`;
const BoxTitle = styled.div`
  font-family: 'Red Hat Text';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: black;
  margin: 0px;
  margin-bottom: 8px;
  * {
    font-family: 'Red Hat Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin: 0;
  }
`;
const BoxContent = styled.div`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: ${(props: { hasBorder: boolean }) => props.hasBorder === true && `1px solid ${ElviaColors.grey10}`};
  background: ${ElviaColors.elviaOn};
  text-align: left;
  color: black;
  padding: 40px;
  @media (max-width: 767px) {
    padding: 24px;
  }
`;

const Box: FC<BoxProps> = ({ content, title, isColored = false, hasBorder = false, webcomponent }) => {
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
    <BoxArea>
      {title && <BoxTitle>{title}</BoxTitle>}
      {!title && <BoxTitle ref={boxTitle}></BoxTitle>}
      {content && (
        <BoxContent hasBorder={hasBorder} isColored={isColored}>
          {isColored && <BoxColoredLine></BoxColoredLine>}
          {content}
        </BoxContent>
      )}
      {!content && (
        <BoxContent hasBorder={hasBorder} isColored={isColored}>
          {isColored && <BoxColoredLine></BoxColoredLine>}
          <div ref={boxContent}></div>
        </BoxContent>
      )}
    </BoxArea>
  );
};

export default Box;
