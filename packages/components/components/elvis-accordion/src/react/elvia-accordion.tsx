import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import { AccordionLabelPosition, AccordionSize, AccordionType } from './elvia-accordion.types';
import {
  AccordionArea,
  AccordionButtonArea,
  AccordionButton,
  AccordionLabel,
  AccordionLabelText,
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
  isStartAligned?: boolean;
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
  isStartAligned = false,
  hasBoldLabel = true,
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
  const accordionContentRef = useRef<HTMLDivElement>(null);

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
    if (accordionContentRef.current && webcomponent.getSlot('content')) {
      accordionContentRef.current.innerHTML = '';
      accordionContentRef.current.appendChild(webcomponent.getSlot('content'));
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
    if (!contentOpen) {
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
    setContentOpen((contentOpen) => !contentOpen);
  };

  const decideButtonAriaLabel = (): string => {
    if (contentOpen) {
      return closeAriaLabel ? closeAriaLabel : closeLabel ? closeLabel : 'Lukk';
    } else {
      return openAriaLabel ? openAriaLabel : openLabel ? openLabel : 'Åpne';
    }
  };
  const shouldShowRightIcon = (): boolean => {
    return (isStartAligned && isFullWidth) || !isStartAligned;
  };
  const hasContent = (): boolean => {
    const hasContentSlot: boolean = webcomponent !== undefined && webcomponent.getSlot('content') !== null;
    const hasContentProp: boolean = content !== '' || content !== undefined;
    return hasContentProp || hasContentSlot;
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
        {type === 'overflow' && hasContent() ? (
          <AccordionContent
            type={type}
            size={size}
            isContentOpen={contentOpen}
            overflowHeight={overflowHeight}
            hasContent={content ? true : false}
            data-testid="accordion-content-overflow"
          >
            {content && <div>{content}</div>}
            {!content && <div ref={accordionContentRef} />}
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
            {isStartAligned && !isFullWidth && (
              <Icon
                name={isHoveringButton ? 'expandCircleFilledColor' : 'expandCircleColor'}
                size={size === 'small' ? 'xs' : 'sm'}
              />
            )}
            <AccordionLabel
              openLabel={openLabel ? openLabel : ''}
              isStartAligned={isStartAligned}
              isFullWidth={isFullWidth}
            >
              <AccordionLabelText>{!contentOpen ? openLabel : closeLabel}</AccordionLabelText>
              <AccordionDetailText size={size}>
                {!contentOpen ? openDetailText : closeDetailText}
              </AccordionDetailText>
            </AccordionLabel>
            {shouldShowRightIcon() && (
              <Icon
                name={isHoveringButton ? 'expandCircleFilledColor' : 'expandCircleColor'}
                size={size === 'small' ? 'xs' : 'sm'}
              />
            )}
          </AccordionButton>
        </AccordionButtonArea>
        {type === 'normal' && hasContent() ? (
          <AccordionContent
            type={type}
            size={size}
            isContentOpen={contentOpen}
            overflowHeight={overflowHeight}
            data-testid="accordion-content-normal"
          >
            {content && <div>{content}</div>}
            {!content && <div ref={accordionContentRef} />}
          </AccordionContent>
        ) : null}
      </AccordionArea>
    </span>
  );
};

export default Accordion;
