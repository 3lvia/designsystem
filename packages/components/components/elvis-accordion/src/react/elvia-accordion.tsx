import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import { AccordionLabelPosition, AccordionSize, AccordionType } from './elvia-accordion.types';
import { AccordionArea, AccordionButtonArea, AccordionButton, AccordionContent } from './styledComponents';

export interface AccordionProps {
  content: string | HTMLElement;
  openLabel?: string;
  closeLabel?: string;
  labelPosition: AccordionLabelPosition;
  size: AccordionSize;
  type: AccordionType;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
}

const Accordion: FC<AccordionProps> = ({
  content,
  openLabel,
  closeLabel,
  labelPosition = 'center',
  size = 'medium',
  type = 'normal',
  className,
  inlineStyle,
}) => {
  const [contentOpen, setContentOpen] = useState(false);

  const accordionRef = useRef<HTMLSpanElement>(null);
  const accordionText = useRef<HTMLDivElement>(null);

  // Outline listener for focus only on tab keydown
  useEffect(() => {
    // Start outline listener
    if (accordionRef && accordionRef.current) {
      toolbox.outlineListener(accordionRef.current);
    }
    return () => {
      // Remove outline listenes
      if (accordionRef && accordionRef.current) {
        toolbox.outlineListener(accordionRef.current, true);
      }
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
      <AccordionArea
        aria-expanded={contentOpen}
        className={`${className ? className : ''}`}
        style={inlineStyle}
        data-testid="accordion-area"
      >
        {type === 'overflow' ? (
          <AccordionContent
            isContentOpen={contentOpen}
            type={type}
            size={size}
            data-testid="accordion-content-overflow"
          >
            {content && <div>{content}</div>}
            {!content && <div ref={accordionText} />}
          </AccordionContent>
        ) : null}
        <AccordionButtonArea labelPosition={labelPosition} type={type}>
          <AccordionButton
            isContentOpen={contentOpen}
            openLabel={openLabel ? openLabel : ''}
            closeLabel={closeLabel ? closeLabel : ''}
            size={size}
            onClick={() => setContentOpen((contentOpen) => !contentOpen)}
            data-testid="accordion-button-label"
            aria-label={contentOpen ? 'Lukk' : 'Åpne'}
          >
            {!contentOpen ? openLabel : closeLabel}
            <i></i>
          </AccordionButton>
        </AccordionButtonArea>
        {type === 'normal' ? (
          <AccordionContent
            isContentOpen={contentOpen}
            type={type}
            size={size}
            data-testid="accordion-content-normal"
          >
            {content && <div>{content}</div>}
            {!content && <div ref={accordionText} />}
          </AccordionContent>
        ) : null}
      </AccordionArea>
    </span>
  );
};

export default Accordion;
