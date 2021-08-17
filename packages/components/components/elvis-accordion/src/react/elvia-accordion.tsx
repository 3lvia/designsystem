import React, { FC, useEffect, useRef, useState } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import styled from 'styled-components';

export type AccordionLabelPosition = 'left' | 'center' | 'right';
export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionType = 'normal' | 'overflow';

export interface AccordionProps {
  content: string | HTMLElement;
  openLabel?: string;
  closeLabel?: string;
  labelPosition: AccordionLabelPosition;
  size: AccordionSize;
  type: AccordionType;
}

const ElviaColors = {
  elviaCharge: '#29d305',
  elviaOn: '#ffffff',
  elviaOff: '#000000',
};

const AccordionArea = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
`;

const decideLabelPosition = (prop: string) => {
  if (prop === 'center') {
    return 'center';
  }
  if (prop === 'right') {
    return 'flex-end';
  }
  if (prop === 'left') {
    return 'start';
  }
};

const AccordionButtonArea = styled.div`
  display: inline-flex;
  justify-content: ${(props: { labelPosition: string }) => decideLabelPosition(props.labelPosition)};
  flex-direction: row;
  width: 100%;
  margin-top: ${(props: { type: string }) => (props.type !== 'overflow' ? '0' : '16px')};
`;

const decideButtonFontSize = (prop: string) => {
  if (prop === 'small') {
    return '14px';
  }
  if (prop === 'medium') {
    return '16px';
  }
  if (prop === 'large') {
    return '20px';
  }
  return '16px';
};

const AccordionButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  padding: 0;
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  font-size: ${(props: { size: string }) => decideButtonFontSize(props.size)};
  line-height: ${(props: { size: string }) => (props.size === 'small' ? '16px' : '24px')};
  text-align: left;
  cursor: pointer;
  &:hover {
    i {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 01-1.626 0L6.95 11.157A.853.853 0 118.157 9.95L12 13.793l3.843-3.843a.853.853 0 011.207 1.207l-4.237 4.236z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 01-1.626 0L6.95 11.157A.853.853 0 118.157 9.95L12 13.793l3.843-3.843a.853.853 0 011.207 1.207l-4.237 4.236z' fill='black'/%3e%3c/svg%3e");
    }
  }

  i {
    margin-left: ${(props: { openLabel: string; closeLabel: string }) => {
    if (props.openLabel !== undefined || props.closeLabel !== undefined) {
      return '8px;';
    }
    return '0px;';
  }};
    border: none;
    border-radius: 50%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 01-1.626 0L6.95 11.157A.853.853 0 118.157 9.95L12 13.793l3.843-3.843a.853.853 0 011.207 1.207l-4.237 4.236z' fill='black'/%3e%3c/svg%3e");
    background-color: ${ElviaColors.elviaOn};
    display: inline-block;
    height: ${(props: { size: string }) => (props.size === 'small' ? '16px' : '24px')};
    width: ${(props: { size: string }) => (props.size === 'small' ? '16px' : '24px')};
    transition: transform 300ms;
    transform: ${(props: { isContentOpen: boolean }) =>
    (props.isContentOpen && ' rotate(180deg)') || (props.isContentOpen === false && ' rotate(0deg)')};
  }
`;

const decideContentMarginTop = (contentOpen: boolean, type: string, size: string) => {
  if (type === 'overflow') {
    return '0px';
  }
  if (contentOpen) {
    if (size === 'large') {
      return '24px';
    } else {
      return '16px';
    }
  }
};

const decideContentMaxHeight = (contentOpen: boolean, type: string) => {
  if (type === 'normal') {
    if (contentOpen) {
      return '10000px';
    } else {
      return '0px';
    }
  }
  if (type === 'overflow') {
    if (contentOpen) {
      return '10000px';
    } else {
      return 'calc(2em * 1.2)';
    }
  }
};
const decideContentOpacity = (contentOpen: boolean, type: string) => {
  if (contentOpen) {
    return '1';
  }
  if (!contentOpen && type === 'overflow') {
    return '1';
  }
  return '0';
};
const decideContentOverflowY = (contentOpen: boolean, type: string) => {
  if (contentOpen && type === 'overflow') {
    return 'hidden';
  }
  return 'auto';
};
const decideContentTransition = (contentOpen: boolean, type: string) => {
  if (type === 'overflow') {
    if (contentOpen) {
      return 'max-height 2s ease-in';
    } else {
      return 'none';
    }
  }
  return 'all 0.3s ease-out';
};

const AccordionContent = styled.div`
  display: flex;
  background: transparent;
  width: 100%;
  font-size: 16px;
  line-height: inherit;
  margin-top: ${(props: { isContentOpen: boolean; type: string; size: string }) =>
    decideContentMarginTop(props.isContentOpen, props.type, props.size)};
  pointer-events: ${(props: { isContentOpen: boolean }) => (props.isContentOpen ? 'auto' : 'none')};
  height: auto;
  max-height: ${(props: { isContentOpen: boolean; type: string }) =>
    decideContentMaxHeight(props.isContentOpen, props.type)};
  opacity: ${(props: { isContentOpen: boolean; type: string }) =>
    decideContentOpacity(props.isContentOpen, props.type)};
  overflow-y: ${(props: { isContentOpen: boolean; type: string }) =>
    decideContentOverflowY(props.isContentOpen, props.type)};
  transition: ${(props: { isContentOpen: boolean; type: string }) =>
    decideContentTransition(props.isContentOpen, props.type)};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Accordion: FC<AccordionProps> = ({
  content,
  openLabel,
  closeLabel,
  labelPosition = 'center',
  size = 'medium',
  type = 'normal',
}) => {
  const [contentOpen, setContentOpen] = useState(false);

  const accordionRef = useRef<HTMLSpanElement>(null);
  const accordionText = useRef<HTMLDivElement>(null);

  // Outline listener for focus only on tab keydown
  useEffect(() => {
    // Start outline listener
    toolbox.outlineListener(accordionRef.current);

    return () => {
      // Remove outline listener
      toolbox.outlineListener(accordionRef.current, true);
    };
  }, []);

  useEffect(() => {
    // Web component - Placing slots at the right place
    if (
      accordionRef.current &&
      accordionRef.current.parentElement &&
      accordionRef.current.parentElement.parentElement
    ) {
      accordionRef.current.parentElement.parentElement.querySelectorAll('[slot]').forEach((element: any) => {
        if (accordionText.current && element.slot === 'content') {
          accordionText.current.innerHTML = '';
          accordionText.current.appendChild(element);
        }
      });
    }
  });

  return (
    <span ref={accordionRef}>
      <AccordionArea aria-expanded={contentOpen}>
        {type === 'overflow' ? (
          <AccordionContent isContentOpen={contentOpen} type={type} size={size}>
            {content && <div>{content}</div>}
            {!content && <div ref={accordionText} />}
          </AccordionContent>
        ) : null}
        <AccordionButtonArea labelPosition={labelPosition} type={type}>
          <AccordionButton
            isContentOpen={contentOpen}
            openLabel={openLabel}
            closeLabel={closeLabel}
            size={size}
            onClick={() => setContentOpen((contentOpen) => !contentOpen)}
          >
            {!contentOpen ? openLabel : closeLabel}
            <i></i>
          </AccordionButton>
        </AccordionButtonArea>
        {type === 'normal' ? (
          <AccordionContent isContentOpen={contentOpen} type={type} size={size}>
            {content && <div>{content}</div>}
            {!content && <div ref={accordionText} />}
          </AccordionContent>
        ) : null}
      </AccordionArea>
    </span>
  );
};

export default Accordion;
