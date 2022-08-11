import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import { AccordionLabelPosition, AccordionSize, AccordionType } from './elvia-accordion.types';
import { AccordionArea, AccordionButtonArea, AccordionButton, AccordionContent } from './styledComponents';
import { Icon } from '@elvia/elvis-icon/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';

export interface AccordionProps {
  content: string | HTMLElement;
  openLabel?: string;
  closeLabel?: string;
  openAriaLabel?: string;
  closeAriaLabel?: string;
  labelPosition: AccordionLabelPosition;
  size: AccordionSize;
  type: AccordionType;
  overflowHeight?: number;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

const Accordion: FC<AccordionProps> = ({
  content,
  openLabel,
  closeLabel,
  openAriaLabel,
  closeAriaLabel,
  labelPosition = 'center',
  size = 'medium',
  type = 'normal',
  overflowHeight,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [contentOpen, setContentOpen] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  const accordionRef = useRef<HTMLSpanElement>(null);
  const accordionText = useRef<HTMLDivElement>(null);

  /** Start outline listener */
  useEffect(() => {
    if (accordionRef && accordionRef.current) {
      toolbox.outlineListener(accordionRef.current);
    }
    return () => {
      if (accordionRef && accordionRef.current) {
        toolbox.outlineListener(accordionRef.current, true);
      }
    };
  }, []);
  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (accordionText.current && webcomponent.getSlot('content')) {
      accordionText.current.innerHTML = '';
      accordionText.current.appendChild(webcomponent.getSlot('content'));
    }
  }, [webcomponent]);

  const decideButtonAriaLabel = (): string => {
    if (contentOpen) {
      return closeAriaLabel ? closeAriaLabel : closeLabel ? closeLabel : 'Lukk';
    } else {
      return openAriaLabel ? openAriaLabel : openLabel ? openLabel : 'Åpne';
    }
  };

  return (
    <span ref={accordionRef}>
      <AccordionArea
        aria-expanded={contentOpen}
        className={`${className ? className : ''}`}
        style={inlineStyle}
        data-testid="accordion-area"
        {...rest}
      >
        {type === 'overflow' ? (
          <AccordionContent
            overflowHeight={overflowHeight}
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
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            data-testid="accordion-button-label"
            aria-label={decideButtonAriaLabel()}
          >
            {!contentOpen ? openLabel : closeLabel}
            <Icon
              name={isHoveringButton ? 'expandCircleFilledColor' : 'expandCircleColor'}
              size={size === 'small' ? 'xs' : 'sm'}
            />
          </AccordionButton>
        </AccordionButtonArea>
        {type === 'normal' ? (
          <AccordionContent
            isContentOpen={contentOpen}
            type={type}
            size={size}
            overflowHeight={overflowHeight}
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
