import expandCircleColor from '@elvia/elvis-assets-icons/dist/icons/expandCircleColor';
import expandCircleFilledColor from '@elvia/elvis-assets-icons/dist/icons/expandCircleFilledColor';
import { outlineListener, useSlot } from '@elvia/elvis-toolbox';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { AccordionProps, AccordionSize } from './elvia-accordion.types';
import {
  AccordionArea,
  AccordionButton,
  AccordionButtonArea,
  AccordionContent,
  AccordionDetailText,
  AccordionHeightAnimator,
  AccordionLabel,
  AccordionLabelText,
  StyledIconWrapper,
} from './styledComponents';

export const Accordion: FC<AccordionProps> = ({
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
  const getClosedHeight = () => {
    if (type === 'overflow') {
      return overflowHeight ? `${overflowHeight}px` : '2.6em';
    }
    return `0px`;
  };

  const [isOpenState, setIsOpenState] = useState(isOpen);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [contentHeight, setContentHeight] = useState(getClosedHeight());
  const [visibility, setVisibility] = useState<'hidden' | 'unset'>(type === 'overflow' ? 'unset' : 'hidden');

  const accordionRef = useRef<HTMLDivElement>(null);

  /** Start outline listener */
  useEffect(() => {
    if (accordionRef?.current) {
      outlineListener(accordionRef.current);
    }
    return () => {
      if (accordionRef?.current) {
        outlineListener(accordionRef.current, true);
      }
    };
  }, []);

  const { ref: openLabelRef } = useSlot<HTMLDivElement>('openLabel', webcomponent, {
    useEffectDependencies: useMemo(() => [isOpenState], [isOpenState]),
  });
  const { ref: closeLabelRef } = useSlot<HTMLDivElement>('closeLabel', webcomponent, {
    useEffectDependencies: useMemo(() => [isOpenState], [isOpenState]),
  });
  const { ref: accordionContentRef } = useSlot<HTMLDivElement>('content', webcomponent, {
    useEffectDependencies: useMemo(() => [type], [type]),
  });
  const slotContentHeight = accordionContentRef.current?.getBoundingClientRect().height ?? 0;

  const updateOpenState = (newIsOpenState: boolean) => {
    if (newIsOpenState === isOpenState) {
      return;
    }

    if (newIsOpenState) {
      setVisibility('unset');
      setContentHeight(`${slotContentHeight}px`);
    } else {
      setContentHeight(`${slotContentHeight}px`);

      setTimeout(() => setContentHeight(getClosedHeight()));
    }

    setIsOpenState(newIsOpenState);
  };

  useEffect(() => {
    updateOpenState(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (type === 'overflow' && !isOpenState) {
      setVisibility('unset');
      setContentHeight(getClosedHeight());
    }
  }, [type]);

  const handleOnClick = () => {
    if (!isOpenState) {
      onOpen?.();
      webcomponent?.triggerEvent('onOpen');
    } else {
      onClose?.();
      webcomponent?.triggerEvent('onClose');
    }

    updateOpenState(!isOpenState);
  };

  const decideButtonAriaLabel = (): string => {
    if (isOpenState) {
      return closeAriaLabel ?? closeLabel ?? 'Lukk';
    } else {
      return openAriaLabel ?? openLabel ?? 'Åpne';
    }
  };

  const getIconSize = (size: AccordionSize): string => {
    if (size === 'small') {
      return 'xs';
    } else if (size === 'medium') {
      return 'sm';
    } else {
      return 'md';
    }
  };

  const onTransitionEnd = () => {
    if (isOpenState) {
      setContentHeight('auto');
    } else if (type === 'normal') {
      setVisibility('hidden');
    }
  };

  return (
    <AccordionArea
      className={className}
      style={inlineStyle}
      data-testid="accordion-area"
      isOverflow={type === 'overflow'}
      normalSpacing={spacingAboveContent}
      overflowSpacing={spacingBelowContent}
      ref={accordionRef}
      {...rest}
    >
      <AccordionButtonArea labelPosition={labelPosition}>
        <AccordionButton
          aria-expanded={isOpenState}
          accordionType={type}
          isFullWidth={isFullWidth}
          isOpenState={isOpenState}
          onClick={() => handleOnClick()}
          onMouseEnter={() => setIsHoveringButton(true)}
          onMouseLeave={() => setIsHoveringButton(false)}
          aria-label={decideButtonAriaLabel()}
          reverseLayout={isStartAligned && !isFullWidth}
        >
          <AccordionLabel hasLabel={type !== 'single'} isFullWidth={isFullWidth}>
            {isOpenState ? (
              <AccordionLabelText
                size={size}
                typography={typography}
                isFullWidth={isFullWidth}
                hasDetailText={!!openDetailText || !!closeDetailText}
                ref={closeLabelRef}
              >
                {closeLabel}
              </AccordionLabelText>
            ) : (
              <AccordionLabelText
                size={size}
                typography={typography}
                isFullWidth={isFullWidth}
                hasDetailText={!!openDetailText || !!closeDetailText}
                ref={openLabelRef}
              >
                {openLabel}
              </AccordionLabelText>
            )}
            <AccordionDetailText size={size} openDetailText={openDetailText}>
              {!isOpenState ? openDetailText : closeDetailText}
            </AccordionDetailText>
          </AccordionLabel>
          <StyledIconWrapper
            icon={isHoveringButton || isHovering ? expandCircleFilledColor : expandCircleColor}
            size={getIconSize(size)}
          />
        </AccordionButton>
      </AccordionButtonArea>
      {type !== 'single' && (
        <AccordionHeightAnimator
          contentHeight={slotContentHeight}
          isOpen={isOpenState}
          isOverflow={type === 'overflow'}
          onTransitionEnd={onTransitionEnd}
          style={{ visibility: visibility, height: contentHeight }}
        >
          <AccordionContent ref={accordionContentRef}>{content}</AccordionContent>
        </AccordionHeightAnimator>
      )}
    </AccordionArea>
  );
};
