import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ElviaColors from '@elvia/elvis-colors';

export interface BoxProps {
  content: string | HTMLElement;
  title?: string;
  isColored?: boolean;
  hasBorder?: boolean;
  webcomponent: any;
}

const colors = {
  elviaCharge: ElviaColors['primary-colors']['green'].color,
  elviaOn: ElviaColors['primary-colors']['white'].color,
  elviaOff: ElviaColors['primary-colors']['black'].color,
  grey10: ElviaColors['grey-colors']['grey-10'].color,
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
  background: ${colors.elviaCharge};
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
  margin-left: 8px;
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

type BoxContentType = {
  hasBorder: boolean;
};

const BoxContent = styled.div<BoxContentType>`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: ${(props: { hasBorder: boolean }) => props.hasBorder === true && `1px solid ${colors.grey10}`};
  background: ${colors.elviaOn};
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
        <BoxContent hasBorder={hasBorder}>
          {isColored && <BoxColoredLine></BoxColoredLine>}
          {content}
        </BoxContent>
      )}
      {!content && (
        <BoxContent hasBorder={hasBorder}>
          {isColored && <BoxColoredLine></BoxColoredLine>}
          <div ref={boxContent}></div>
        </BoxContent>
      )}
    </BoxArea>
  );
};

export default Box;
