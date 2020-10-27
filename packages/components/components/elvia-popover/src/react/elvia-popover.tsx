import * as React from 'react';
import { useState } from 'react';
import './style.scss';

export interface PopoverProps {
  title?: string;
  description?: string;
}

export const Popover: React.FC<PopoverProps> = ({ title, description }) => {
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
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <span className='ewc-popover ewc-popover--bottom ewc-popover--right' id='popover1'>

        <button className='e-btn' onClick={togglePopover}>
          Click me
        </button>

        {visiblePopover ? (
          <div className='ewc-popover__content' id='popover1Content'>
            <div className='ewc-popover__close'>
              <button
                className='e-btn e-btn--icon e-btn--sm'
                onClick={togglePopover}
              >
                <span className='e-btn__icon'>X</span>
              </button>
            </div>
            <div className='ewc-popover__title'>{title}</div>
            <div className='ewc-popover__text'>
              {description}
            </div>
          </div>
        ) : ('')}
      </span>
    </div>
  );
};
