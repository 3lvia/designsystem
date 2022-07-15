import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import toolbox from '@elvia/elvis-toolbox';
import { AccordionLabelPosition, AccordionSize, AccordionType } from './elvia-accordion.types';
import {
  AccordionWrapper,
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
  isHovering?: boolean;
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
  isHovering = false,
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
  const [isOpenState, setIsOpenState] = useState(isOpen);
  // const [hasBeenInitiated, setHasBeenInitiated] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const accordionRef = useRef<HTMLDivElement>(null);
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
      setHasContent(true);
      accordionContentRef.current.innerHTML = '';
      accordionContentRef.current.appendChild(webcomponent.getSlot('content'));
    }
  }, [webcomponent]);

  useEffect(() => {
    console.log('IsOpen updated');
    // console.log(hasBeenInitiated, ' Initiated');
    // if (!hasBeenInitiated) {
    //   console.log('INITIATE');
    //   setHasBeenInitiated((preHasBeenInitiated) => !preHasBeenInitiated);
    //   return;
    // }
    // console.log(isOpenState, ' changed');
    setIsOpenState(isOpen);
  }, [isOpen]);

  useEffect(() => {
    type === 'single' ? setHasContent(false) : setHasContent(true);
  }, [type]);

  useEffect(() => {
    if (content) {
      setHasContent(true);
    }
  }, [content]);

  const handleOnClick = () => {
    if (type === 'single') {
      return;
    }
    if (!isOpenState) {
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
    setIsOpenState((prevIsOpenState) => !prevIsOpenState);
  };

  const decideButtonAriaLabel = (): string => {
    if (isOpenState) {
      return closeAriaLabel ? closeAriaLabel : closeLabel ? closeLabel : 'Lukk';
    } else {
      return openAriaLabel ? openAriaLabel : openLabel ? openLabel : 'Åpne';
    }
  };
  const shouldShowRightIcon = (): boolean => {
    return (isStartAligned && isFullWidth) || !isStartAligned;
  };
  const shouldShowLeftIcon = (): boolean => {
    return isStartAligned && !isFullWidth;
  };

  return (
    <AccordionWrapper ref={accordionRef}>
      <AccordionArea
        aria-expanded={isOpenState}
        className={`${className ? className : ''}`}
        style={inlineStyle}
        data-testid="accordion-area"
        {...rest}
      >
        {type === 'overflow' ? (
          <AccordionContent
            type={type}
            size={size}
            isOpenState={isOpenState}
            overflowHeight={overflowHeight}
            hasContent={hasContent}
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
            isOpenState={isOpenState}
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
            {shouldShowLeftIcon() && (
              <Icon
                name={isHoveringButton || isHovering ? 'expandCircleFilledColor' : 'expandCircleColor'}
                size={size === 'small' ? 'xs' : 'sm'}
              />
            )}
            <AccordionLabel
              hasLabel={type !== 'single'}
              openLabel={openLabel ? openLabel : ''}
              isStartAligned={isStartAligned}
              isFullWidth={isFullWidth}
            >
              <AccordionLabelText>{!isOpenState ? openLabel : closeLabel}</AccordionLabelText>
              <AccordionDetailText size={size} openDetailText={openDetailText}>
                {!isOpenState ? openDetailText : closeDetailText}
              </AccordionDetailText>
            </AccordionLabel>
            {shouldShowRightIcon() && (
              <Icon
                name={isHoveringButton || isHovering ? 'expandCircleFilledColor' : 'expandCircleColor'}
                size={size === 'small' ? 'xs' : 'sm'}
              />
            )}
          </AccordionButton>
        </AccordionButtonArea>
        {type === 'normal' ? (
          <AccordionContent
            type={type}
            size={size}
            isOpenState={isOpenState}
            hasContent={hasContent}
            overflowHeight={overflowHeight}
            data-testid="accordion-content-normal"
          >
            {content && <div>{content}</div>}
            {!content && <div ref={accordionContentRef} />}
          </AccordionContent>
        ) : null}
      </AccordionArea>
    </AccordionWrapper>
  );
};

export default Accordion;
