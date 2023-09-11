import React, { FC, useEffect, useRef, useState } from 'react';
import type { PopoverProps } from './elviaPopover.types';
import { mapPositionToHorizontalPosition } from './mapPosition';
import {
  CloseButtonContainer,
  Heading,
  PopoverContainer,
  PopoverTypography,
  TriggerContainer,
  PopoverContent,
} from './styledComponents';
import { config } from './config';
import {
  Overlay,
  IconButton,
  outlineListener,
  useConnectedOverlay,
  useFocusTrap,
  useSlot,
  warnDeprecatedProps,
  IconWrapper,
} from '@elvia/elvis-toolbox';
import closeBold from '@elvia/elvis-assets-icons/dist/icons/closeBold';

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
  const [fadeOut, setFadeOut] = useState(false);

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

    trapFocus(popoverRef);
    updatePreferredPosition();
  };

  const handleOnClose = () => {
    onClose?.();
    webcomponent?.triggerEvent('onClose');

    releaseFocusTrap();
  };

  const toggleVisibility = (): void => {
    if (isShowingConnectedOverlayState) {
      setFadeOut(true);
    } else {
      setFadeOut(false);
      setIsShowingConnectedOverlayState(true);
    }
  };

  //does not work on slots
  const isStringOnly = (value: any) => typeof value === 'string';

  return (
    <PopoverContainer ref={popoverContainerRef} {...rest}>
      <TriggerContainer
        onClick={toggleVisibility}
        $overlayIsOpen={isShowingConnectedOverlayState}
        ref={triggerRef}
      >
        {trigger}
      </TriggerContainer>

      {isShowingConnectedOverlayState && (
        <Overlay
          ref={popoverRef}
          onClose={() => setIsShowingConnectedOverlayState(false)}
          startFade={fadeOut}
        >
          <PopoverContent
            className={className}
            style={inlineStyle}
            aria-modal="true"
            data-testid="popover"
            role="dialog"
            aria-labelledby={heading ? 'ewc-popover-heading' : undefined}
            aria-describedby={content ? 'ewc-popover-content' : undefined}
          >
            {hasCloseButton && (
              <CloseButtonContainer>
                <IconButton $size="sm" onClick={toggleVisibility} aria-label="Lukk">
                  <IconWrapper icon={closeBold} size="xs" />
                </IconButton>
              </CloseButtonContainer>
            )}
            {heading && <Heading>{heading}</Heading>}

            <PopoverTypography
              $isStringOnly={isStringOnly(content)}
              $hasCloseButton={hasCloseButton}
              ref={contentRef}
            >
              {content}
            </PopoverTypography>
          </PopoverContent>
        </Overlay>
      )}
    </PopoverContainer>
  );
};

export default Popover;
