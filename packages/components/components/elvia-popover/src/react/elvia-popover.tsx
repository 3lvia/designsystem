import * as React from 'react';
import { useState } from 'react';
import './style.scss';

export interface PopoverProps {
  title: string;
  description: string;
  trigger?: string;
  startPos?: string;
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

export const Popover: React.FC<PopoverProps> = ({ title, description, trigger, startPos = 'center' }) => {
  const [visiblePopover, setPopoverVisibility] = useState(false);
  const [popoverRef, setPopoverRef] = useState(React.createRef<HTMLDivElement>());
  const [popoverTriggerRef, setPopoverTriggerRef] = useState(React.createRef<HTMLDivElement>());
  const [popoverArrowRef, setPopoverArrowRef] = useState(React.createRef<HTMLDivElement>());
  const [popoverContentRef, setPopoverContentRef] = useState(React.createRef<HTMLDivElement>());
  
  React.useEffect(() => {
    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    // Listen to changes in dom to update content position
    calculatePosition();
    const throttledCount = throttle(calculatePosition, 150);
    window.addEventListener('resize', throttledCount);
    return () => window.removeEventListener('resize', throttledCount);
  }, []); 
  
  // React.useEffect(() => {
  //   // Listen for click outside popover 
  //   document.addEventListener("click", handleClickOutside, false);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, false);
  //   };
  // }, []);

  React.useEffect(() => { toggleVisibilityClass(); }, [visiblePopover]);
  React.useEffect(() => { 
    setPopoverRef(prevState => prevState); 
    setPopoverTriggerRef(prevState => prevState); 
    setPopoverArrowRef(prevState => prevState);
    setPopoverContentRef(prevState => prevState);
  }, [popoverRef, popoverTriggerRef, popoverArrowRef, popoverContentRef]);

  // Calculating position and size of content
  function calculatePosition(){
    if(!popoverRef.current || !popoverArrowRef.current || !popoverContentRef.current || !popoverTriggerRef.current) {
      return;
    }
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
    const triggerOffsetRight= window.innerWidth - triggerWidth - triggerOffsetLeft;
    const arrow = popoverArrowRef.current;
    const arrowWidth = arrow.getBoundingClientRect().width;
    const arrowLeft = arrow.getBoundingClientRect().left;
    const arrowRight = window.innerWidth - arrowWidth - arrowLeft;
    resize(content);
    if (startPos === 'center') {
      updatePositionXCenter(content, contentWidth, offsetLeft, offsetRight, triggerWidth, triggerOffsetLeft, triggerOffsetRight,  arrowLeft, arrowRight);
    } else if(startPos === 'left') {
      updatePositionXLeft(content, contentWidth, offsetLeft, offsetRight, triggerWidth, triggerOffsetLeft, triggerOffsetRight,  arrowLeft, arrowRight);
    } else if(startPos === 'right') {
      updatePositionXRight(content, contentWidth, offsetLeft, offsetRight, triggerWidth, triggerOffsetLeft, triggerOffsetRight,  arrowLeft, arrowRight);
    }
    updatePositionY(offsetTop, offsetBottom);
  }

  function getTranslateValue(): string {
    if(startPos === 'left') {
      return 'translateX(-87%)';
    } else if(startPos === 'right') {
      return 'translateX(-9%)';
    }
    return 'translateX(-50%)';
  }

  function resize(content: HTMLDivElement) {
     if ((450 + 40) > window.innerWidth) {
      content.style.width = 'calc(' + window.innerWidth + 'px - 40px)';
    } else {
      content.style.width = '450px';
    }
  }

  function updatePositionXCenter(content: HTMLDivElement, contentWidth: number, offsetLeft: number, offsetRight: number, triggerWidth: number, triggerOffsetLeft: number, triggerOffsetRight: number, arrowLeft: number, arrowRight: number) {
    if(offsetLeft <= 20 || (triggerOffsetLeft + (triggerWidth/2)) < (20 + (contentWidth/2))){
      moveToTheLeft(content, arrowLeft);
    } else if (offsetRight <= 20 || (triggerOffsetRight + (triggerWidth/2)) < (20 + (contentWidth/2))){
      moveToTheRight(content, arrowRight);
    } else if (triggerOffsetLeft + (triggerWidth/2) > (20 + (contentWidth/2)) && (triggerOffsetRight + (triggerWidth/2)) > (20 + (contentWidth/2))){
      resetPos(content);
    }
  }

  function updatePositionXLeft(content: HTMLDivElement, contentWidth: number, offsetLeft: number, offsetRight: number, triggerWidth: number, triggerOffsetLeft: number, triggerOffsetRight: number, arrowLeft: number, arrowRight: number) {
    if(offsetLeft <= 20 || (triggerOffsetLeft + (triggerWidth/2)) < (20 + (contentWidth - 60))){
      moveToTheLeft(content, arrowLeft);
    } else if (offsetRight <= 20){
      moveToTheRight(content, arrowRight);
    } else if (triggerOffsetLeft + (triggerWidth/2) > (20 + (contentWidth/2)) && (triggerOffsetRight + (triggerWidth/2)) > (20 + (contentWidth/2))){
      resetPos(content);
    }
  }

  function updatePositionXRight(content: HTMLDivElement, contentWidth: number, offsetLeft: number, offsetRight: number, triggerWidth: number, triggerOffsetLeft: number, triggerOffsetRight: number, arrowLeft: number, arrowRight: number) {
    if(offsetLeft <= 20){
      moveToTheLeft(content, arrowLeft);
    } else if (offsetRight <= 20 || (triggerOffsetRight + (triggerWidth/2)) < (20 + (contentWidth - 60))){
      moveToTheRight(content, arrowRight);
    } else if (triggerOffsetLeft + (triggerWidth/2) > (20 + (contentWidth/2)) && (triggerOffsetRight + (triggerWidth/2)) > (20 + (contentWidth/2))){
      resetPos(content);
    }
  }

  function moveToTheLeft(content: HTMLDivElement, arrowLeft: number){
    content.style.transform = 'none' 
    content.style.right = 'unset';
    content.style.left = 'calc(-' + arrowLeft + 'px + 20px)';
  }

  function moveToTheRight(content: HTMLDivElement, arrowRight: number){
    content.style.transform = 'none' 
    content.style.right = 'unset';
    content.style.left = 'calc(-' + arrowRight + 'px + 20px)';
  }

  function resetPos(content: HTMLDivElement){
    content.style.transform = getTranslateValue();
    content.style.left = '50%';
    content.style.right = 'unset';
  }

  function updatePositionY(offsetTop: number, offsetBottom: number) {
    if(offsetTop <= 20){
      if(popoverRef.current && !popoverRef.current.classList.contains('ewc-popover--bottom')){
        popoverRef.current.classList.add('ewc-popover--bottom');
      }
    } else if (offsetBottom <= 20 && offsetTop > 20){
      if(popoverRef.current && popoverRef.current.classList.contains('ewc-popover--bottom')){
        popoverRef.current.classList.remove('ewc-popover--bottom');
      }
    }
  }

  // Closing and opening logic
  function togglePopover() {
    setPopoverVisibility(prevState => !prevState);
  }

  function toggleVisibilityClass() {
    if(popoverArrowRef.current && popoverContentRef.current && visiblePopover){
      popoverArrowRef.current.classList.remove('ewc-popover--hide');
      popoverContentRef.current.classList.remove('ewc-popover--hide');
    } else if (popoverArrowRef.current && popoverContentRef.current) {
      popoverArrowRef.current.classList.add('ewc-popover--hide');
      popoverContentRef.current.classList.add('ewc-popover--hide');
    }
  }

  function handleClickOutside(event: { target: Node | null }) {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      console.log(popoverRef.current);
      console.log(event.target);
      console.log('You clicked outside of me!');
    }
  }

  return (
    <span className='ewc-popover' id='ewcPopover' ref={popoverRef}>
      <div className='ewc-popover__trigger' ref={popoverTriggerRef}>
        {trigger && <div onClick={togglePopover}>{trigger}</div>}
        {!trigger && <slot name="trigger" onClick={togglePopover}></slot>}
        <div className='ewc-popover__arrow ewc-popover--hide' id='ewcPopoverArrow' ref={popoverArrowRef}></div>
      </div>
      
      <div className='ewc-popover__content ewc-popover--hide' id='ewcPopoverContent' ref={popoverContentRef}>
        <div className='ewc-popover__close'>
          <button
            className='ewc-btn ewc-btn--icon ewc-btn--sm'
            onClick={togglePopover}
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
