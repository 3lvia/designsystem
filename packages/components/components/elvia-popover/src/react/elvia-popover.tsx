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
      <div onClick={togglePopover} className='ewc-popover__trigger'>{trigger}</div>
      <slot name="trigger" onClick={togglePopover} className='ewc-popover__trigger'></slot>

      {visiblePopover ? (
        <div className='ewc-popover__content' id='popoverContent'>
          <div className='ewc-popover__close'>
            <button
              className='e-btn e-btn--icon e-btn--sm'
              onClick={togglePopover}
            >
              <span className='e-btn__icon'>
                {/* <link rel="stylesheet" href="https://cdn.elvia.io/npm/elvis-3.3.0/css/elvis.min.css" integrity="sha512-9SL6LNIYApjzQpVbwJY7VbgBSunf2M7xemML1ODtR8UwpIkOtcOBn3EGRL7ZvEqrdgg4zq7c07o9gfyQIILpug==" crossorigin="anonymous">
                <i className="e-icon" style="background-image: url(&quot;data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.78 1.28A.75.75 0 0022.72.218L12 10.939 1.28.218a.75.75 0 00-1.06 1.06L10.94 12 .22 22.719a.75.75 0 001.06 1.06L12 13.06l10.72 10.72a.75.75 0 001.06-1.06l-10.72-10.72 10.72-10.72z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e&quot;);" e-id="e-icone-icon--close"></i> */}
              </span>
            </button>
          </div>
          <div className='ewc-popover__title'>{title}</div>
          <div className='ewc-popover__text'>
            {description}
          </div>
        </div>
      ) : ('')}
    </span>
  );
};
