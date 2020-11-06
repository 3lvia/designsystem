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
  const popoverOffsetTrigger = 60;

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

    // Listen to tab events and add/remove outline
    document.body.addEventListener('keydown', e => toggleOutline(e));
    // Listen for click outside popover 
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('keydown', toggleOutline);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); 

  // Closing and opening popover
  function togglePopover() {
    setPopoverVisibility(prevState => !prevState);
  }
  
  // Calculating position and size of content
  const calculatePosition = useCallback(() => {
    function resize(content: HTMLDivElement) {
        if ((450 + popoverMargin + popoverMargin) > window.innerWidth) {
        content.style.width = 'calc(' + window.innerWidth + 'px - ' + (popoverMargin + popoverMargin) + 'px)';
      } else {
        content.style.width = '450px';
      }
    }
    function updatePositionXCenter(content: HTMLDivElement, contentWidth: number, offsetLeft: number, offsetRight: number, triggerWidth: number, triggerOffsetLeft: number, triggerOffsetRight: number, arrowLeft: number, arrowRight: number) {
      if(offsetLeft <= popoverMargin || (triggerOffsetLeft + (triggerWidth/2)) < (popoverMargin + (contentWidth/2))){
        moveFromLeft(content, arrowLeft);
      } else if (offsetRight <= popoverMargin || (triggerOffsetRight + (triggerWidth/2)) < (popoverMargin + (contentWidth/2))){
        moveFromRight(content, arrowRight);
      } else if (triggerOffsetLeft + (triggerWidth/2) > (popoverMargin + (contentWidth/2)) && (triggerOffsetRight + (triggerWidth/2)) > (popoverMargin + (contentWidth/2))){
        resetPos(content);
      }
    }
    function updatePositionXLeft(content: HTMLDivElement, contentWidth: number, offsetLeft: number, offsetRight: number, triggerWidth: number, triggerOffsetLeft: number, triggerOffsetRight: number, arrowLeft: number, arrowRight: number) {
      if(offsetLeft <= popoverMargin || (triggerOffsetLeft + (triggerWidth/2)) < (popoverMargin + (contentWidth - popoverOffsetTrigger))){
        moveFromLeft(content, arrowLeft);
      } else if (offsetRight <= popoverMargin){
        moveFromRight(content, arrowRight);
      } else if (triggerOffsetLeft + (triggerWidth/2) > (popoverMargin + (contentWidth/2)) && (triggerOffsetRight + (triggerWidth/2)) > (popoverMargin + (contentWidth/2))){
        resetPos(content);
      }
    }
    function updatePositionXRight(content: HTMLDivElement, contentWidth: number, offsetLeft: number, offsetRight: number, triggerWidth: number, triggerOffsetLeft: number, triggerOffsetRight: number, arrowLeft: number, arrowRight: number) {
      if(offsetLeft <= popoverMargin){
        moveFromLeft(content, arrowLeft);
      } else if (offsetRight <= popoverMargin || (triggerOffsetRight + (triggerWidth/2)) < (popoverMargin + (contentWidth - popoverOffsetTrigger))){
        moveFromRight(content, arrowRight);
      } else if (triggerOffsetLeft + (triggerWidth/2) > (popoverMargin + (contentWidth/2)) && (triggerOffsetRight + (triggerWidth/2)) > (popoverMargin + (contentWidth/2))){
        resetPos(content);
      }
    }
    function updatePositionY(popover: HTMLSpanElement, contentHeight: number, offsetTop: number, offsetBottom: number, arrowOffsetBottom: number, arrowOffsetTop: number) {
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
    function moveFromLeft(content: HTMLDivElement, arrowLeft: number){
      content.style.transform = 'none' 
      content.style.right = 'unset';
      content.style.left = 'calc(-' + arrowLeft + 'px + ' + popoverMargin + 'px)';
    }
    function moveFromRight(content: HTMLDivElement, arrowRight: number){
      content.style.transform = 'none' 
      content.style.left = 'unset';
      content.style.right = 'calc(-' + arrowRight + 'px + ' + popoverMargin + 'px)';
    }
    function resetPos(content: HTMLDivElement){
      content.style.transform = getTranslateValue();
      content.style.left = '50%';
      content.style.right = 'unset';
    }
    function getTranslateValue(): string {
      if(posX === 'left') {
        return 'translateX(-87%)';
      } else if(posX === 'right') {
        return 'translateX(-9%)';
      }
      return 'translateX(-50%)';
    }

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

    resize(content);
    if (!posX) {
      updatePositionXCenter(content, contentWidth, offsetLeft, offsetRight, triggerWidth, triggerOffsetLeft, triggerOffsetRight,  arrowLeft, arrowRight);
    } else if(posX === 'left') {
      updatePositionXLeft(content, contentWidth, offsetLeft, offsetRight, triggerWidth, triggerOffsetLeft, triggerOffsetRight,  arrowLeft, arrowRight);
    } else if(posX === 'right') {
      updatePositionXRight(content, contentWidth, offsetLeft, offsetRight, triggerWidth, triggerOffsetLeft, triggerOffsetRight,  arrowLeft, arrowRight);
    }
    updatePositionY(popover, contentHeight, offsetTop, offsetBottom, arrowOffsetBottom, arrowOffsetTop);
  }, [posY, posX]);


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
    calculatePosition(); 
  }, [visiblePopover, calculatePosition]);

  // Listen to resize changes if popover is open
  useEffect(() => {
    if(!visiblePopover){
      return;
    }
    const throttledCount = throttle(calculatePosition, 150);
    window.addEventListener('resize', throttledCount);
    return () => window.removeEventListener('resize', throttledCount);
  }, [visiblePopover, posY, calculatePosition]); 

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
