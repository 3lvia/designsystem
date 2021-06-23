import React, { FC, useEffect, useRef } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import styled from 'styled-components';

export type AccordionLabelPosition = 'left' | 'center' | 'right';
export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionType = 'normal' | 'overflow';

export interface BoxProps {
  content: string | HTMLElement;
  title?: string;
  isColored?: boolean;
  isInverted?: boolean;
  hasBorder?: boolean;
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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  color: ${(props: { isInverted: boolean }) => (props.isInverted === true ? 'white' : 'black')};
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
  border-radius: 8px;
  border: ${(props: { hasBorder: boolean }) => props.hasBorder === true && `1px solid ${ElviaColors.grey10}`};
  background: ${ElviaColors.elviaOn};
  padding: 40px;
  text-align: left;
  color: black;
`;

const Box: FC<BoxProps> = ({ content, title, isColored = false, hasBorder = false, isInverted = false }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const boxContent = useRef<HTMLDivElement>(null);
  const boxTitle = useRef<HTMLDivElement>(null);

  // Outline listener for focus only on tab keydown
  useEffect(() => {
    // Start outline listener
    toolbox.outlineListener(boxRef.current);

    return () => {
      // Remove outline listener
      toolbox.outlineListener(boxRef.current, true);
    };
  }, []);

  useEffect(() => {
    // Web component - Placing slots at the right place
    if (boxRef.current && boxRef.current.parentElement && boxRef.current.parentElement.parentElement) {
      boxRef.current.parentElement.parentElement.querySelectorAll('[slot]').forEach((element: any) => {
        if (boxContent.current && element.slot === 'content') {
          boxContent.current.innerHTML = '';
          boxContent.current.appendChild(element);
        }
        if (boxTitle.current && element.slot === 'title') {
          boxTitle.current.innerHTML = '';
          boxTitle.current.appendChild(element);
        }
      });
    }
  });

  return (
    <BoxArea ref={boxRef}>
      {title && <BoxTitle isInverted={isInverted}>{title}</BoxTitle>}
      {!title && <BoxTitle isInverted={isInverted} ref={boxTitle}></BoxTitle>}
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
