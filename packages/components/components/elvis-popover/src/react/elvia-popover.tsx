import React, { FC, useState, useEffect, useRef, useCallback, CSSProperties } from 'react';
import './style.scss';
import classnames from 'classnames';
import { Icon } from '@elvia/elvis-icon/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import toolbox, { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import { config } from './config';

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
  horizontalPosition?: 'left' | 'right' | 'center';
  /**
   * @deprecated Deprecated in version 5.0.0. Replaced by `verticalPosition`.
   */
  posY?: 'top' | 'bottom';
  verticalPosition?: 'top' | 'bottom';

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
  horizontalPosition = type === 'list' ? 'right' : 'center',
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
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(config, arguments[0]);

  const POPOVER_MARGIN = 16;
  const POPOVER_PADDING = 32;

  const [isShowingState, setIsShowingState] = useState(isShowing);
  const [hasBeenInitiated, setHasBeenInitiated] = useState(isShowing);
  const maxContentWidth = useRef(0);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverClassContainerRef = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverText = useRef<HTMLDivElement>(null);
  const popoverBackdropRef = useRef<HTMLDivElement>(null);
  const popoverFixedAreaRef = useRef<HTMLDivElement>(null);

  /** Start outline listener */
  useEffect(() => {
    toolbox.outlineListener(popoverRef.current);
    return () => {
      toolbox.outlineListener(popoverRef.current, true);
    };
  }, []);

  /** Define max possible width for the popover */
  useEffect(() => {
    if (popoverContentRef.current) {
      maxContentWidth.current = popoverContentRef.current.getBoundingClientRect().width;
    }
  });

  /** Get all slots and place them correctly.
   * **NB**: `type` is in the dependency list because this component has slots that depend on the type.
   */
  useEffect(() => {
    if (!webcomponent) {
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
    if (isShowingState && hasBeenInitiated) {
      handleOnOpen();
      startEventListeners();
    } else if (!isShowingState && hasBeenInitiated) {
      handleOnClose();
      removeEventListeners();
    }

    return () => {
      removeFixedAreaStyles();
      removeEventListeners();
    };
  }, [isShowingState]);

  useEffect(() => {
    if (!hasBeenInitiated) {
      setHasBeenInitiated(true);
      return;
    }
    setIsShowingState(isShowing);
  }, [isShowing]);

  const startEventListeners = () => {
    window.addEventListener('resize', onResize);
    document.addEventListener('scroll', onScroll);
    document.addEventListener('keydown', onEscape, false);
    if (popoverBackdropRef.current) {
      popoverBackdropRef.current.addEventListener('click', onClickOutside);
    }
  };
  const removeEventListeners = () => {
    window.removeEventListener('resize', onResize);
    document.removeEventListener('scroll', onScroll);
    document.removeEventListener('keydown', onEscape, false);
    if (popoverBackdropRef.current) {
      popoverBackdropRef.current.removeEventListener('click', onClickOutside);
    }
  };

  const handleOnOpen = () => {
    resizePopoverToFitScreen();
    resolveHorizontalPosition();
    resolveVerticalPosition();

    if (!webcomponent && onOpen) {
      onOpen();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onOpen');
    }
  };

  const handleOnClose = () => {
    removeFixedAreaStyles();

    if (!webcomponent && onClose) {
      onClose();
    } else if (webcomponent) {
      webcomponent.triggerEvent('onClose');
    }
  };

  const togglePopover = (): void => {
    setIsShowingState((previousIsShowingState) => !previousIsShowingState);
  };

  const updateVerticalFixedAreaPosition = () => {
    if (popoverFixedAreaRef.current && popoverTriggerRef.current) {
      popoverFixedAreaRef.current.style.top = popoverTriggerRef.current.getBoundingClientRect().top + 'px';
    }
  };

  // Placement of popover should:
  // Find available place when opened both vertically and horizontally (if there is not room at horizontalPosition and verticalPosition)
  // Should not move when scrolling or resizing window vertically
  // Should change size and position when resizing horizontally

  /** Initializing horizontal position */
  const setInitialPosition = useCallback(() => {
    if (horizontalPosition === 'left') {
      updateHorizontalPositionStyle('none', '0', 'auto');
    } else if (horizontalPosition === 'right') {
      updateHorizontalPositionStyle('none', 'auto', '0');
    } else {
      updateHorizontalPositionStyle('translateX(-50%)', 'auto', '50%');
    }
  }, [horizontalPosition]);

  /** Set the styling for the current position with the style attributes */
  const updateHorizontalPositionStyle = (transform: string, right: string, left: string): void => {
    if (!popoverContentRef.current) {
      return;
    }
    popoverContentRef.current.style.transform = transform;
    popoverContentRef.current.style.right = right;
    popoverContentRef.current.style.left = left;
  };
  const updateVerticalPositionStyle = (top: string, bottom: string): void => {
    if (!popoverContentRef.current) {
      return;
    }
    popoverContentRef.current.style.top = top;
    popoverContentRef.current.style.bottom = bottom;
  };

  /** Get current width of scrollbar if visible */
  const getScrollbarWidth = (): number => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  /** Get screen dimensions based on device */
  const getScreenDimensions = (): { screenHeight: number; screenWidth: number } | null => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return null;
    }
    if (navigator.userAgent.toLowerCase().includes('android')) {
      return { screenHeight: window.visualViewport.height, screenWidth: window.visualViewport.width };
    } else {
      return { screenHeight: window.innerHeight, screenWidth: window.innerWidth };
    }
  };

  /** ... */
  const getPopoverPosition = (): {
    contentWidth: number;
    triggerWidth: number;
    triggerOffsetLeft: number;
    triggerOffsetRight: number;
    triggerOffsetTop: number;
    contentOffsetTop: number;
    contentOffsetBottom: number;
    contentSpace: number;
    triggerSpace: number;
  } | null => {
    const screenDimensions = getScreenDimensions();
    if (!popoverContentRef.current || !popoverTriggerRef.current || screenDimensions === null) {
      return null;
    }
    const contentWidth = popoverContentRef.current.getBoundingClientRect().width;
    const contentHeight = popoverContentRef.current.getBoundingClientRect().height;
    const triggerWidth = popoverTriggerRef.current.getBoundingClientRect().width;
    const triggerHeight = popoverTriggerRef.current.getBoundingClientRect().height;
    const triggerOffsetLeft = popoverTriggerRef.current.getBoundingClientRect().left;
    const triggerOffsetTop = popoverTriggerRef.current.getBoundingClientRect().top;
    const triggerOffsetRight = screenDimensions.screenWidth - triggerWidth - triggerOffsetLeft;
    const contentOffsetTop = popoverContentRef.current.getBoundingClientRect().top;
    const contentOffsetBottom =
      screenDimensions.screenHeight - contentHeight - triggerOffsetTop - triggerHeight - POPOVER_MARGIN;

    const contentSpace = horizontalPosition === 'center' ? contentWidth / 2 : contentWidth;
    const triggerSpace = horizontalPosition === 'center' ? triggerWidth / 2 : triggerWidth;

    return {
      contentWidth: contentWidth,
      triggerWidth: triggerWidth,
      triggerOffsetLeft: triggerOffsetLeft,
      triggerOffsetRight: triggerOffsetRight,
      triggerOffsetTop: triggerOffsetTop,
      contentOffsetTop: contentOffsetTop,
      contentOffsetBottom: contentOffsetBottom,
      contentSpace: contentSpace,
      triggerSpace: triggerSpace,
    };
  };

  const hasConflictRight = (): boolean => {
    const popoverPosition = getPopoverPosition();
    if (popoverPosition === null) {
      return false;
    }
    const popoverMinSpaceLeft = popoverPosition.contentSpace + POPOVER_MARGIN;
    const popoverActualSpace = popoverPosition.triggerSpace + popoverPosition.triggerOffsetRight;
    return popoverMinSpaceLeft >= popoverActualSpace;
  };
  const hasConflictLeft = (): boolean => {
    const popoverPosition = getPopoverPosition();
    if (popoverPosition === null) {
      return false;
    }
    const popoverMinSpace = popoverPosition.contentSpace + POPOVER_MARGIN;
    const popoverActualSpace = popoverPosition.triggerSpace + popoverPosition.triggerOffsetLeft;
    return popoverMinSpace >= popoverActualSpace;
  };

  const hasConflictTop = (): boolean => {
    const popoverPosition = getPopoverPosition();
    if (popoverPosition === null) {
      return false;
    }
    return popoverPosition.contentOffsetTop < POPOVER_MARGIN;
  };
  const hasConflictBottom = (): boolean => {
    const popoverPosition = getPopoverPosition();
    if (popoverPosition === null) {
      return false;
    }
    const isRoomBottom = popoverPosition.contentOffsetBottom > POPOVER_MARGIN;
    return !isRoomBottom;
  };

  /** Resolves horizontal position conflicts by setting right and left style properties */
  const resolveHorizontalPosition = (): void => {
    const popoverPosition = getPopoverPosition();
    if (popoverPosition === null) {
      return;
    }
    if (horizontalPosition !== 'right' && hasConflictLeft()) {
      const offsetLeft = -popoverPosition.triggerOffsetLeft + POPOVER_MARGIN + 'px';
      updateHorizontalPositionStyle('none', 'auto', offsetLeft);
    } else if (horizontalPosition !== 'left' && hasConflictRight()) {
      const offsetRight = -popoverPosition.triggerOffsetRight + POPOVER_MARGIN + getScrollbarWidth() + 'px';
      updateHorizontalPositionStyle('none', offsetRight, 'auto');
    } else {
      setInitialPosition();
    }
  };

  /** Resolves vertical position conflicts by defining top and bottom style attributes */
  const resolveVerticalPosition = (): void => {
    if (
      !popoverContentRef.current ||
      !popoverTriggerRef.current ||
      !popoverClassContainerRef ||
      !popoverClassContainerRef.current
    ) {
      return;
    }
    if ((verticalPosition === 'bottom' && !hasConflictBottom()) || hasConflictTop()) {
      const offsetTop = popoverTriggerRef.current.getBoundingClientRect().height + POPOVER_MARGIN + 'px';
      updateVerticalPositionStyle(offsetTop, 'auto');
    } else if ((verticalPosition === 'top' && !hasConflictTop()) || hasConflictBottom()) {
      const offsetBottom = popoverTriggerRef.current.getBoundingClientRect().height + 'px';
      updateVerticalPositionStyle('auto', offsetBottom);
    }
  };

  /** Resize the popover based on the content of the popover and the current available dimensions (screen size) */
  const resizePopoverToFitScreen = (): void => {
    const dimensions = getScreenDimensions();
    defineFixedArea();
    if (!popoverContentRef.current || !maxContentWidth.current || dimensions === null) {
      return;
    }
    const { screenWidth } = dimensions;
    if (maxContentWidth.current + (POPOVER_MARGIN * 2 + POPOVER_PADDING * 2) > screenWidth) {
      popoverContentRef.current.style.width = `${screenWidth - (POPOVER_MARGIN * 2 + POPOVER_PADDING * 2)}px`;
    } else {
      popoverContentRef.current.style.width = `${maxContentWidth}px`;
    }
  };

  /** Get trigger position and define a fixed area based on that position */
  const defineFixedArea = (): void => {
    if (popoverTriggerRef.current === null) {
      return;
    }

    const triggerElementPosition = popoverTriggerRef.current.getBoundingClientRect();

    if (popoverFixedAreaRef.current != null) {
      popoverFixedAreaRef.current.style.top = triggerElementPosition.top + 'px';
      popoverFixedAreaRef.current.style.left = triggerElementPosition.left + 'px';
      popoverFixedAreaRef.current.style.height = triggerElementPosition.height + 'px';
      popoverFixedAreaRef.current.style.width = triggerElementPosition.width + 'px';
    }
  };

  const removeFixedAreaStyles = (): void => {
    if (popoverContentRef.current && popoverFixedAreaRef.current) {
      popoverContentRef.current.style.top = '';
      popoverContentRef.current.style.bottom = '';
      popoverFixedAreaRef.current.style.height = '0px';
      popoverFixedAreaRef.current.style.width = '0px';
    }
  };

  const onResize = toolbox.throttle(() => {
    resizePopoverToFitScreen();
    resolveHorizontalPosition();
  }, 150);
  const onScroll = () => {
    updateVerticalFixedAreaPosition();
  };
  const onEscape = (keydown: KeyboardEvent) => {
    if (keydown.key === 'Escape') {
      setIsShowingState(false);
    }
  };
  const onClickOutside = () => {
    setIsShowingState(false);
  };

  const popoverClasses = classnames('ewc-popover', {
    ['ewc-popover--hide']: !isShowingState,
    ['ewc-popover--text-only']: typeof content === 'string',
    ['ewc-popover--list']: type === 'list',
    ['ewc-popover--list-divider']: type === 'list' && hasDivider,
    ['ewc-popover--list-selectable']: isSelectable,
  });

  return (
    <div
      className={`${className ? className : ''}`}
      style={inlineStyle}
      ref={popoverRef}
      data-testid="popover-wrapper"
      aria-modal="true"
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

        <div className="ewc-popover__fixed-content-area" ref={popoverFixedAreaRef}>
          <div className="ewc-popover__contentContainer">
            <div className="ewc-popover__content" ref={popoverContentRef}>
              {type === 'informative' && (
                <div className="ewc-popover__content-area">
                  {hasCloseButton === true && (
                    <div className="ewc-popover__close">
                      <button
                        className="ewc-btn ewc-btn--icon ewc-btn--sm"
                        onClick={() => setIsShowingState(false)}
                        type="button"
                        data-testid="popover-close-btn"
                        aria-label="Lukk"
                      >
                        <Icon name="closeBold" size="xs" />
                      </button>
                    </div>
                  )}
                  {heading && (
                    <div className="ewc-popover__header" data-testid="popover-header">
                      {heading}
                    </div>
                  )}
                </div>
              )}
              {content && type === 'informative' && (
                <div className="ewc-popover__text" data-testid="popover-text">
                  {content}
                </div>
              )}
              {!content && type === 'informative' && <div className="ewc-popover__text" ref={popoverText} />}
              {content && type === 'list' && (
                <div
                  className="ewc-popover__text"
                  data-testid="popover-text"
                  onClick={() => !disableAutoClose && setIsShowingState(false)}
                >
                  {content}
                </div>
              )}
              {!content && type === 'list' && (
                <div
                  className="ewc-popover__text"
                  onClick={() => !disableAutoClose && setIsShowingState(false)}
                  ref={popoverText}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
