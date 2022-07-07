import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import { AccordionLabelPosition, AccordionSize, AccordionType } from './elvia-accordion.types';
import {
  AccordionArea,
  AccordionButtonArea,
  AccordionButton,
  AccordionDetailText,
  AccordionContent,
} from './styledComponents';
import { Icon } from '@elvia/elvis-icon/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';

export interface AccordionProps {
  content: string | HTMLElement;
  isOpen?: boolean;
  isFullWidth?: boolean;
  openLabel?: string;
  closeLabel?: string;
  openDetailText?: string;
  closeDetailText?: string;
  openAriaLabel?: string;
  closeAriaLabel?: string;
  hasBoldLabel?: boolean;
  labelPosition: AccordionLabelPosition;
  size: AccordionSize;
  type: AccordionType;
  overflowHeight?: number;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: ElvisComponentWrapper;
}

const Accordion: FC<AccordionProps> = ({
  content,
  isOpen = false,
  isFullWidth = false,
  openLabel,
  closeLabel,
  openDetailText,
  closeDetailText,
  openAriaLabel,
  closeAriaLabel,
  hasBoldLabel = false,
  labelPosition = 'center',
  size = 'medium',
  type = 'normal',
  overflowHeight,
  onOpen,
  onClose,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [contentOpen, setContentOpen] = useState(isOpen);
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

  useEffect(() => {
    // if (!hasBeenInitiated) {
    //   setHasBeenInitiated(true);
    //   return;
    // }
    setContentOpen(isOpen);
  }, [isOpen]);

  const handleOnClick = () => {
    setContentOpen((contentOpen) => !contentOpen);
    if (contentOpen) {
      if (!webcomponent && onOpen) {
        onOpen();
      } else if (webcomponent) {
        webcomponent.triggerEvent('onOpen');
      }
    } else {
      if (!webcomponent && onClose) {
        onClose();
      } else if (webcomponent) {
        webcomponent.triggerEvent('onClose');
      }
    }
  };

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
            size={size}
            isFullWidth={isFullWidth}
            isContentOpen={contentOpen}
            hasBoldLabel={hasBoldLabel}
            openDetailText={openDetailText}
            openLabel={openLabel ? openLabel : ''}
            closeLabel={closeLabel ? closeLabel : ''}
            onClick={() => handleOnClick()}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            data-testid="accordion-button-label"
            aria-label={decideButtonAriaLabel()}
          >
            {!contentOpen ? openLabel : closeLabel}
            <AccordionDetailText>{!contentOpen ? openDetailText : closeDetailText}</AccordionDetailText>
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
