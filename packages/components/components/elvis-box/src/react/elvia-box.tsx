import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import ElviaTypography from '@elvia/elvis-typography';

export interface BoxProps {
  content: string | HTMLElement;
  title?: string;
  isColored?: boolean;
  hasBorder?: boolean;
  webcomponent: any;
}

const colors = {
  elviaCharge: getColor('green'),
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  grey10: getColor('grey-10'),
};

const typography = {
  titleCaps: ElviaTypography['title-caps'],
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
  ${typography.titleCaps}
  font-style: normal;
  color: ${colors.elviaBlack};
  margin: 0px;
  margin-left: 8px;
  margin-bottom: 8px;
  * {
    ${typography.titleCaps}
    font-style: normal;
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
  background: ${colors.elviaWhite};
  text-align: left;
  color: ${colors.elviaBlack};
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
