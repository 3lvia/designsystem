import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import './style.scss';
import classnames from 'classnames';

export interface PopoverProps {
  title?: string;
  description?: string;
  customContent?: string;
  posX?: string;
  posY?: string;
  trigger?: string;
  noClose?: boolean;
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

const Popover: FC<PopoverProps> = ({ title, description, customContent, posX, posY, trigger, noClose }) => {
  const [visiblePopover, setPopoverVisibility] = useState(false);
  const maxContentWidth = useRef(0);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLSlotElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverCloseRef = useRef<HTMLButtonElement>(null);
  const popoverMargin = 16;
  const popoverClasses = classnames('ewc-popover', {
    ['ewc-popover--bottom']: posY === 'bottom',
  });
  const contentClasses = classnames('ewc-popover__content', {
    ['ewc-popover--text-only']: description && !customContent,
    ['ewc-popover--hide']: !visiblePopover,
  });

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
        togglePopover();
      }
    };
    document.addEventListener('click', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(maxContentTimeout);
    };
  }, []);

  const isServerSideRendering = (): boolean => {
    return typeof window === 'undefined';
  };

  // Toggling popover state
  const togglePopover = () => {
    setPopoverVisibility((prevState) => !prevState);
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
    if (navigator.userAgent.toLowerCase().includes('android')) {
      return isServerSideRendering() ? null : window.visualViewport.width;
    }
    return isServerSideRendering() ? null : window.innerWidth;
  };

  const getCorrectInnerHeight = () => {
    if (navigator.userAgent.toLowerCase().includes('android')) {
      return isServerSideRendering() ? null : window.visualViewport.height;
    }
    return isServerSideRendering() ? null : window.innerHeight;
  };

  const resize = () => {
    const correctInnerWidth = getCorrectInnerWidth();
    if (!popoverContentRef.current || !maxContentWidth || correctInnerWidth === null) {
      return;
    }
    if (maxContentWidth.current + popoverMargin + popoverMargin > correctInnerWidth) {
      popoverContentRef.current.style.width = `${correctInnerWidth - 2 * popoverMargin}px`;
    } else {
      popoverContentRef.current.style.width = maxContentWidth + 'px';
    }
  };

  // Update position and size of content
  const updatePosition = useCallback(() => {
    const correctInnerWidth = getCorrectInnerWidth();
    const correctInnerHeight = getCorrectInnerHeight();
    if (
      !popoverRef.current ||
      !popoverContentRef.current ||
      !popoverTriggerRef.current ||
      correctInnerWidth === null ||
      correctInnerHeight === null
    ) {
      return;
    }

    const popover = popoverRef.current;
    const contentWidth = popoverContentRef.current.getBoundingClientRect().width;
    const contentHeight = popoverContentRef.current.getBoundingClientRect().height;
    const offsetTop = popoverContentRef.current.getBoundingClientRect().top;
    const offsetBottom = correctInnerHeight - contentHeight - offsetTop;
    const triggerWidth = popoverTriggerRef.current.getBoundingClientRect().width;
    const triggerOffsetLeft = popoverTriggerRef.current.getBoundingClientRect().left;
    const triggerOffsetRight = correctInnerWidth - triggerWidth - triggerOffsetLeft;

    // Update horizontal position
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
        posX === undefined && contentWidth / 2 + popoverMargin >= triggerWidth / 2 + triggerOffsetLeft;
      return conflictLeftLeft || conflictLeftCenter;
    };
    const conflictRight = (): boolean => {
      const conflictRightRight =
        posX === 'right' && contentWidth + popoverMargin >= triggerWidth + triggerOffsetRight;
      const conflictRightCenter =
        posX === undefined && contentWidth / 2 + popoverMargin >= triggerWidth / 2 + triggerOffsetRight;
      return conflictRightRight || conflictRightCenter;
    };

    // Update vertical position
    const updatePositionY = () => {
      if (conflictTop() && !popover.classList.contains('ewc-popover--bottom')) {
        popover.classList.add('ewc-popover--bottom');
      } else if (conflictBottom() && popover.classList.contains('ewc-popover--bottom')) {
        popover.classList.remove('ewc-popover--bottom');
      }
    };
    const conflictTop = (): boolean => {
      const isRoomTop = offsetTop > popoverMargin;
      return !isRoomTop;
    };
    const conflictBottom = (): boolean => {
      const isRoomBottom = offsetBottom > popoverMargin;
      const isRoomTop = offsetTop > popoverMargin;
      return !isRoomBottom && isRoomTop;
    };

    // Calling position functions
    resize();
    updatePositionY();
    updatePositionX();
  }, [posY, posX]);

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

  return (
    <span className={popoverClasses} ref={popoverRef}>
      <div className="ewc-popover__trigger" ref={popoverTriggerRef}>
        {trigger && <div onClick={togglePopover}>{trigger}</div>}
        {!trigger && <slot name="trigger" onClick={togglePopover} ref={popoverSlotTriggerRef}></slot>}
      </div>

      <div className={contentClasses} ref={popoverContentRef}>
        {!noClose && (
          <div className="ewc-popover__close">
            <button
              className="ewc-btn ewc-btn--icon ewc-btn--sm e-no-outline"
              onClick={togglePopover}
              ref={popoverCloseRef}
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
        <div className="ewc-popover__text">{description ? description : customContent}</div>
        {!trigger && <slot name="customContent" className="ewc-popover__text"></slot>}
      </div>
    </span>
  );
};

export default Popover;
