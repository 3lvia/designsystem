import * as React from 'react';
import { useState } from 'react';
import './style.scss';

export interface PopoverProps {
  title: string;
  description: string;
  trigger?: string;
}

export const Popover: React.FC<PopoverProps> = ({ title, description, trigger }) => {
  // eslint-disable-next-line prefer-const
  let [visiblePopover, setPopoverVisibility] = useState(false);
  const togglePopover = () => {
    visiblePopover = !visiblePopover;
    setPopoverVisibility(visiblePopover);
  };

  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }, []);

  return (
    <span className='ewc-popover ewc-popover--bottom ewc-popover--right' id='popover'>
      <div className='ewc-popover__trigger'>
        {trigger && <div onClick={togglePopover}>{trigger}</div>}
        {!trigger && <slot name="trigger" onClick={togglePopover}></slot>}
        {visiblePopover && <div className="ewc-popover__arrow"></div>}
      </div>

      {visiblePopover &&
        <div className='ewc-popover__content' id='popoverContent'>
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
      }
    </span>
  );
};
