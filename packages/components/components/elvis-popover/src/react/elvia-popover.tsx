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
  PopoverList,
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

  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  /* **NB**: `type` is in the useEffectDependencies because this component has slots that depend on the type. */
  useSlot('content', webcomponent, { ref: contentRef, useEffectDependencies: [type] });
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
  }, [isShowingConnectedOverlayState, content, type, horizontalPosition, verticalPosition, heading]);

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
    if (!webcomponent && onOpen) {
      onOpen();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onOpen');
    }

    document.addEventListener('keydown', onEscape);
    trapFocus(popoverRef);
    updatePreferredPosition();
  };

  const handleOnClose = () => {
    if (!webcomponent && onClose) {
      onClose();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onClose');
    }

    document.removeEventListener('keydown', onEscape, false);
    releaseFocusTrap();
  };

  const togglePopover = () => setIsShowingConnectedOverlayState(!isShowingConnectedOverlayState);

  const onEscape = (keydown: KeyboardEvent) =>
    keydown.key === 'Escape' && setIsShowingConnectedOverlayState(false);

  //does not work on slots
  const isStringOnly = (value: any) => typeof value === 'string';

  return (
    <PopoverContainer ref={popoverContainerRef} role="dialog" {...rest}>
      <TriggerContainer
        onClick={togglePopover}
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
              type={type}
              ref={popoverRef}
              aria-modal="true"
              data-testid="popover-content"
            >
              {type === 'informative' && (
                <>
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
                </>
              )}
              {content && type === 'informative' && (
                <PopoverTypography isStringOnly={isStringOnly(content)} hasCloseButton={hasCloseButton}>
                  {content}
                </PopoverTypography>
              )}
              {!content && type === 'informative' && (
                <PopoverTypography
                  isStringOnly={isStringOnly(content)}
                  hasCloseButton={hasCloseButton}
                  ref={contentRef}
                ></PopoverTypography>
              )}
              {content && type === 'list' && (
                <PopoverTypography
                  isStringOnly={isStringOnly(content)}
                  hasCloseButton={hasCloseButton}
                  onClick={() => !disableAutoClose && setIsShowingConnectedOverlayState(false)}
                >
                  <PopoverList hasDivider={hasDivider} isSelectable={isSelectable}>
                    {content}
                  </PopoverList>
                </PopoverTypography>
              )}
              {!content && type === 'list' && (
                <PopoverList hasDivider={hasDivider} isSelectable={isSelectable}>
                  <PopoverTypography
                    isStringOnly={isStringOnly(content)}
                    hasCloseButton={hasCloseButton}
                    onClick={() => !disableAutoClose && setIsShowingConnectedOverlayState(false)}
                    ref={contentRef}
                  ></PopoverTypography>
                </PopoverList>
              )}
            </PopoverContent>
          </>,
          document.body,
        )}
    </PopoverContainer>
  );
};

export default Popover;
