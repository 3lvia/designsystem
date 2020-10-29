import * as React from 'react';
import { useState } from 'react';
import './style.scss';

export interface PopoverProps {
  title: string;
  description: string;
  trigger?: string;
}

export const Popover: React.FC<PopoverProps> = ({ title, description, trigger }) => {
  const [visiblePopover, setPopoverVisibility] = useState(false);
  const [popoverRef, setPopoverRef] = useState(React.createRef<HTMLDivElement>());
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
    // window.addEventListener('DOMContentLoaded', calculatePosition);
    window.addEventListener('resize', calculatePosition);
    calculatePosition();
  }, []);

  React.useEffect(() => { toggleVisibilityClass(); }, [visiblePopover]);
  React.useEffect(() => { 
    setPopoverRef(prevState => prevState); 
    setPopoverArrowRef(prevState => prevState);
    setPopoverContentRef(prevState => prevState);
  }, [popoverRef, popoverArrowRef, popoverContentRef]);

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

  // Calculating position and size of content
  function calculatePosition(){
    if(!popoverRef.current || !popoverArrowRef.current || !popoverContentRef.current) {
      return;
    }

    let initialPosX = '-50%';
    if(popoverRef.current.classList.contains('ewc-popover--right')){
      initialPosX = '-0%';
    } else if(popoverRef.current.classList.contains('ewc-popover--left')){
      initialPosX = '-9%';
    }
    const content = popoverContentRef.current;
    const contentWidth = content.getBoundingClientRect().width;
    const contentHeight = content.getBoundingClientRect().height;
    const offsetLeft = content.getBoundingClientRect().left;
    const offsetRight = window.innerWidth - contentWidth - offsetLeft;
    const offsetTop = content.getBoundingClientRect().top;
    const offsetBottom = window.innerHeight - contentHeight - offsetTop;
    updatePositionX(content, contentWidth, offsetLeft, offsetRight, initialPosX);
    updatePositionY(content, contentHeight, offsetTop, offsetBottom);
  }

  function updatePositionX(content: HTMLDivElement, contentWidth: number, offsetLeft: number, offsetRight: number, initialPosX: string) {
    console.log(offsetLeft);
    console.log(offsetRight);
    // Reposition
    if(offsetLeft <= 20 && offsetRight > 20){
      content.setAttribute('style', 'transform: translateX(calc(' + initialPosX + ' + 1%))');
    } else if (offsetRight <= 20 && offsetLeft > 20){
      content.setAttribute('style', 'transform: translateX(calc(' + initialPosX + ' - 1px))');
    } else if (offsetLeft > 40 && offsetRight > 40){
      content.setAttribute('style', 'transform: translateX(-50%)');
    }

    // Resize
    if (offsetLeft <= 20 && offsetRight <= 20) {
      content.setAttribute('style', 'width: calc(' + contentWidth + 'px + ' + (offsetLeft - 20) + 'px - 1px)');
    } else if (offsetLeft > 20 && offsetRight > 20 && contentWidth < 450){
      content.setAttribute('style', 'width: calc(' + contentWidth + 'px + ' + (offsetLeft - 20) +'px + 1px)');
    } 
  }

  function updatePositionY(content: HTMLDivElement, contentHeight: number, offsetTop: number, offsetBottom: number) {
    if(offsetTop <= 25){
      console.log('popover to the bottom');
      if(popoverRef.current && !popoverRef.current.classList.contains('ewc-popover--bottom')){
        popoverRef.current.classList.add('ewc-popover--bottom');
      }
      content.style.top = '' + (offsetTop + 1) + 'px';
    } else if (offsetBottom <= 25 && offsetTop > 25){
      console.log('popover to the top');
      if(popoverRef.current && popoverRef.current.classList.contains('ewc-popover--bottom')){
        popoverRef.current.classList.remove('ewc-popover--bottom');
      }
      content.style.top = '' + (offsetTop + contentHeight - 1) + 'px';
    }
  }

  return (
    <span className='ewc-popover' id='ewcPopover' ref={popoverRef}>
      <div className='ewc-popover__trigger'>
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
