import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
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

const Popover: React.FC<PopoverProps> = ({
  title,
  description,
  customContent,
  posX,
  posY,
  trigger,
  noClose,
}) => {
  Popover.defaultProps = {
    posX: 'center',
    posY: 'top',
    noClose: false,
  };

  const [visiblePopover, setPopoverVisibility] = useState(false);
  const maxContentWidth = useRef(0);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLSlotElement>(null);
  const popoverArrowRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverCloseRef = useRef<HTMLButtonElement>(null);
  const popoverMargin = 16;
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
    document.addEventListener('click', handleClickOutside);

    function handleClickOutside(e: MouseEvent) {
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
    }

    // Remove listeners
    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(maxContentTimeout);
    };
  }, []);

  // Toggling popover state
  const togglePopover = () => {
    setPopoverVisibility((prevState) => !prevState);
  };

  // Initializing horizontal positions
  const setInitialPositions = useCallback(() => {
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
      return window.visualViewport.width;
    }
    return window.innerWidth;
  };

  const getCorrectInnerHeight = () => {
    if (navigator.userAgent.toLowerCase().includes('android')) {
      return window.visualViewport.height;
    }
    return window.innerHeight;
  };

  const resize = () => {
    if (!popoverContentRef.current || !maxContentWidth) {
      return;
    }
    if (maxContentWidth.current + popoverMargin + popoverMargin > getCorrectInnerWidth()) {
      popoverContentRef.current.style.width = `${getCorrectInnerWidth() - 2 * popoverMargin}px`;
    } else {
      popoverContentRef.current.style.width = maxContentWidth + 'px';
    }
  };

  // Update position and size of content
  const updateNewPosition = useCallback(() => {
    if (
      !popoverRef.current ||
      !popoverArrowRef.current ||
      !popoverContentRef.current ||
      !popoverTriggerRef.current
    ) {
      return;
    }

    const popover = popoverRef.current;
    const contentWidth = popoverContentRef.current.getBoundingClientRect().width;
    const contentHeight = popoverContentRef.current.getBoundingClientRect().height;
    const offsetLeft = popoverContentRef.current.getBoundingClientRect().left;
    const offsetRight = getCorrectInnerWidth() - contentWidth - offsetLeft;
    const offsetTop = popoverContentRef.current.getBoundingClientRect().top;
    const offsetBottom = getCorrectInnerHeight() - contentHeight - offsetTop;
    const triggerWidth = popoverTriggerRef.current.getBoundingClientRect().width;
    const triggerOffsetLeft = popoverTriggerRef.current.getBoundingClientRect().left;
    const triggerOffsetRight = getCorrectInnerWidth() - triggerWidth - triggerOffsetLeft;
    const arrowWidth = popoverArrowRef.current.getBoundingClientRect().width;
    const arrowHeight = popoverArrowRef.current.getBoundingClientRect().height;
    const arrowLeft = popoverArrowRef.current.getBoundingClientRect().left;
    const arrowRight = getCorrectInnerWidth() - arrowWidth - arrowLeft;
    const arrowOffsetTop = popoverArrowRef.current.getBoundingClientRect().top;
    const arrowOffsetBottom = getCorrectInnerHeight() - arrowHeight - arrowOffsetTop;

    // Update horizontal position
    const updatePositionX = () => {
      if (
        (posX === 'center' && moveFromLeft('middle')) ||
        (posX === 'left' && moveFromLeft('nonTriggerSide')) ||
        (posX === 'right' && moveFromLeft('triggerSide'))
      ) {
        updatePosStyle('none', 'auto', `${-arrowLeft + popoverMargin}px`);
      } else if (
        (posX === 'center' && moveFromRight('middle')) ||
        (posX === 'left' && moveFromRight('triggerSide')) ||
        (posX === 'right' && moveFromRight('nonTriggerSide'))
      ) {
        updatePosStyle('none', `${-arrowRight + popoverMargin}px`, 'auto');
      } else if (!moveFromRight('middle') && !moveFromLeft('middle')) {
        setInitialPositions();
      }
    };
    const getArrowOffset = (conflictSide: string): number => {
      if (conflictSide === 'nonTriggerSide') {
        return contentWidth;
      } else if (conflictSide === 'triggerSide') {
        return 0;
      }
      return contentWidth / 2;
    };
    const moveFromLeft = (conflictSide: string): boolean => {
      const noRoomLeft = offsetLeft <= popoverMargin;
      // Extra check width arrowOffset because first check is not always working
      const noRoomLeftInsurance =
        triggerOffsetLeft + triggerWidth / 2 + 40 <= popoverMargin + getArrowOffset(conflictSide);
      return noRoomLeft || noRoomLeftInsurance;
    };
    const moveFromRight = (conflictSide: string): boolean => {
      const noRoomRight = offsetRight <= popoverMargin;
      // Extra check width arrowOffset because first check is not always working
      const noRoomLeftInsurance =
        triggerOffsetRight + triggerWidth / 2 + 40 <= popoverMargin + getArrowOffset(conflictSide);
      return noRoomRight || noRoomLeftInsurance;
    };

    // Update vertical position
    const updatePositionY = () => {
      if (moveFromTop() && !popover.classList.contains('ewc-popover--bottom')) {
        popover.classList.add('ewc-popover--bottom');
      } else if (moveFromBottom() && popover.classList.contains('ewc-popover--bottom')) {
        popover.classList.remove('ewc-popover--bottom');
      }
    };
    const moveFromTop = (): boolean => {
      const noRoomTop = offsetTop <= popoverMargin;
      const isRoomBottom = arrowOffsetBottom > contentHeight + popoverMargin + popoverMargin;
      const isBottom = posY === 'bottom';
      return noRoomTop || (isBottom && isRoomBottom);
    };
    const moveFromBottom = (): boolean => {
      const noRoomBottom = offsetBottom <= popoverMargin;
      const isRoomTop = offsetTop > popoverMargin;
      const isRoomTopInsurance = arrowOffsetTop > contentHeight + popoverMargin + popoverMargin;
      const isTop = posY === 'top';
      return (noRoomBottom && isRoomTop) || (isTop && isRoomTopInsurance);
    };

    // Calling position functions
    resize();
    updatePositionY();
    updatePositionX();
  }, [posY, posX]);

  // Update position when popover is opened and when window is resized
  useEffect(() => {
    if (!visiblePopover) {
      return;
    }
    // Update position and size when opening popover
    updateNewPosition();
    resize();
    // Listen to resize while open
    const throttledUpdateNewPosition = throttle(updateNewPosition, 150);
    window.addEventListener('resize', throttledUpdateNewPosition);
    return () => window.removeEventListener('resize', throttledUpdateNewPosition);
  }, [visiblePopover]);

  return (
    <span className="ewc-popover" ref={popoverRef}>
      <div className="ewc-popover__trigger" ref={popoverTriggerRef}>
        {trigger && <div onClick={togglePopover}>{trigger}</div>}
        {!trigger && <slot name="trigger" onClick={togglePopover} ref={popoverSlotTriggerRef}></slot>}
        <div className="ewc-popover__arrow ewc-popover--hide" ref={popoverArrowRef}></div>
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
