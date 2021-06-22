import React, { FC, useEffect, useRef } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import styled from 'styled-components';

export type AccordionLabelPosition = 'left' | 'center' | 'right';
export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionType = 'normal' | 'overflow';

export interface BoxProps {
  content: string | HTMLElement;
  title?: string;
  hasHeader?: boolean;
  whiteBg?: boolean;
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
const BoxHeader = styled.div`
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
  border: ${(props: { whiteBg: boolean }) => props.whiteBg === true && `1px solid ${ElviaColors.grey10}`};
  background: ${ElviaColors.elviaOn};
  padding: 40px;
  text-align: left;
`;

const Box: FC<BoxProps> = ({ content, title, hasHeader = false, whiteBg = false }) => {
  const boxRef = useRef<HTMLSpanElement>(null);
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
      {title && <BoxTitle>{title}</BoxTitle>}
      {!title && <BoxTitle ref={boxTitle}></BoxTitle>}
      {content && (
        <BoxContent whiteBg={whiteBg} hasHeader={hasHeader}>
          {hasHeader && <BoxHeader></BoxHeader>}
          {content}
        </BoxContent>
      )}
      {!content && (
        <BoxContent whiteBg={whiteBg} hasHeader={hasHeader}>
          {hasHeader && <BoxHeader></BoxHeader>}
          <div ref={boxContent}></div>
        </BoxContent>
      )}
    </BoxArea>
  );
};

export default Box;
