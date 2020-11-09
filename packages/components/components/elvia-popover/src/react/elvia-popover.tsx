import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import './style.scss';

export interface PopoverProps {
  title: string;
  description: string;
  posX?: string;
  posY?: string;
  trigger?: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const throttle = (func: any, limit: number) => {
  let inThrottle: boolean | NodeJS.Timeout
  return (...args: any) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const Popover: React.FC<PopoverProps> = ({ title, description, posX, posY, trigger }) => {
  const [visiblePopover, setPopoverVisibility] = useState(false);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverSlotTriggerRef = useRef<HTMLSlotElement>(null);
  const popoverArrowRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverCloseRef = useRef<HTMLButtonElement>(null);
  const popoverMargin = 20;
  const popoverOffsetArrow = 40;

  // Running on first render only (on mount)
  useEffect(() => {
    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    function toggleOutline(e: KeyboardEvent) {
      if (!popoverCloseRef.current) {return;}
      if (e.key === 'Tab') {
        popoverCloseRef.current.classList.remove('e-no-outline');
      } else if (!popoverCloseRef.current.classList.contains('e-no-outline')) {
        popoverCloseRef.current.classList.add('e-no-outline');
      }
    }

    function handleClickOutside(e: any) {
      if(popoverSlotTriggerRef.current ===  e.path[1] && popoverContentRef.current && !popoverContentRef.current.classList.contains('ewc-popover--hide')){
        return;
      }
      if (popoverRef.current && !popoverRef.current.contains(e.path[0]) && popoverContentRef.current && !popoverContentRef.current.classList.contains('ewc-popover--hide')) {
        togglePopover();
      }
    }

    // Listen to tab events and click outside popover 
    document.body.addEventListener('keydown', e => toggleOutline(e));
    document.addEventListener('click', handleClickOutside);

    // Remove listeners
    return () => {
      document.body.removeEventListener('keydown', toggleOutline);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); 

  // Closing and opening popover
  function togglePopover() {
    setPopoverVisibility(prevState => !prevState);
  }

  const getTransformStyleValue = useCallback(() => {
    if(posX === 'left') {
      return 'translateX(-91%)';
    } else if(posX === 'right') {
      return 'translateX(-9%)';
    }
    return 'translateX(-50%)';
  }, [posX]);

  function updateStyle(content: HTMLDivElement, transform: string, right: string, left: string){
    content.style.transform = transform;
    content.style.right = right;
    content.style.left = left;
  }

  // Initializing vertical position
  useEffect(() => {
    if(posX === 'right' && popoverContentRef.current){
      updateStyle(popoverContentRef.current, getTransformStyleValue(), 'unset', '50%');
    } else if(posX === 'left' && popoverContentRef.current) {
      updateStyle(popoverContentRef.current, 'unset', getTransformStyleValue(), '50%');
    }
  }, [posX, getTransformStyleValue]); 

  // Update position and size of content
  const updateNewPosition = useCallback(() => {
    if(!popoverRef.current || !popoverArrowRef.current || !popoverContentRef.current || !popoverTriggerRef.current) {
      return;
    }
    const popover = popoverRef.current; 
    const content = popoverContentRef.current; 
    const contentWidth = content.getBoundingClientRect().width;
    const contentHeight = content.getBoundingClientRect().height;
    const offsetLeft = content.getBoundingClientRect().left;
    const offsetRight = window.innerWidth - contentWidth - offsetLeft;
    const offsetTop = content.getBoundingClientRect().top;
    const offsetBottom = window.innerHeight - contentHeight - offsetTop;
    const trigger = popoverTriggerRef.current;
    const triggerWidth = trigger.getBoundingClientRect().width;
    const triggerOffsetLeft = trigger.getBoundingClientRect().left;
    const triggerOffsetRight = window.innerWidth - triggerWidth - triggerOffsetLeft;
    const arrow = popoverArrowRef.current;
    const arrowWidth = arrow.getBoundingClientRect().width;
    const arrowHeight = arrow.getBoundingClientRect().height;
    const arrowLeft = arrow.getBoundingClientRect().left;
    const arrowRight = window.innerWidth - arrowWidth - arrowLeft;
    const arrowOffsetTop = arrow.getBoundingClientRect().top;
    const arrowOffsetBottom = window.innerHeight - arrowHeight - arrowOffsetTop;

    function getArrowOffsetContent(arrowOffsetContentConflictSide: string): number {
      if(arrowOffsetContentConflictSide === 'long') {
        return contentWidth - popoverOffsetArrow;
      } else if(arrowOffsetContentConflictSide === 'short') {
        return popoverOffsetArrow;
      }
      return contentWidth/2;
    }
    function positionConflictLeft(arrowOffsetContentConflictSide: string): boolean {
      return offsetLeft <= popoverMargin || (triggerOffsetLeft + (triggerWidth/2)) <= (popoverMargin + getArrowOffsetContent(arrowOffsetContentConflictSide));
    }
    function positionConflictRight(arrowOffsetContentConflictSide: string): boolean {
      return offsetRight <= popoverMargin || (triggerOffsetRight + (triggerWidth/2)) <= (popoverMargin + getArrowOffsetContent(arrowOffsetContentConflictSide));
    }
    function resize(content: HTMLDivElement) {
        if ((450 + popoverMargin + popoverMargin) > window.innerWidth) {
        content.style.width = 'calc(' + window.innerWidth + 'px - ' + (popoverMargin + popoverMargin) + 'px)';
      } else {
        content.style.width = '450px';
      }
    }
    function updateCenterPosition() {
      if(positionConflictLeft('middle')) {
        updateStyle(content, 'none' , 'unset', `calc(-${arrowLeft}px + ${popoverMargin}px)`);
      } else if (positionConflictRight('middle')) {
        updateStyle(content, 'none' , `calc(-${arrowRight}px + ${popoverMargin}px)`, 'unset');
      } else if (!positionConflictRight('middle') && !positionConflictLeft('middle')) {
        updateStyle(content, getTransformStyleValue() , 'unset', '50%');
      }
    }
    function updateLeftPosition() {
      if(positionConflictLeft('long')){
        updateStyle(content, 'none' , 'unset', `calc(-${arrowLeft}px + ${popoverMargin}px)`);
      } else if (positionConflictRight('short')){
        updateStyle(content, 'none' , `calc(-${arrowRight}px + ${popoverMargin}px)`, 'unset');
      } else if (!positionConflictRight('middle') && !positionConflictLeft('middle')){
        updateStyle(content, getTransformStyleValue() , 'unset', '50%');
      }
    }
    function updateRightPosition() {
      if(positionConflictLeft('short')){
        updateStyle(content, 'none' , 'unset', 'calc(-' + arrowLeft + 'px + ' + popoverMargin + 'px)');
      } else if (positionConflictRight('long')){
        updateStyle(content, 'none' , `calc(-${arrowRight}px + ${popoverMargin}px)`, 'unset');
      } else if (!positionConflictRight('middle') && !positionConflictLeft('middle')){
        updateStyle(content, getTransformStyleValue() , 'unset', '50%');
      }
    }
    function updatePositionY() {
      if((offsetTop <= popoverMargin) || (posY === 'bottom' && (arrowOffsetBottom > contentHeight + popoverMargin + popoverMargin))){
        if(popover && !popover.classList.contains('ewc-popover--bottom')){
          popover.classList.add('ewc-popover--bottom');
        }
      } else if ((offsetBottom <= popoverMargin && offsetTop > popoverMargin) || (!posY && (arrowOffsetTop > contentHeight + popoverMargin + popoverMargin))){
        if(popover && popover.classList.contains('ewc-popover--bottom')){
          popover.classList.remove('ewc-popover--bottom');
        }
      }
    }

    // Calling methods
    resize(content);
    if (!posX) {
      updateCenterPosition();
    } else if(posX === 'left') {
      updateLeftPosition();
    } else if(posX === 'right') {
      updateRightPosition();
    }
    updatePositionY();
  }, [posY, posX, getTransformStyleValue]);


  // Toggle visibility 
  useEffect(() => { 
    function toggleVisibilityClass() {
      if(popoverArrowRef.current && popoverContentRef.current && visiblePopover){
        popoverArrowRef.current.classList.remove('ewc-popover--hide');
        popoverContentRef.current.classList.remove('ewc-popover--hide');
      } else if (popoverArrowRef.current && popoverContentRef.current) {
        popoverArrowRef.current.classList.add('ewc-popover--hide');
        popoverContentRef.current.classList.add('ewc-popover--hide');
      }
    }

    toggleVisibilityClass(); 
    updateNewPosition(); 
  }, [visiblePopover, updateNewPosition]);

  // Listen to resize changes if popover is open
  useEffect(() => {
    if(!visiblePopover){
      return;
    }
    const throttledCount = throttle(updateNewPosition, 150);
    window.addEventListener('resize', throttledCount);
    return () => window.removeEventListener('resize', throttledCount);
  }, [visiblePopover, posY, updateNewPosition]); 

  return (
    <span className='ewc-popover' ref={popoverRef}>
      <div className='ewc-popover__trigger' ref={popoverTriggerRef}>
        {trigger && <div onClick={togglePopover}>{trigger}</div>}
        {!trigger && <slot name="trigger" onClick={togglePopover} ref={popoverSlotTriggerRef}></slot>}
        <div className='ewc-popover__arrow ewc-popover--hide' ref={popoverArrowRef}></div>
      </div>
      
      <div className='ewc-popover__content ewc-popover--hide' ref={popoverContentRef}>
        <div className='ewc-popover__close'>
          <button
            className='ewc-btn ewc-btn--icon ewc-btn--sm e-no-outline'
            onClick={togglePopover}
            ref={popoverCloseRef}
          >
            <span className='ewc-btn__icon'>
              <i className="ewc-icon ewc-icon--close-bold ewc-icon--xs" style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath d='M14.3 12.179a.25.25 0 010-.354l9.263-9.262A1.5 1.5 0 1021.439.442L12.177 9.7a.25.25 0 01-.354 0L2.561.442A1.5 1.5 0 00.439 2.563L9.7 11.825a.25.25 0 010 .354L.439 21.442a1.5 1.5 0 102.122 2.121l9.262-9.263a.25.25 0 01.354 0l9.262 9.263a1.5 1.5 0 002.122-2.121L14.3 12.179z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`}} e-id="e-icone-icon--close-bold"></i>
            </span>
          </button>
        </div>
        <div className='ewc-popover__title'>{title}</div>
        <div className='ewc-popover__text'>
          {description}
        </div>
      </div>
    </span>
  );
};
