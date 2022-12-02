import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { outlineListener, useSlot, IconWrapper } from '@elvia/elvis-toolbox';
import { TypographyName } from '@elvia/elvis-typography';
import {
  AccordionLabelPosition,
  AccordionSize,
  AccordionSpacingContent,
  AccordionType,
} from './elvia-accordion.types';
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
import { expandCircleColor, expandCircleFilledColor } from '@elvia/elvis-assets-icons';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

export interface AccordionProps {
  content?: string | JSX.Element;
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
  labelPosition?: AccordionLabelPosition;
  size?: AccordionSize;
  type?: AccordionType;
  spacingAboveContent?: AccordionSpacingContent;
  spacingBelowContent?: AccordionSpacingContent;
  overflowHeight?: number;
  typography?: TypographyName;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
  inlineStyle?: CSSProperties;
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
  spacingAboveContent = '8px',
  spacingBelowContent = '16px',
  overflowHeight,
  typography,
  onOpen,
  onClose,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const accordionRef = useRef<HTMLDivElement>(null);

  /** Start outline listener */
  useEffect(() => {
    if (accordionRef && accordionRef.current) {
      outlineListener(accordionRef.current);
    }
    return () => {
      if (accordionRef && accordionRef.current) {
        outlineListener(accordionRef.current, true);
      }
    };
  }, []);

  const { ref: accordionContentRef } = useSlot<HTMLDivElement>('content', webcomponent, {
    callback: (foundSlot) => setHasContent(foundSlot),
    useEffectDependencies: [type],
  });

  useEffect(() => {
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

  useEffect(() => {
    const { current } = accordionContentRef;
    if (!current) return;

    const updateContentHeight = () => {
      setContentHeight(current.scrollHeight);
    };
    const observer = new MutationObserver(updateContentHeight);
    observer.observe(current, { childList: true, subtree: true });
    updateContentHeight();

    return () => {
      observer.disconnect();
    };
  }, [accordionContentRef, accordionContentRef.current]);

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
            spacingAboveContent={spacingAboveContent}
            spacingBelowContent={spacingBelowContent}
            isOpenState={isOpenState}
            overflowHeight={overflowHeight}
            contentHeight={contentHeight}
            hasContent={hasContent}
            ref={accordionContentRef}
            data-testid="accordion-content-overflow"
          >
            {content}
          </AccordionContent>
        ) : null}
        <AccordionButtonArea labelPosition={labelPosition} type={type}>
          <AccordionButton
            size={size}
            currType={type}
            isFullWidth={isFullWidth}
            isOpenState={isOpenState}
            hasBoldLabel={hasBoldLabel}
            openDetailText={openDetailText}
            openLabel={openLabel ? openLabel : ''}
            closeLabel={closeLabel ? closeLabel : ''}
            typography={typography}
            onClick={() => handleOnClick()}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            data-testid="accordion-button-label"
            aria-label={decideButtonAriaLabel()}
          >
            {shouldShowLeftIcon() && (
              <IconWrapper
                icon={isHoveringButton || isHovering ? expandCircleFilledColor : expandCircleColor}
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
              <IconWrapper
                icon={isHoveringButton || isHovering ? expandCircleFilledColor : expandCircleColor}
                size={size === 'small' ? 'xs' : 'sm'}
              />
            )}
          </AccordionButton>
        </AccordionButtonArea>
        {type === 'normal' ? (
          <AccordionContent
            type={type}
            spacingAboveContent={spacingAboveContent}
            spacingBelowContent={spacingBelowContent}
            isOpenState={isOpenState}
            hasContent={hasContent}
            contentHeight={contentHeight}
            overflowHeight={overflowHeight}
            data-testid="accordion-content-normal"
            ref={accordionContentRef}
          >
            {content}
          </AccordionContent>
        ) : null}
      </AccordionArea>
    </AccordionWrapper>
  );
};

export default Accordion;
