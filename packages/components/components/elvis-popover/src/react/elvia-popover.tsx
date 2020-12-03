import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import './style.scss';

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

// function getInternetExplorerVersion(){
//   let rv = -1;
//   if (navigator.appName == 'Microsoft Internet Explorer')
//   {
//     const ua = navigator.userAgent;
//     const re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
//     if (re.exec(ua) != null)
//       rv = parseFloat( RegExp.$1 );
//   }
//   else if (navigator.appName == 'Netscape')
//   {
//     const ua = navigator.userAgent;
//     const re  = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");
//     if (re.exec(ua) != null)
//       rv = parseFloat( RegExp.$1 );
//   }
//   return rv;
// }

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

  return (
    e.path || (e.composedPath && e.composedPath()) || polyfill()
  );
};

const Popover: React.FC<PopoverProps> = ({ title, description, customContent, posX, posY, trigger, noClose }) => {
  const [visiblePopover, setPopoverVisibility] = useState(false);
  const [maxContentWidth, setMaxContentWidth] = useState(0);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLSlotElement>(null);
  const popoverArrowRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverCloseRef = useRef<HTMLButtonElement>(null);
  const popoverMargin = 20;
  const popoverOffsetArrow = 40;
  const contentClasses = [
    description && !customContent ? 'text-only' : '', 
    'ewc-popover__content', 
  ].join(' ');

  // Setting popover state
  function togglePopover() {
    setPopoverVisibility((prevState) => !prevState);
  }

  // Setting max content width
  function updateMaxContentWidth(maxContentWidth: number) {
    setMaxContentWidth(maxContentWidth);
  }

  // Running on first render only (on mount)
  useEffect(() => {
    // Defining max content width for popover
    setTimeout(() => {
      if(!popoverContentRef.current) {
        return;
      }
      const maxContent = popoverContentRef.current.getBoundingClientRect().width;
      updateMaxContentWidth(maxContent);
    }, 100);

    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    // Listen to tab events and click outside popover
    document.body.addEventListener('keydown', (e) => toggleOutline(e));
    document.addEventListener('click', handleClickOutside);

    function toggleOutline(e: KeyboardEvent) {
      if (!popoverCloseRef.current) {
        return;
      }
      if (e.key === 'Tab') {
        popoverCloseRef.current.classList.remove('e-no-outline');
      } else if (!popoverCloseRef.current.classList.contains('e-no-outline')) {
        popoverCloseRef.current.classList.add('e-no-outline');
      }
    }
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
      document.body.removeEventListener('keydown', toggleOutline);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  // Positioning functions
  const getTransformStyleValue = useCallback(() => {
    if (posX === 'left') {
      return 'translateX(-91%)';
    } else if (posX === 'right') {
      return 'translateX(-9%)';
    }
    return 'translateX(-50%)';
  }, [posX]);

  function updateStyle(transform: string, right: string, left: string) {
    if (!popoverContentRef.current) {
      return;
    }
    popoverContentRef.current.style.transform = transform;
    popoverContentRef.current.style.right = right;
    popoverContentRef.current.style.left = left;
  }

  function resize() {
    console.log('resizing: ' + maxContentWidth);
    if (!popoverContentRef.current) {
      console.log('popovercontent ref is not');
      return;
    }
    if (!maxContentWidth) {
      console.log('maxcontent is not')
      return;
    }
    if (maxContentWidth + popoverMargin + popoverMargin > window.innerWidth) {
      popoverContentRef.current.style.width = `${window.innerWidth - (2 * popoverMargin)}px`;
    } else {
      popoverContentRef.current.style.width = maxContentWidth + 'px';
    }
  }

  // Initializing vertical position
  useEffect(() => {
    updateStyle(getTransformStyleValue(), 'auto', '50%');
  }, [posX]);

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
    const offsetRight = window.innerWidth - contentWidth - offsetLeft;
    const offsetTop = popoverContentRef.current.getBoundingClientRect().top;
    const offsetBottom = window.innerHeight - contentHeight - offsetTop;
    const triggerWidth = popoverTriggerRef.current.getBoundingClientRect().width;
    const triggerOffsetLeft = popoverTriggerRef.current.getBoundingClientRect().left;
    const triggerOffsetRight = window.innerWidth - triggerWidth - triggerOffsetLeft;
    const arrowWidth = popoverArrowRef.current.getBoundingClientRect().width;
    const arrowHeight = popoverArrowRef.current.getBoundingClientRect().height;
    const arrowLeft = popoverArrowRef.current.getBoundingClientRect().left;
    const arrowRight = window.innerWidth - arrowWidth - arrowLeft;
    const arrowOffsetTop = popoverArrowRef.current.getBoundingClientRect().top;
    const arrowOffsetBottom = window.innerHeight - arrowHeight - arrowOffsetTop;
    // const unsetValue = getInternetExplorerVersion() != -1 ? 'auto' : 'unset';

    resize();
    updatePositionY();
    if (!posX) {
      updateCenterPosition();
    } else if (posX === 'left') {
      updateLeftPosition();
    } else if (posX === 'right') {
      updateRightPosition();
    }

    // Update horizontal position
    function updateCenterPosition() {
      if (moveFromLeft('middle')) {
        updateStyle('none', 'auto', `${-arrowLeft + popoverMargin}px`);
      } else if (moveFromRight('middle')) {
        updateStyle('none', `${-arrowRight + popoverMargin}px`, 'auto');
      } else if (!moveFromRight('middle') && !moveFromLeft('middle')) {
        updateStyle(getTransformStyleValue(), 'auto', '50%');
      }
    }
    function updateLeftPosition() {
      if (moveFromLeft('long')) {
        updateStyle('none', 'auto', `${-arrowLeft + popoverMargin}px`);
      } else if (moveFromRight('short')) {
        updateStyle('none', `${-arrowRight + popoverMargin}px`, 'auto');
      } else if (!moveFromRight('middle') && !moveFromLeft('middle')) {
        updateStyle(getTransformStyleValue(), 'auto', '50%');
      }
    }
    function updateRightPosition() {
      if (moveFromLeft('short')) {
        updateStyle('none', 'auto', `${-arrowLeft + popoverMargin}px`);
      } else if (moveFromRight('long')) {
        updateStyle('none', `${-arrowRight + popoverMargin}px`, 'auto');
      } else if (!moveFromRight('middle') && !moveFromLeft('middle')) {
        updateStyle(getTransformStyleValue(), 'auto', '50%');
      }
    }
    function getArrowOffsetContent(arrowOffsetContentConflictSide: string): number {
      if (arrowOffsetContentConflictSide === 'long') {
        return contentWidth - popoverOffsetArrow;
      } else if (arrowOffsetContentConflictSide === 'short') {
        return popoverOffsetArrow;
      }
      return contentWidth / 2;
    }
    function moveFromLeft(arrowOffsetContentConflictSide: string): boolean {
      const noRoomLeft = offsetLeft <= popoverMargin;
      const noRoomLeftInsurance =
        triggerOffsetLeft + triggerWidth / 2 <=
        popoverMargin + getArrowOffsetContent(arrowOffsetContentConflictSide);
      return noRoomLeft || noRoomLeftInsurance;
    }
    function moveFromRight(arrowOffsetContentConflictSide: string): boolean {
      const noRoomRight = offsetRight <= popoverMargin;
      const noRoomLeftInsurance =
        triggerOffsetRight + triggerWidth / 2 <=
        popoverMargin + getArrowOffsetContent(arrowOffsetContentConflictSide);
      return noRoomRight || noRoomLeftInsurance;
    }

    // Update vertical position
    function updatePositionY() {
      if (moveFromTop() && !popover.classList.contains('ewc-popover--bottom')) {
        popover.classList.add('ewc-popover--bottom');
      } else if (moveFromBottom() && popover.classList.contains('ewc-popover--bottom')) {
        popover.classList.remove('ewc-popover--bottom');
      }
    }
    function moveFromTop(): boolean {
      const noRoomTop = offsetTop <= popoverMargin;
      const isRoomBottom = arrowOffsetBottom > contentHeight + popoverMargin + popoverMargin;
      const isBottom = posY === 'bottom';
      return noRoomTop || (isBottom && isRoomBottom);
    }
    function moveFromBottom(): boolean {
      const noRoomBottom = offsetBottom <= popoverMargin;
      const isRoomTop = offsetTop > popoverMargin;
      const isRoomTopInsurance = arrowOffsetTop > contentHeight + popoverMargin + popoverMargin;
      const isTop = !posY;
      return (noRoomBottom && isRoomTop) || (isTop && isRoomTopInsurance);
    }
  }, [posY, posX, getTransformStyleValue]);

  // Toggle visibility
  useEffect(() => {
    // console.log('hello ' + popoverContentRef.current!.clientWidth );
    function toggleVisibilityClass() {
      if (popoverContentRef.current && visiblePopover) {
        popoverContentRef.current.classList.remove('ewc-popover--hide');
      } else if (popoverContentRef.current) {
        popoverContentRef.current.classList.add('ewc-popover--hide');
      }
    }

    toggleVisibilityClass(); 
    updateNewPosition();
  }, [visiblePopover, updateNewPosition]);

  // Listen to resize changes if popover is open
  useEffect(() => {
    if (!visiblePopover) {
      return;
    }
    const throttledCount = throttle(updateNewPosition, 150);
    window.addEventListener('resize', throttledCount);
    return () => window.removeEventListener('resize', throttledCount);
  }, [visiblePopover, posY, updateNewPosition]);

  return (
    <span className="ewc-popover" ref={popoverRef}>
      <div className="ewc-popover__trigger" ref={popoverTriggerRef}>
        {trigger && <div onClick={togglePopover}>{trigger}</div>}
        {!trigger && <slot name="trigger" onClick={togglePopover} ref={popoverSlotTriggerRef}></slot>}
        <div className="ewc-popover__arrow ewc-popover--hide" ref={popoverArrowRef}></div>
      </div>

      <div className={contentClasses} ref={popoverContentRef}>
        <div className="ewc-popover__close">
          {!noClose && <button
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
          </button>}
        </div>
        {title && <div className="ewc-popover__title">{title}</div>}
        <div className="ewc-popover__text">{description ? description : customContent}</div>
      </div>
    </span>
  );
};

export default Popover;
