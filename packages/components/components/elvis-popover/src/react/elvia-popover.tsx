import React, { FC, useState, useEffect, useRef, useCallback, CSSProperties } from 'react';
import './style.scss';
import classnames from 'classnames';
import toolbox from '@elvia/elvis-toolbox';

export interface PopoverProps {
  header?: string;
  content?: string | HTMLElement;
  posX?: 'left' | 'right' | 'center';
  posY?: 'top' | 'bottom';
  trigger?: HTMLElement;
  hasCloseBtn?: boolean;
  isShowing?: boolean;
  isShowingOnChange?: (isShowing: boolean) => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent: any;
}

const Popover: FC<PopoverProps> = ({
  header,
  content,
  posX = 'center',
  posY = 'top',
  trigger,
  hasCloseBtn = true,
  isShowing = false,
  isShowingOnChange,
  className,
  inlineStyle,
  webcomponent,
}) => {
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

  // Running on first render only (on mount)
  useEffect(() => {
    // Start outline listener
    toolbox.outlineListener(popoverRef.current);

    // Close on click outside
    const handleClickOutside = () => {
      setPopoverVisibility(false);
    };
    if (popoverBackdropRef.current) {
      popoverBackdropRef.current.addEventListener('click', handleClickOutside);
    }

    // Cleanup
    return () => {
      // Remove outline listener
      toolbox.outlineListener(popoverRef.current, true);

      if (popoverBackdropRef.current) {
        popoverBackdropRef.current.removeEventListener('click', handleClickOutside);
      }
    };
  }, []);

  // Running like componentDidMount
  useEffect(() => {
    // Close on escape
    const closeOnEscape = (keydown: KeyboardEvent) => {
      if (keydown.key === 'Escape') {
        setPopoverVisibility(false);
      }
    };
    document.addEventListener('keydown', closeOnEscape, false);

    // Defining max content width for popover
    if (popoverContentRef.current) {
      maxContentWidth.current = popoverContentRef.current.getBoundingClientRect().width;
    }

    // Web component - Placing slots at the right place
    if (
      popoverRef.current &&
      popoverRef.current.parentElement &&
      popoverRef.current.parentElement.parentElement
    ) {
      popoverRef.current.parentElement.parentElement.querySelectorAll('[slot]').forEach((element: any) => {
        if (popoverSlotTriggerRef.current && element.slot === 'trigger') {
          popoverSlotTriggerRef.current.innerHTML = '';
          popoverSlotTriggerRef.current.appendChild(element);
        }
        if (popoverText.current && element.slot === 'content') {
          popoverText.current.innerHTML = '';
          popoverText.current.appendChild(element);
        }
      });
    }

    // Cleanup
    return () => {
      // Remove outline listener
      document.removeEventListener('keydown', closeOnEscape, false);
    };
  });

  useEffect(() => {
    setPopoverVisibility(isShowing);
  }, [isShowing]);

  // Toggling popover state
  const togglePopover = () => {
    setPopoverVisibility((prePopoverVisibility) => !prePopoverVisibility);
  };

  // Initializing horizontal positions
  const setInitialPosition = useCallback(() => {
    if (posX === 'left') {
      updatePosStyle('none', '0', 'auto');
    } else if (posX === 'right') {
      updatePosStyle('none', 'auto', '0');
    } else {
      updatePosStyle('translateX(-50%)', 'auto', '50%');
    }
  }, [posX]);

  const updatePosStyle = (transform: string, right: string, left: string) => {
    if (!popoverContentRef.current) {
      return;
    }
    popoverContentRef.current.style.transform = transform;
    popoverContentRef.current.style.right = right;
    popoverContentRef.current.style.left = left;
  };

  const getCorrectDimensions = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return null;
    }
    if (navigator.userAgent.toLowerCase().includes('android')) {
      return { screenHeight: window.visualViewport.height, screenWidth: window.visualViewport.width };
    } else {
      return { screenHeight: window.innerHeight, screenWidth: window.innerWidth };
    }
  };

  const resizePopover = () => {
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

  const isConflictTop = (): boolean => {
    if (!popoverContentRef.current || !popoverTriggerRef.current || !popoverVisibility) {
      return false;
    }
    const contentHeight = popoverContentRef.current.getBoundingClientRect().height;
    const offsetTop = popoverTriggerRef.current.getBoundingClientRect().top - contentHeight;
    const isRoomTop = offsetTop > popoverMargin;
    return !isRoomTop;
  };

  const isConflictBottom = (): boolean => {
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

  // get current width of scrollbar if visible
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  // Update position horizontally and size of content
  const updatePosition = useCallback(() => {
    const dimensions = getCorrectDimensions();
    if (!popoverContentRef.current || !popoverTriggerRef.current || dimensions === null) {
      return;
    }
    const { screenWidth } = dimensions;
    const contentWidth = popoverContentRef.current.getBoundingClientRect().width;
    const triggerWidth = popoverTriggerRef.current.getBoundingClientRect().width;
    const triggerOffsetLeft = popoverTriggerRef.current.getBoundingClientRect().left;
    const triggerOffsetRight = screenWidth - triggerWidth - triggerOffsetLeft;

    const updatePositionX = () => {
      if (posX !== 'right' && isConflict(posX === 'center', 'left')) {
        updatePosStyle('none', 'auto', `${-triggerOffsetLeft + popoverMargin}px`);
      } else if (posX !== 'left' && isConflict(posX === 'center', 'right')) {
        updatePosStyle('none', `${-triggerOffsetRight + popoverMargin + getScrollbarWidth()}px`, 'auto');
      } else {
        setInitialPosition();
      }
    };
    const isConflict = (isPosXCenter: boolean, conflictSide: string): boolean => {
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

    // Calling position functions
    resizePopover();
    updatePositionX();
  }, [posX]);

  const defineFixedArea = () => {
    if (popoverTriggerRef.current === null) {
      return;
    }
    // get trigger position
    const triggerElementPosition = popoverTriggerRef.current.getBoundingClientRect();

    // check for current fixed area
    if (popoverFixedAreaRef.current != null) {
      // define height and width to fixed area to match trigger element & and set top.
      popoverFixedAreaRef.current.style.top = triggerElementPosition.top + 'px';
      popoverFixedAreaRef.current.style.left = triggerElementPosition.left + 'px';
      popoverFixedAreaRef.current.style.height = triggerElementPosition.height + 'px';
      popoverFixedAreaRef.current.style.width = triggerElementPosition.width + 'px';
    }
  };

  const resolvePositionConflicts = () => {
    // apply top and bottom properties if not enought space above or below popover
    if (isConflictTop() && popoverContentRef.current && popoverTriggerRef.current) {
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

  const removeFixedAreaStyles = () => {
    if (popoverContentRef.current && popoverFixedAreaRef.current) {
      popoverContentRef.current.style.top = '';
      popoverContentRef.current.style.bottom = '';
      popoverFixedAreaRef.current.style.height = '0px';
      popoverFixedAreaRef.current.style.width = '0px';
    }
  };

  // Updates isShowing prop
  // Updates position when popover is opened and when window is resized
  // Positions a fixed area that covers trigger element and works as position anchor for content element
  useEffect(() => {
    if (isShowing !== popoverVisibility) {
      if (!webcomponent && isShowingOnChange) {
        isShowingOnChange(popoverVisibility);
      } else if (webcomponent) {
        webcomponent.setProps({ isShowing: popoverVisibility }, true);
      }
    }

    // Remove fixed area styles if popover is closed
    if (!popoverVisibility) {
      removeFixedAreaStyles();
      return;
    }

    // Update position and size when opening popover
    updatePosition();
    resizePopover();

    // Define size for current fixed container
    if (popoverFixedAreaRef.current != null || popoverContentRef.current != null) {
      defineFixedArea();
    }

    // Resolve position conflicts
    resolvePositionConflicts();

    // On scroll -> reposition fixed area to current trigger-position
    const updateFixedAreaPositionOnScroll = () => {
      if (popoverFixedAreaRef.current && popoverTriggerRef.current) {
        popoverFixedAreaRef.current.style.top = popoverTriggerRef.current.getBoundingClientRect().top + 'px';
      }
    };
    document.addEventListener('scroll', updateFixedAreaPositionOnScroll, false);

    // On resize -> update position
    const throttledUpdateNewPosition = toolbox.throttle(updatePosition, 150);
    window.addEventListener('resize', throttledUpdateNewPosition);

    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledUpdateNewPosition);
      document.removeEventListener('scroll', updateFixedAreaPositionOnScroll, false);
      removeFixedAreaStyles();
    };
  }, [popoverVisibility]);

  const popoverClasses = classnames('ewc-popover', {
    ['ewc-popover--hide']: !popoverVisibility,
    ['ewc-popover--text-only']: typeof content === 'string',
    ['ewc-popover--bottom']: (posY === 'bottom' && !isConflictBottom()) || isConflictTop(),
  });

  return (
    <div
      className={`${className ? className : ''}`}
      style={inlineStyle}
      ref={popoverRef}
      data-testid="popover-wrapper"
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
              {hasCloseBtn == true && (
                <div className="ewc-popover__close">
                  <button
                    className="ewc-btn ewc-btn--icon ewc-btn--sm"
                    onClick={() => setPopoverVisibility(false)}
                    data-testid="popover-close-btn"
                  >
                    <span className="ewc-btn__icon">
                      <i
                        className="ewc-icon ewc-icon--close-bold ewc-icon--xs"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath d='M14.3 12.179a.25.25 0 010-.354l9.263-9.262A1.5 1.5 0 1021.439.442L12.177 9.7a.25.25 0 01-.354 0L2.561.442A1.5 1.5 0 00.439 2.563L9.7 11.825a.25.25 0 010 .354L.439 21.442a1.5 1.5 0 102.122 2.121l9.262-9.263a.25.25 0 01.354 0l9.262 9.263a1.5 1.5 0 002.122-2.121L14.3 12.179z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
                        }}
                        e-id="e-icone-icon--close-bold"
                      ></i>
                    </span>
                  </button>
                </div>
              )}
              {header && (
                <div className="ewc-popover__header" data-testid="popover-header">
                  {header}
                </div>
              )}
              {content && (
                <div className="ewc-popover__text" data-testid="popover-text">
                  {content}
                </div>
              )}
              {!content && <div className="ewc-popover__text" ref={popoverText} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
