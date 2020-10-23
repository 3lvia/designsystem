import * as React from 'react';
import { useState } from 'react';
import './style.scss';

export interface PopoverProps {
  title?: string;
  description?: string;
}

export const Popover: React.FC<PopoverProps> = ({ title, description }) => {
  let [visiblePopover, setPopoverVisibility] = useState(false);
  const togglePopover = (event: any) => {
    visiblePopover = !visiblePopover;
    setPopoverVisibility(visiblePopover);
  };

  return (
    // <span>
    //   <button className="ewc-popover__button" onClick={togglePopover}>
    //     Show popover
    //   </button>
    //   {visiblePopover ? (
    //     <span className="ewc-popover">
    //       <div className={'ewc-popover__content'}>{title}</div>
    //     </span>
    //   ) : (
    //     ''
    //   )}
    // </span>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <span className='ewc-popover ewc-popover--bottom ewc-popover--right' id='popover1'>

        <button className='e-btn e-btn--icon e-btn--circled' onClick={togglePopover}>
          Click me
        </button>

        {visiblePopover ? (
          <div className='ewc-popover__content' id='popover1Content'>
            <div className='ewc-popover__close'>
              <button
                className='e-btn e-btn--icon e-btn--no-border e-btn--sm'
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
