import React, { FC, useState, useEffect, useRef, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { Icon } from '@elvia/elvis-icon/react';
import { PopoverStyles } from './styledComponents';
import { config } from './config';
import {
  outlineListener,
  useConnectedOverlay,
  useFocusTrap,
  warnDeprecatedProps,
} from '@elvia/elvis-toolbox';

export interface PopoverProps {
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `heading`.
   */
  header?: string;
  heading?: string;
  content?: string | JSX.Element;
  type?: 'informative' | 'list';
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `isSelectable`.
   */
  selectable?: boolean;
  isSelectable?: boolean;
  hasDivider?: boolean;
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `horizontalPosition`.
   */
  posX?: 'left' | 'right' | 'center';
  horizontalPosition?: 'left' | 'left-inside' | 'center' | 'right-inside' | 'right';
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `verticalPosition`.
   */
  posY?: 'top' | 'bottom';
  verticalPosition?: 'top' | 'top-inside' | 'center' | 'bottom-inside' | 'bottom';

  trigger?: JSX.Element;
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by 'hasCloseButton'.
   */
  hasCloseBtn?: boolean;
  hasCloseButton?: boolean;
  isShowing?: boolean;
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by 'onOpen' & 'onClose'
   */
  isShowingOnChange?: (isShowing: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  disableAutoClose?: boolean;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

const Popover: FC<PopoverProps> = function ({
  heading,
  content,
  type = 'informative',
  isSelectable = false,
  hasDivider = false,
  horizontalPosition = type === 'list' ? 'left-inside' : 'center',
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

  const popoverBackdropRef = useRef<HTMLDivElement>(null);
  const popoverClassContainerRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLDivElement>(null);
  const popoverText = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);

  const { isShowing: isShowingConnectedOverlayState, setIsShowing: setIsShowingConnectedOverlayState } =
    useConnectedOverlay(popoverTriggerRef, popoverContentRef, {
      horizontalPosition: horizontalPosition,
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
  }, [webcomponent, type]);

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

    return () => {
      removeEventListeners();
    };
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
    setIsShowingConnectedOverlayState((previousIsShowingState) => !previousIsShowingState);

  const onEscape = (keydown: KeyboardEvent) => {
    if (keydown.key === 'Escape') {
      setIsShowingConnectedOverlayState(false);
    }
  };

  const popoverClasses = classnames('ewc-popover', {
    ['ewc-popover--hide']: !isShowingConnectedOverlayState,
    ['ewc-popover--text-only']: typeof content === 'string',
    ['ewc-popover--list']: type === 'list',
    ['ewc-popover--list-divider']: type === 'list' && hasDivider,
    ['ewc-popover--list-selectable']: isSelectable,
  });

  return (
    <PopoverStyles
      className={className ? className : ''}
      style={inlineStyle}
      ref={popoverRef}
      data-testid="popover-wrapper"
      role="dialog"
      {...rest}
    >
      <div ref={popoverClassContainerRef} className={popoverClasses} data-testid="popover-container">
        <div className="ewc-popover__trigger" ref={popoverTriggerRef}>
          {trigger && (
            <div onClick={togglePopover} data-testid="popover-trigger">
              {trigger}
            </div>
          )}
          {!trigger && <div onClick={togglePopover} ref={popoverSlotTriggerRef}></div>}
        </div>
        <div className="ewc-popover__backdrop" ref={popoverBackdropRef}></div>
        {createPortal(
          <PopoverStyles
            className={className ? className : ''}
            style={inlineStyle}
            ref={popoverRef}
            data-testid="popover-wrapper"
            role="dialog"
            {...rest}
          >
            <div className={popoverClasses}>
              <div className="ewc-popover__content" ref={popoverContentRef} aria-modal="true">
                {type === 'informative' && (
                  <div className="ewc-popover__content-area">
                    {hasCloseButton === true && (
                      <div className="ewc-popover__close">
                        <button
                          className="ewc-btn ewc-btn--icon ewc-btn--sm"
                          onClick={() => setIsShowingConnectedOverlayState(false)}
                          type="button"
                          data-testid="popover-close-btn"
                          aria-label="Lukk"
                        >
                          <Icon name="closeBold" size="xs" />
                        </button>
                      </div>
                    )}
                    {heading && (
                      <h3 className="ewc-popover__header" data-testid="popover-header">
                        {heading}
                      </h3>
                    )}
                  </div>
                )}
                {content && type === 'informative' && (
                  <div className="ewc-popover__text" data-testid="popover-text">
                    {content}
                  </div>
                )}
                {!content && type === 'informative' && (
                  <div className="ewc-popover__text" ref={popoverText} />
                )}
                {content && type === 'list' && (
                  <div
                    className="ewc-popover__text"
                    data-testid="popover-text"
                    onClick={() => !disableAutoClose && setIsShowingConnectedOverlayState(false)}
                  >
                    {content}
                  </div>
                )}
                {!content && type === 'list' && (
                  <div
                    className="ewc-popover__text"
                    onClick={() => !disableAutoClose && setIsShowingConnectedOverlayState(false)}
                    ref={popoverText}
                  />
                )}
              </div>
            </div>
          </PopoverStyles>,
          document.body,
        )}
      </div>
    </PopoverStyles>
  );
};

export default Popover;
