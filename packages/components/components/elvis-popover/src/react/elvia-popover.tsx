import React, { FC, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@elvia/elvis-icon/react';
import type { PopoverProps } from './elviaPopover.types';
import { mapPositionToHorizontalPosition } from './mapPosition';
import {
  Backdrop,
  CloseButtonContainer,
  Heading,
  PopoverContainer,
  PopoverList,
  PopoverTypography,
  TriggerContainer,
  PopoperContent,
} from './styledComponents';
import { config } from './config';
import {
  outlineListener,
  useConnectedOverlay,
  useFocusTrap,
  warnDeprecatedProps,
  IconButton,
} from '@elvia/elvis-toolbox';

const Popover: FC<PopoverProps> = function ({
  heading,
  content,
  type = 'informative',
  isSelectable = false,
  hasDivider = false,
  horizontalPosition = type === 'list' ? 'left' : 'center',
  verticalPosition = type === 'list' ? 'bottom' : 'top',
  trigger,
  hasCloseButton = true,
  isShowing = false,
  onOpen,
  onClose,
  disableAutoClose = false,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);

  const popoverClassContainerRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLDivElement>(null);
  const popoverText = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);

  const {
    isShowing: isShowingConnectedOverlayState,
    setIsShowing: setIsShowingConnectedOverlayState,
    updatePreferredPosition,
  } = useConnectedOverlay(popoverTriggerRef, popoverContentRef, {
    horizontalPosition: mapPositionToHorizontalPosition(horizontalPosition),
    verticalPosition: verticalPosition,
    alignWidths: false,
  });
  const [hasBeenInitiated, setHasBeenInitiated] = useState(isShowing);
  const { trapFocus, releaseFocusTrap } = useFocusTrap();

  /** Start outline listener */
  useEffect(() => {
    outlineListener(popoverRef.current);
    return () => {
      outlineListener(popoverRef.current, true);
    };
  }, []);

  /* Saving the original focused element before the popover is opened, and then returning focus to that
  element when the popover is closed. */
  useEffect(() => {
    const originalFocusedElement = document.activeElement as HTMLElement;
    return () => {
      originalFocusedElement && originalFocusedElement.focus();
    };
  }, [isShowingConnectedOverlayState]);

  /** Get all slots and place them correctly.
   * **NB**: `type` is in the dependency list because this component has slots that depend on the type.
   * Heading is a in the dependency array because it is extreamly slow to load, and the position needs to be updated once it is loaded.
   */
  useEffect(() => {
    if (!webcomponent) {
      trapFocus(popoverContentRef);
      return;
    }

    if (popoverSlotTriggerRef.current && webcomponent.getSlot('trigger')) {
      popoverSlotTriggerRef.current.innerHTML = '';
      popoverSlotTriggerRef.current.appendChild(webcomponent.getSlot('trigger'));
    }

    if (popoverText.current && webcomponent.getSlot('content')) {
      popoverText.current.innerHTML = '';
      popoverText.current.appendChild(webcomponent.getSlot('content'));
    }

    updatePreferredPosition();
  }, [webcomponent, type, isShowingConnectedOverlayState, heading]);

  /**
   * Dispatch onOpen and onClose events.
   * Start resize, scroll, click outside and escape listeners if opened
   */
  useEffect(() => {
    if (isShowingConnectedOverlayState && hasBeenInitiated) {
      handleOnOpen();
      startEventListeners();
    } else if (!isShowingConnectedOverlayState && hasBeenInitiated) {
      handleOnClose();
    }

    return () => removeEventListeners();
  }, [isShowingConnectedOverlayState]);

  useEffect(() => {
    if (!hasBeenInitiated) {
      setHasBeenInitiated(true);
    }
  }, [isShowing]);

  const startEventListeners = () => {
    document.addEventListener('keydown', onEscape, false);
    popoverBackdropRef.current?.addEventListener('click', () => {
      setIsShowingConnectedOverlayState(false);
    });
  };

  const removeEventListeners = () => {
    document.removeEventListener('keydown', onEscape, false);
    popoverBackdropRef.current?.removeEventListener('click', () => {
      setIsShowingConnectedOverlayState(false);
    });
  };

  const handleOnOpen = () => {
    if (!webcomponent && onOpen) {
      onOpen();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onOpen');
    }
    trapFocus(popoverContentRef);
    updatePreferredPosition();
  };

  const handleOnClose = () => {
    if (!webcomponent && onClose) {
      onClose();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onClose');
    }
    releaseFocusTrap();
  };

  const togglePopover = (): void =>
    setIsShowingConnectedOverlayState((previousIsShowingState: boolean) => !previousIsShowingState);

  const onEscape = (keydown: KeyboardEvent) => {
    if (keydown.key === 'Escape') {
      setIsShowingConnectedOverlayState(false);
    }
  };

  return (
    <div
      className={className ? className : ''}
      style={inlineStyle}
      ref={popoverRef}
      data-testid="popover-wrapper"
      role="dialog"
      {...rest}
    >
      <PopoverContainer ref={popoverClassContainerRef} data-testid="popover-container">
        {isShowingConnectedOverlayState && (
          <Backdrop onClick={() => setIsShowingConnectedOverlayState(false)}></Backdrop>
        )}

        <TriggerContainer overlayIsOpen={isShowingConnectedOverlayState} ref={popoverTriggerRef}>
          {trigger && (
            <div onClick={togglePopover} data-testid="popover-trigger">
              {trigger}
            </div>
          )}
          {!trigger && <div onClick={togglePopover} ref={popoverSlotTriggerRef}></div>}
        </TriggerContainer>

        {isShowingConnectedOverlayState &&
          createPortal(
            <PopoperContent type={type} ref={popoverContentRef} aria-modal="true">
              {type === 'informative' && (
                <>
                  {hasCloseButton && (
                    <CloseButtonContainer>
                      <IconButton
                        size="sm"
                        onClick={() => setIsShowingConnectedOverlayState(false)}
                        data-testid="popover-close-btn"
                        aria-label="Lukk"
                      >
                        <Icon name="closeBold" size="xs" />
                      </IconButton>
                    </CloseButtonContainer>
                  )}
                  {heading && <Heading data-testid="popover-header">{heading}</Heading>}
                </>
              )}
              {content && type === 'informative' && (
                <PopoverTypography data-testid="popover-text">{content}</PopoverTypography>
              )}
              {!content && type === 'informative' && <PopoverTypography ref={popoverText} />}
              {content && type === 'list' && (
                <PopoverTypography
                  data-testid="popover-text"
                  onClick={() => !disableAutoClose && setIsShowingConnectedOverlayState(false)}
                >
                  <PopoverList>{content}</PopoverList>
                </PopoverTypography>
              )}
              {!content && type === 'list' && (
                <PopoverList hasDivider={hasDivider} isSelectable={isSelectable}>
                  <PopoverTypography
                    data-testid="popover-text"
                    onClick={() => !disableAutoClose && setIsShowingConnectedOverlayState(false)}
                    ref={popoverText}
                  />
                </PopoverList>
              )}
            </PopoperContent>,
            document.body,
          )}
      </PopoverContainer>
    </div>
  );
};

export default Popover;
