import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
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
}

// Return composedPath and Polyfill path if IE11
const getEventPath = (e: MouseEvent) => {
  const polyfill = () => {
    const element = (e.target as HTMLElement) || null;
    const pathArr = [element];

    if (!element || !element.parentElement) {
      return [];
    }

    return pathArr;
  };

  return (e.composedPath && e.composedPath()) || polyfill();
};

const Popover: FC<PopoverProps> = ({
  header,
  content,
  posX = 'center',
  posY = 'top',
  trigger,
  hasCloseBtn = true,
}) => {
  const [popoverVisibility, setPopoverVisibility] = useState(false);
  const maxContentWidth = useRef(0);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverText = useRef<HTMLDivElement>(null);
  const popoverMargin = 16;
  const popoverPadding = 32;

  // Running on first render only (on mount)
  useEffect(() => {
    // Start outline listener
    toolbox.outlineListener(popoverRef.current);

    // Listen to click outside popover
    const handleClickOutside = (e: MouseEvent) => {
      if (!popoverContentRef.current || !popoverRef.current) {
        return;
      }
      const path = getEventPath(e);
      const slotTriggerIsTargetTrigger = popoverSlotTriggerRef.current === path[1];
      const popoverContainsTarget = popoverRef.current.contains(path[0] as Node);
      const isContentHidden = popoverContentRef.current.classList.contains('ewc-popover--hide');
      if (!slotTriggerIsTargetTrigger && !popoverContainsTarget && !isContentHidden) {
        setPopoverVisibility(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    // Cleanup
    return () => {
      // Remove outline listener
      toolbox.outlineListener(popoverRef.current, true);

      document.removeEventListener('click', handleClickOutside);
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

    // Web component - Placing slots at the right place
    if (popoverRef.current && popoverRef.current.parentElement) {
      popoverRef.current.parentElement.querySelectorAll('[slot]').forEach((element: any) => {
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

    // Defining max content width for popover
    if (popoverContentRef.current) {
      maxContentWidth.current = popoverContentRef.current.getBoundingClientRect().width;
    }

    // Cleanup
    return () => {
      // Remove outline listener
      document.removeEventListener('keydown', closeOnEscape, false);
    };
  });

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
    if (!popoverContentRef.current || !popoverVisibility) {
      return false;
    }
    const offsetTop = popoverContentRef.current.getBoundingClientRect().top;
    const isRoomTop = offsetTop > popoverMargin;
    return !isRoomTop;
  };

  const isConflictBottom = (): boolean => {
    const dimensions = getCorrectDimensions();
    if (!popoverContentRef.current || dimensions === null || !popoverVisibility) {
      return false;
    }
    const { screenHeight } = dimensions;
    const contentHeight = popoverContentRef.current.getBoundingClientRect().height;
    const offsetTop = popoverContentRef.current.getBoundingClientRect().top;
    const offsetBottom = screenHeight - contentHeight - offsetTop;
    const isRoomBottom = offsetBottom > popoverMargin;
    const isRoomTop = offsetTop > popoverMargin;
    return !isRoomBottom && isRoomTop;
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
        updatePosStyle('none', `${-triggerOffsetRight + popoverMargin}px`, 'auto');
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

  // Update position when popover is opened and when window is resized
  useEffect(() => {
    // Update position and size when opening popover
    updatePosition();
    resizePopover();

    // Listen to window resizing if popover is open
    if (!popoverVisibility) {
      return;
    }
    const throttledUpdateNewPosition = toolbox.throttle(updatePosition, 150);
    window.addEventListener('resize', throttledUpdateNewPosition);
    return () => window.removeEventListener('resize', throttledUpdateNewPosition);
  }, [popoverVisibility, updatePosition]);

  const popoverClasses = classnames('ewc-popover', {
    ['ewc-popover--hide']: !popoverVisibility,
    ['ewc-popover--text-only']: typeof content === 'string',
    ['ewc-popover--bottom']: (posY === 'bottom' && !isConflictBottom()) || isConflictTop(),
  });

  return (
    <span className={popoverClasses} ref={popoverRef}>
      <div className="ewc-popover__trigger" ref={popoverTriggerRef}>
        {trigger && <div onClick={togglePopover}>{trigger}</div>}
        {!trigger && <div onClick={togglePopover} ref={popoverSlotTriggerRef}></div>}
      </div>

      <div className="ewc-popover__content" ref={popoverContentRef}>
        {hasCloseBtn == true && (
          <div className="ewc-popover__close">
            <button className="ewc-btn ewc-btn--icon ewc-btn--sm" onClick={() => setPopoverVisibility(false)}>
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
        {header && <div className="ewc-popover__header">{header}</div>}
        {content && <div className="ewc-popover__text">{content}</div>}
        {!content && <div className="ewc-popover__text" ref={popoverText} />}
      </div>
    </span>
  );
};

export default Popover;
