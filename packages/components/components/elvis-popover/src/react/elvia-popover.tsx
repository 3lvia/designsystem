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
  content?: string | HTMLElement;
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
  trigger?: HTMLElement;
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
  disableAutoClose: boolean;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
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

  const [popoverVisibility, setPopoverVisibility] = useState(isShowing);
  const maxContentWidth = useRef(0);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverClasscontainerRef = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverText = useRef<HTMLDivElement>(null);
  const popoverBackdropRef = useRef<HTMLDivElement>(null);
  const popoverFixedAreaRef = useRef<HTMLDivElement>(null);
  const triggerHeight = 21;
  const popoverMargin = 16;
  const popoverPadding = 32;

  /**
   * Start outline listener
   *
   * Start click outside popover listener and set popover visibility to false when click registered
   */
  useEffect(() => {
    toolbox.outlineListener(popoverRef.current);

    const handleClickOutside = () => {
      setPopoverVisibility(false);
    };
    if (popoverBackdropRef.current) {
      popoverBackdropRef.current.addEventListener('click', handleClickOutside);
    }

    return () => {
      toolbox.outlineListener(popoverRef.current, true);

      if (popoverBackdropRef.current) {
        popoverBackdropRef.current.removeEventListener('click', handleClickOutside);
      }
    };
  }, []);

  /**
   * Start listener for escape and set popover visibility to false when clicked
   *
   * Define max possible content width for the popover
   */
  useEffect(() => {
    const closeOnEscape = (keydown: KeyboardEvent) => {
      if (keydown.key === 'Escape') {
        setPopoverVisibility(false);
      }
    };
    document.addEventListener('keydown', closeOnEscape, false);

    if (popoverContentRef.current) {
      maxContentWidth.current = popoverContentRef.current.getBoundingClientRect().width;
    }

    return () => {
      document.removeEventListener('keydown', closeOnEscape, false);
    };
  });

  /**
   * Get all slots and place them correctly
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
  }, [webcomponent]);

  useEffect(() => {
    if (popoverVisibility !== isShowing) {
      setPopoverVisibility(isShowing);
    }
  }, [isShowing]);

  const togglePopover = (): void => {
    setPopoverVisibility((prePopoverVisibility) => !prePopoverVisibility);
  };

  /**
   * Initializing horizontal position
   */
  const setInitialPosition = useCallback(() => {
    if (horizontalPosition === 'left') {
      updateHorizontalPositionStyle('none', '0', 'auto');
    } else if (horizontalPosition === 'right') {
      updateHorizontalPositionStyle('none', 'auto', '0');
    } else {
      updateHorizontalPositionStyle('translateX(-50%)', 'auto', '50%');
    }
  }, [horizontalPosition]);

  /**
   * Set the styling for the current position with the style attributes
   */
  const updateHorizontalPositionStyle = (transform: string, right: string, left: string): void => {
    if (!popoverContentRef.current) {
      return;
    }
    popoverContentRef.current.style.transform = transform;
    popoverContentRef.current.style.right = right;
    popoverContentRef.current.style.left = left;
  };

  /**
   * Get correct dimensions (screen size) based on device
   */
  const getCorrectDimensions = (): { screenHeight: number; screenWidth: number } | null => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return null;
    }
    if (navigator.userAgent.toLowerCase().includes('android')) {
      return { screenHeight: window.visualViewport.height, screenWidth: window.visualViewport.width };
    } else {
      return { screenHeight: window.innerHeight, screenWidth: window.innerWidth };
    }
  };

  /**
   * Get current width of scrollbar if visible
   */
  const getScrollbarWidth = (): number => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  /**
   * Returns true if there is not enough space for the popover horizontally
   */
  const hasConflictHorizontally = (
    isPosXCenter: boolean,
    conflictSide: string,
    triggerOffsetLeft: number,
    triggerOffsetRight: number,
    contentWidth: number,
    triggerWidth: number,
  ): boolean => {
    const contentSpace = isPosXCenter ? contentWidth / 2 : contentWidth;
    const triggerSpace = isPosXCenter ? triggerWidth / 2 : triggerWidth;
    let triggerOffset;
    if (conflictSide === 'right') {
      triggerOffset = triggerOffsetRight;
    } else {
      triggerOffset = triggerOffsetLeft;
    }
    const popoverMinSpace = contentSpace + popoverMargin;
    const popoverActualSpace = triggerSpace + triggerOffset;
    return popoverMinSpace >= popoverActualSpace;
  };

  /**
   * Returns true if there is not enough space for the popover to be on top of the trigger
   */
  const hasConflictTop = (): boolean => {
    if (!popoverContentRef.current || !popoverTriggerRef.current || !popoverVisibility) {
      return false;
    }
    const contentHeight = popoverContentRef.current.getBoundingClientRect().height;
    const offsetTop = popoverTriggerRef.current.getBoundingClientRect().top - contentHeight;
    const isRoomTop = offsetTop > popoverMargin;
    return !isRoomTop;
  };

  /**
   * Returns true if there is not enough space for the popover to below the trigger
   */
  const hasConflictBottom = (): boolean => {
    const dimensions = getCorrectDimensions();
    if (
      !popoverContentRef.current ||
      !popoverTriggerRef.current ||
      dimensions === null ||
      !popoverVisibility
    ) {
      return false;
    }
    const { screenHeight } = dimensions;
    const contentHeight = popoverContentRef.current.getBoundingClientRect().height;
    const offsetTop = popoverTriggerRef.current.getBoundingClientRect().top + triggerHeight;
    const offsetBottom = screenHeight - contentHeight - offsetTop;
    const isRoomBottom = offsetBottom > popoverMargin;
    const isRoomTop = offsetTop > popoverMargin;
    return !isRoomBottom && isRoomTop;
  };

  /**
   * Resolves horizontal position conflicts by setting right and left style properties
   */
  const resolveHorizontalConflict = (): void => {
    const dimensions = getCorrectDimensions();
    if (!popoverContentRef.current || !popoverTriggerRef.current || dimensions === null) {
      return;
    }
    const { screenWidth } = dimensions;
    const contentWidth = popoverContentRef.current.getBoundingClientRect().width;
    const triggerWidth = popoverTriggerRef.current.getBoundingClientRect().width;
    const triggerOffsetLeft = popoverTriggerRef.current.getBoundingClientRect().left;
    const triggerOffsetRight = screenWidth - triggerWidth - triggerOffsetLeft;
    if (
      horizontalPosition !== 'right' &&
      hasConflictHorizontally(
        horizontalPosition === 'center',
        'left',
        triggerOffsetLeft,
        triggerOffsetRight,
        contentWidth,
        triggerWidth,
      )
    ) {
      updateHorizontalPositionStyle('none', 'auto', `${-triggerOffsetLeft + popoverMargin}px`);
    } else if (
      horizontalPosition !== 'left' &&
      hasConflictHorizontally(
        horizontalPosition === 'center',
        'right',
        triggerOffsetLeft,
        triggerOffsetRight,
        contentWidth,
        triggerWidth,
      )
    ) {
      updateHorizontalPositionStyle(
        'none',
        `${-triggerOffsetRight + popoverMargin + getScrollbarWidth()}px`,
        'auto',
      );
    } else {
      setInitialPosition();
    }
  };

  /**
   * Resolves vertical position conflicts by defining top and bottom style attributes
   */
  const resolveVerticalConflicts = (): void => {
    if (hasConflictTop() && popoverContentRef.current && popoverTriggerRef.current) {
      popoverContentRef.current.style.top = popoverTriggerRef.current.getBoundingClientRect().height + 'px';
      popoverContentRef.current.style.bottom = 'auto';
    }
    if (
      popoverClasscontainerRef.current &&
      popoverClasscontainerRef.current.classList.contains('ewc-popover--bottom') &&
      popoverContentRef.current &&
      popoverTriggerRef.current
    ) {
      popoverContentRef.current.style.top = popoverTriggerRef.current.getBoundingClientRect().height + 'px';
    }
  };

  /**
   * Resize the popover based on the content of the popover and the current available dimensions (screen size)
   */
  const resizePopoverToFitScreen = (): void => {
    const dimensions = getCorrectDimensions();
    defineFixedArea();
    if (!popoverContentRef.current || !maxContentWidth.current || dimensions === null) {
      return;
    }
    const { screenWidth } = dimensions;
    if (maxContentWidth.current + (popoverMargin * 2 + popoverPadding * 2) > screenWidth) {
      popoverContentRef.current.style.width = `${screenWidth - (popoverMargin * 2 + popoverPadding * 2)}px`;
    } else {
      popoverContentRef.current.style.width = `${maxContentWidth}px`;
    }
  };

  /**
   * Get trigger position and define a fixed area based on that position
   */
  const defineFixedArea = (): void => {
    console.log('Defined fixed area');
    if (popoverTriggerRef.current === null) {
      return;
    }

    console.log('Actually defining');
    const triggerElementPosition = popoverTriggerRef.current.getBoundingClientRect();

    if (popoverFixedAreaRef.current != null) {
      popoverFixedAreaRef.current.style.top = triggerElementPosition.top + 'px';
      popoverFixedAreaRef.current.style.left = triggerElementPosition.left + 'px';
      popoverFixedAreaRef.current.style.height = triggerElementPosition.height + 'px';
      popoverFixedAreaRef.current.style.width = triggerElementPosition.width + 'px';
    }
  };

  /**
   * Remove all styling set for the fixed area
   */
  const removeFixedAreaStyles = (): void => {
    if (popoverContentRef.current && popoverFixedAreaRef.current) {
      popoverContentRef.current.style.top = '';
      popoverContentRef.current.style.bottom = '';
      popoverFixedAreaRef.current.style.height = '0px';
      popoverFixedAreaRef.current.style.width = '0px';
    }
  };

  /**
   * Resize popover and resolve positioning conflicts
   */
  const updatePosition = useCallback(() => {
    resizePopoverToFitScreen();
    resolveHorizontalConflict();
    resolveVerticalConflicts();
  }, [horizontalPosition]);

  /**
   * Dispatch onOpen and onClose event
   */
  const dispatchPopoverVisibilityEvents = (popoverVisibility: boolean): void => {
    if (popoverVisibility) {
      if (!webcomponent && onOpen) {
        onOpen();
      } else if (webcomponent) {
        webcomponent.triggerEvent('onOpen');
      }
    } else if (!popoverVisibility && popoverVisibility !== isShowing) {
      if (!webcomponent && onClose) {
        onClose();
      } else if (webcomponent) {
        webcomponent.triggerEvent('onClose');
      }
    }
  };

  /**
   * When popover is closed:
   *    1. Remove fixed area style if popover
   * When popover is opened:
   *    1. Update position and size
   *    2. Positions a fixed area that covers trigger element and works as position anchor for content element
   *    3. Starts scroll listener for updating fixed area to new trigger position
   *    4. Starts resize listener for updating position whenever changed
   */
  useEffect(() => {
    console.log('Popover visibility changed');
    dispatchPopoverVisibilityEvents(popoverVisibility);

    if (!popoverVisibility) {
      removeFixedAreaStyles();
      return;
    }

    if (popoverFixedAreaRef.current != null || popoverContentRef.current != null) {
      defineFixedArea();
    }
    updatePosition();

    const updateFixedAreaPositionOnScroll = () => {
      console.log('Inside');
      if (popoverFixedAreaRef.current && popoverTriggerRef.current) {
        console.log('Updating');
        popoverFixedAreaRef.current.style.top = popoverTriggerRef.current.getBoundingClientRect().top + 'px';
      }
    };
    document.addEventListener('scroll', updateFixedAreaPositionOnScroll);

    const throttledUpdateNewPosition = toolbox.throttle(updatePosition, 150);
    window.addEventListener('resize', throttledUpdateNewPosition);

    return () => {
      window.removeEventListener('resize', throttledUpdateNewPosition);
      document.removeEventListener('scroll', updateFixedAreaPositionOnScroll);
      removeFixedAreaStyles();
    };
  }, [popoverVisibility]);

  const popoverClasses = classnames('ewc-popover', {
    ['ewc-popover--hide']: !popoverVisibility,
    ['ewc-popover--text-only']: typeof content === 'string',
    ['ewc-popover--bottom']: (verticalPosition === 'bottom' && !hasConflictBottom()) || hasConflictTop(),
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
      <div ref={popoverClasscontainerRef} className={popoverClasses} data-testid="popover-container">
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
                        onClick={() => setPopoverVisibility(false)}
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
                  onClick={() => !disableAutoClose && setPopoverVisibility(false)}
                >
                  {content}
                </div>
              )}
              {!content && type === 'list' && (
                <div
                  className="ewc-popover__text"
                  onClick={() => !disableAutoClose && setPopoverVisibility(false)}
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
