import React, { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@elvia/elvis-icon/react';
import type { PopoverProps } from './elviaPopover.types';
import { mapPositionToHorizontalPosition } from './mapPosition';
import {
  Backdrop,
  CloseButtonContainer,
  Heading,
  PopoverContainer,
  PopoverTypography,
  TriggerContainer,
  PopoverContent,
} from './styledComponents';
import { config } from './config';
import {
  IconButton,
  outlineListener,
  useConnectedOverlay,
  useFocusTrap,
  useSlot,
  warnDeprecatedProps,
} from '@elvia/elvis-toolbox';

const Popover: FC<PopoverProps> = function ({
  heading,
  content,
  horizontalPosition = 'center',
  verticalPosition = 'top',
  trigger,
  hasCloseButton = true,
  isShowing = false,
  onOpen,
  onClose,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);

  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useSlot('trigger', webcomponent, { ref: triggerRef });

  const {
    isShowing: isShowingConnectedOverlayState,
    setIsShowing: setIsShowingConnectedOverlayState,
    updatePreferredPosition,
  } = useConnectedOverlay(triggerRef, popoverRef, {
    horizontalPosition: mapPositionToHorizontalPosition(horizontalPosition),
    verticalPosition: verticalPosition,
    alignWidths: false,
  });

  useSlot('content', webcomponent, {
    ref: contentRef,
    useEffectDependencies: [isShowingConnectedOverlayState],
  });

  const { trapFocus, releaseFocusTrap } = useFocusTrap();

  /** Start outline listener */
  useEffect(() => {
    outlineListener(popoverContainerRef.current);
    return () => {
      outlineListener(popoverContainerRef.current, true);
    };
  }, []);

  /* Synchronize the isShowing prop and the setIsShowingConnectedOverlayState */
  useEffect(() => {
    if (isShowing !== isShowingConnectedOverlayState) {
      setIsShowingConnectedOverlayState(isShowing);
    }
  }, [isShowing]);

  /* Saving the original focused element before the popover is opened, and then returning focus to that
  element when the popover is closed. */
  useEffect(() => {
    const originalFocusedElement = document.activeElement as HTMLElement;
    return () => {
      originalFocusedElement && originalFocusedElement.focus();
    };
  }, [isShowingConnectedOverlayState]);

  useEffect(() => {
    updatePreferredPosition();
  }, [isShowingConnectedOverlayState, content, horizontalPosition, verticalPosition, heading]);

  /**
   * Dispatch onOpen and onClose events.
   */
  useEffect(() => {
    if (isShowingConnectedOverlayState) {
      handleOnOpen();
    } else if (!isShowingConnectedOverlayState) {
      handleOnClose();
    }
  }, [isShowingConnectedOverlayState]);

  const handleOnOpen = () => {
    onOpen?.();
    webcomponent?.triggerEvent('onOpen');

    document.addEventListener('keydown', onEscape);
    trapFocus(popoverRef);
    updatePreferredPosition();
  };

  const handleOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');

    document.removeEventListener('keydown', onEscape, false);
    releaseFocusTrap();
  };

  const onEscape = (keydown: KeyboardEvent) =>
    keydown.key === 'Escape' && setIsShowingConnectedOverlayState(false);

  //does not work on slots
  const isStringOnly = (value: any) => typeof value === 'string';

  return (
    <PopoverContainer ref={popoverContainerRef} role="dialog" {...rest}>
      <TriggerContainer
        onClick={() => setIsShowingConnectedOverlayState(!isShowingConnectedOverlayState)}
        overlayIsOpen={isShowingConnectedOverlayState}
        ref={triggerRef}
      >
        {trigger}
      </TriggerContainer>

      {isShowingConnectedOverlayState &&
        createPortal(
          <>
            <Backdrop onClick={() => setIsShowingConnectedOverlayState(false)}></Backdrop>
            <PopoverContent
              className={className ?? ''}
              style={{ ...inlineStyle }}
              ref={popoverRef}
              aria-modal="true"
              data-testid="popover-content"
            >
              {hasCloseButton && (
                <CloseButtonContainer>
                  <IconButton
                    size="sm"
                    onClick={() => setIsShowingConnectedOverlayState(false)}
                    aria-label="Lukk"
                  >
                    <Icon name="closeBold" size="xs" />
                  </IconButton>
                </CloseButtonContainer>
              )}
              {heading && <Heading>{heading}</Heading>}

              <PopoverTypography
                isStringOnly={isStringOnly(content)}
                hasCloseButton={hasCloseButton}
                ref={contentRef}
              >
                {content}
              </PopoverTypography>
            </PopoverContent>
          </>,
          document.body,
        )}
    </PopoverContainer>
  );
};

export default Popover;
