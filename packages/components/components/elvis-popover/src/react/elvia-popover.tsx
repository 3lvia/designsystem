import closeBold from '@elvia/elvis-assets-icons/dist/icons/closeBold';
import { IconButton, IconWrapper, useLanguage, useSlot } from '@elvia/elvis-toolbox';
import {
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react';
import React, { type FC, useEffect, useMemo, useRef, useState } from 'react';

import { type PopoverProps } from './elviaPopover.types';
import { mapPosition } from './mapPosition';
import {
  CloseButtonContainer,
  Heading,
  PopoverContent,
  PopoverTypography,
  TriggerContainer,
} from './styledComponents';
import { useCloseOnEsc } from './useCloseOnEsc';
import { useFocusTrap } from './useFocusTrap';

export const Popover: FC<PopoverProps> = function ({
  heading,
  content,
  horizontalPosition = 'center',
  verticalPosition = 'top',
  trigger,
  display = 'flex',
  hasCloseButton = true,
  isShowing = false,
  noPadding = false,
  onOpen,
  onClose,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(isShowing);

  const lang = useLanguage();

  const getCloseAriaLabel = (): string => {
    return lang === 'no' ? 'Lukk' : 'Close';
  };

  const { refs, floatingStyles, context, placement } = useFloating({
    placement: mapPosition(verticalPosition, horizontalPosition),
    open: isOpen,
    onOpenChange: setIsOpen,
    elements: {
      reference: triggerRef.current,
    },
    middleware: [offset({ mainAxis: 8 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 300,
    common: {
      transformOrigin: placement.includes('top') ? 'bottom' : 'top',
      transitionTimingFunction: 'ease',
      zIndex: 99999,
      maxWidth: 'calc(100% - 16px)',
    },
    initial: {
      opacity: 0,
      transform: 'scaleY(.9)',
    },
    close: {
      opacity: 0,
      transform: 'scaleY(.9)',
    },
    open: {
      opacity: 1,
      transform: 'scaleY(1)',
    },
  });

  useSlot('trigger', webcomponent, { ref: triggerRef });
  useSlot('content', webcomponent, {
    ref: contentRef,
    useEffectDependencies: useMemo(() => [contentRef.current], [contentRef.current]),
  });

  /* Synchronize the isShowing prop and the isOpen state */
  useEffect(() => {
    if (isShowing !== isOpen) {
      setIsOpen(isShowing);
    }
  }, [isShowing]);

  const handleOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');
  };

  const handleOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');
  };

  const toggleVisibility = () => {
    if (isOpen) {
      setIsOpen(false);
      handleOnClose();
    } else {
      setIsOpen(true);
      handleOnOpen();
    }
  };

  useCloseOnEsc({ isOpen, setIsOpen, handleOnClose });
  useFocusTrap(refs.floating, isOpen);

  //does not work on slots
  const isStringOnly = (value: any) => typeof value === 'string';

  return (
    <>
      <TriggerContainer
        onClick={toggleVisibility}
        overlayIsOpen={isOpen}
        ref={triggerRef}
        style={{ display }}
        {...rest}
      >
        {trigger}
      </TriggerContainer>

      {isMounted && (
        <FloatingPortal preserveTabOrder={false}>
          <FloatingOverlay onClick={toggleVisibility} />
          <div style={{ ...floatingStyles, ...transitionStyles }} ref={refs.setFloating}>
            <PopoverContent
              className={className}
              style={inlineStyle}
              noPadding={noPadding}
              aria-modal="true"
              data-testid="popover"
              role="dialog"
              aria-labelledby={heading ? 'ewc-popover-heading' : undefined}
              aria-describedby={content ? 'ewc-popover-content' : undefined}
            >
              {hasCloseButton && (
                <CloseButtonContainer>
                  <IconButton size="sm" onClick={toggleVisibility} aria-label={getCloseAriaLabel()}>
                    <IconWrapper icon={closeBold} size="xs" />
                  </IconButton>
                </CloseButtonContainer>
              )}
              {heading && <Heading id="ewc-popover-heading">{heading}</Heading>}

              <PopoverTypography
                isStringOnly={isStringOnly(content)}
                hasCloseButton={hasCloseButton}
                ref={contentRef}
                id="ewc-popover-content"
              >
                {content}
              </PopoverTypography>
            </PopoverContent>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Popover;
