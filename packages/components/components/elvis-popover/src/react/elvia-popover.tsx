import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import './style.scss';
import classnames from 'classnames';

export interface PopoverProps {
  title?: string;
  content?: string;
  hasCustomContent?: boolean;
  posX?: string;
  posY?: string;
  trigger?: string;
  hasCloseBtn?: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const throttle = (func: any, limit: number) => {
  let inThrottle: boolean | NodeJS.Timeout;
  return (...args: any) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Return composedPath if Firefox, Polyfill path if IE11
const getEventPath = (e: any) => {
  const polyfill = () => {
    const element = e.target || null;
    const pathArr = [element];

    if (!element || !element.parentElement) {
      return [];
    }

    return pathArr;
  };

  return e.path || (e.composedPath && e.composedPath()) || polyfill();
};

const Popover: FC<PopoverProps> = ({
  title,
  content,
  hasCustomContent = false,
  posX = 'center',
  posY,
  trigger,
  hasCloseBtn = true,
}) => {
  const [visiblePopover, setPopoverVisibility] = useState(false);
  const maxContentWidth = useRef(0);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLSlotElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverMargin = 16;

  // Running on first render only (on mount)
  useEffect(() => {
    // Defining max content width for popover
    const maxContentTimeout = setTimeout(() => {
      if (!popoverContentRef.current) {
        return;
      }
      maxContentWidth.current = popoverContentRef.current.getBoundingClientRect().width;
    }, 0);

    // Listen to click outside popover
    const handleClickOutside = (e: MouseEvent) => {
      if (!popoverContentRef.current || !popoverRef.current) {
        return;
      }

      const path = getEventPath(e);
      const slotTriggerIsTargetTrigger = popoverSlotTriggerRef.current === path[1];
      const popoverContainsTarget = popoverRef.current.contains(path[0]);
      const contentIsHidden = popoverContentRef.current.classList.contains('ewc-popover--hide');
      if (!slotTriggerIsTargetTrigger && !popoverContainsTarget && !contentIsHidden) {
        setPopoverVisibility(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(maxContentTimeout);
    };
  }, []);

  // Toggling popover state
  const togglePopover = () => {
    setPopoverVisibility((visiblePopover) => !visiblePopover);
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

  const getCorrectInnerWidth = () => {
    if (typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('android')) {
      return typeof window === 'undefined' ? null : window.visualViewport.width;
    }
    return typeof window === 'undefined' ? null : window.innerWidth;
  };

  const getCorrectInnerHeight = () => {
    if (typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('android')) {
      return typeof window === 'undefined' ? null : window.visualViewport.height;
    }
    return typeof window === 'undefined' ? null : window.innerHeight;
  };

  const resize = () => {
    const correctInnerWidth = getCorrectInnerWidth();
    if (!popoverContentRef.current || !maxContentWidth.current || correctInnerWidth === null) {
      return;
    }
    if (maxContentWidth.current + popoverMargin + popoverMargin > correctInnerWidth) {
      popoverContentRef.current.style.width = `${correctInnerWidth - 2 * popoverMargin}px`;
    } else {
      popoverContentRef.current.style.width = maxContentWidth + 'px';
    }
  };

  const conflictTop = (): boolean => {
    if (!popoverContentRef.current || !visiblePopover) {
      return false;
    }
    const offsetTop = popoverContentRef.current.getBoundingClientRect().top;
    const isRoomTop = offsetTop > popoverMargin;
    return !isRoomTop;
  };

  const conflictBottom = (): boolean => {
    const correctInnerHeight = getCorrectInnerHeight();
    if (!popoverContentRef.current || correctInnerHeight === null || !visiblePopover) {
      return false;
    }
    const contentHeight = popoverContentRef.current.getBoundingClientRect().height;
    const offsetTop = popoverContentRef.current.getBoundingClientRect().top;
    const offsetBottom = correctInnerHeight - contentHeight - offsetTop;
    const isRoomBottom = offsetBottom > popoverMargin;
    const isRoomTop = offsetTop > popoverMargin;
    return !isRoomBottom && isRoomTop;
  };

  // Update position horizontally and size of content
  const updatePosition = useCallback(() => {
    const correctInnerWidth = getCorrectInnerWidth();
    if (!popoverContentRef.current || !popoverTriggerRef.current || correctInnerWidth === null) {
      return;
    }

    const contentWidth = popoverContentRef.current.getBoundingClientRect().width;
    const triggerWidth = popoverTriggerRef.current.getBoundingClientRect().width;
    const triggerOffsetLeft = popoverTriggerRef.current.getBoundingClientRect().left;
    const triggerOffsetRight = correctInnerWidth - triggerWidth - triggerOffsetLeft;

    const updatePositionX = () => {
      if (conflictLeft()) {
        updatePosStyle('none', 'auto', `${-triggerOffsetLeft + popoverMargin}px`);
      } else if (conflictRight()) {
        updatePosStyle('none', `${-triggerOffsetRight + popoverMargin}px`, 'auto');
      } else if (!conflictRight() && !conflictLeft()) {
        setInitialPosition();
      }
    };
    const conflictLeft = (): boolean => {
      const conflictLeftLeft =
        posX === 'left' && contentWidth + popoverMargin >= triggerWidth + triggerOffsetLeft;
      const conflictLeftCenter =
        posX === 'center' && contentWidth / 2 + popoverMargin >= triggerWidth / 2 + triggerOffsetLeft;
      return conflictLeftLeft || conflictLeftCenter;
    };
    const conflictRight = (): boolean => {
      const conflictRightRight =
        posX === 'right' && contentWidth + popoverMargin >= triggerWidth + triggerOffsetRight;
      const conflictRightCenter =
        posX === 'center' && contentWidth / 2 + popoverMargin >= triggerWidth / 2 + triggerOffsetRight;
      return conflictRightRight || conflictRightCenter;
    };

    // Calling position functions
    resize();
    updatePositionX();
  }, [posX]);

  // Update position when popover is opened and when window is resized
  useEffect(() => {
    // Update position and size when opening popover
    updatePosition();
    resize();

    // Listen to window resizing if popover is open
    if (!visiblePopover) {
      return;
    }
    const throttledUpdatePosition = throttle(updatePosition, 250);
    window.addEventListener('resize', throttledUpdatePosition);

    // Cleanup
    return () => window.removeEventListener('resize', throttledUpdatePosition);
  }, [visiblePopover]);

  const popoverClasses = classnames('ewc-popover', {
    ['ewc-popover--bottom']: (posY === 'bottom' && !conflictBottom()) || conflictTop(),
  });
  const contentClasses = classnames('ewc-popover__content', {
    ['ewc-popover--text-only']: hasCustomContent == false,
    ['ewc-popover--hide']: !visiblePopover,
  });

  return (
    <span className={popoverClasses} ref={popoverRef}>
      <div className="ewc-popover__trigger" ref={popoverTriggerRef}>
        {trigger && <div onClick={togglePopover}>{trigger}</div>}
        {!trigger && <slot name="trigger" onClick={togglePopover} ref={popoverSlotTriggerRef}></slot>}
      </div>

      <div className={contentClasses} ref={popoverContentRef}>
        {hasCloseBtn == true && (
          <div className="ewc-popover__close">
            <button
              className="ewc-btn ewc-btn--icon ewc-btn--sm e-no-outline"
              onClick={() => setPopoverVisibility(false)}
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
        {title && <div className="ewc-popover__title">{title}</div>}
        <div className="ewc-popover__text">{content}</div>
        {!content && <slot name="content" className="ewc-popover__text"></slot>}
      </div>
    </span>
  );
};

export default Popover;
