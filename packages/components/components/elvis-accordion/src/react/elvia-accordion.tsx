import React, { FC, useEffect, useRef, useState } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import styled from 'styled-components';
import './style.scss';

export interface AccordionProps {
  content: string | HTMLElement;
  label: string[];
  position: string;
  size: string;
  type: string;
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

const AccordionButtonArea = styled.div`
  display: inline-flex;
  justify-content: ${(props: { position: string }) =>
    (props.position === 'center' && 'center;') ||
    (props.position === 'right' && 'flex-end;') ||
    (props.position === 'left' && 'start;')}
  flex-direction: row;
  width: 100%;
  margin-top: ${(props: { type: string }) => (props.type !== 'overflow' ? '0' : '16px')};
`;

const AccordionButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  font-size: ${(props: { size: string }) =>
    (props.size === 'large' && '20px;') ||
    (props.size === 'medium' && '16px;') ||
    (props.size === 'small' && '14px;')}
  line-height: ${(props: { size: string }) => (props.size === 'small' ? '16px' : '24px')};
  text-align: left;
  cursor: pointer;
  &:hover {
    i {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 01-1.626 0L6.95 11.157A.853.853 0 118.157 9.95L12 13.793l3.843-3.843a.853.853 0 011.207 1.207l-4.237 4.236z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 01-1.626 0L6.95 11.157A.853.853 0 118.157 9.95L12 13.793l3.843-3.843a.853.853 0 011.207 1.207l-4.237 4.236z' fill='black'/%3e%3c/svg%3e");
    }
  }
  
  i {
    margin-left: 8px;
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

const AccordionContent = styled.div`
  display: flex;
  background: white;
  width: 100%;
  font-size: 16px;
  line-height:inherit;
  margin-top: ${(props: { isContentOpen: boolean; type: string }) =>
    props.isContentOpen && props.type === 'normal' ? '24px' : '0'};
  pointer-events: ${(props: { isContentOpen: boolean }) => (props.isContentOpen ? 'auto' : 'none')};
  height:auto;
  max-height: ${(props: { isContentOpen: boolean; type: string }) =>
    (props.isContentOpen === true && props.type === 'normal' && '10000px;') ||
    (props.isContentOpen === false && props.type === 'normal' && '0;') ||
    (props.isContentOpen === true && props.type === 'overflow' && '10000px;') ||
    (props.isContentOpen === false && props.type === 'overflow' && 'calc(2.2em * 1.2);')}
  opacity: ${(props: { isContentOpen: boolean; type: string }) =>
    props.isContentOpen ? '1' : props.type === 'overflow' ? '1' : '0'};
  overflow-y: ${(props: { isContentOpen: boolean; type: string }) =>
    (props.type === 'normal' && 'auto') ||
    (props.isContentOpen === false && props.type === 'overflow' && 'hidden') ||
    (props.isContentOpen === true && props.type === 'overflow' && 'auto')};
  transition: ${(props: { isContentOpen: boolean; type: string }) =>
    (props.type === 'normal' && 'all 0.3s ease-out') ||
    (props.isContentOpen === false && props.type === 'overflow' && 'none') ||
    (props.isContentOpen === true && props.type === 'overflow' && 'max-height 2s ease-in')};
`;

const Accordion: FC<AccordionProps> = ({
  content,
  label = ['Show', 'Hide'],
  position = 'center',
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
      <AccordionArea>
        {type === 'overflow' ? (
          <AccordionContent isContentOpen={contentOpen} type={type}>
            {content && <div>{content}</div>}
            {!content && <div ref={accordionText} />}
          </AccordionContent>
        ) : null}
        <AccordionButtonArea position={position} type={type}>
          <AccordionButton
            isContentOpen={contentOpen}
            size={size}
            onClick={() => setContentOpen((contentOpen) => !contentOpen)}
          >
            {contentOpen ? label[1] : label[0]}
            <i></i>
          </AccordionButton>
        </AccordionButtonArea>
        {type === 'normal' ? (
          <AccordionContent isContentOpen={contentOpen} type={type}>
            {content && <div>{content}</div>}
            {!content && <div ref={accordionText} />}
          </AccordionContent>
        ) : null}
      </AccordionArea>
    </span>
  );
};

export default Accordion;
