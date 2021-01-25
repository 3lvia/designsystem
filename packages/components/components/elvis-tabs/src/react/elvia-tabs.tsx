import React, { FC, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './style.scss';
export interface TabItem {
  label: string;
  isDisabled?: boolean;
}
export interface TabsProps {
  items: TabItem[];
  value: number;
  valueOnChange?: (value: number) => void;
  webcomponent?: any;
}

// Will be replaced
const throttle = (func: any, limit: number) => {
  let inThrottle: boolean | NodeJS.Timeout;
  return (...args: any) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Tabs: FC<TabsProps> = ({ items, value, valueOnChange, webcomponent }) => {
  const [currValue, setCurrValue] = useState(value);
  const [isOnRightEnd, setIsOnRightEnd] = useState(true);
  const [isOnLeftEnd, setIsOnLeftEnd] = useState(true);
  const itemsRef = useRef<HTMLDivElement>(null);
  const lengthToScroll = 140;

  useEffect(() => {
    // Update scroll position on init
    setTimeout(() => updateArrowButtonsVisibility());

    // Listen to resize & scroll and update scrolled positions
    if (!itemsRef.current) {
      return;
    }
    const throttledResizeCount = throttle(updateArrowButtonsVisibility, 150);

    window.addEventListener('resize', throttledResizeCount);
    itemsRef.current.addEventListener('scroll', updateArrowButtonsVisibility);
    return () => {
      window.removeEventListener('resize', throttledResizeCount);
      if (itemsRef.current) {
        itemsRef.current.removeEventListener('scroll', updateArrowButtonsVisibility);
      }
    };
  }, []);

  // Updating selected value
  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [currValue]);

  const updateReactComponent = () => {
    if (!webcomponent && valueOnChange) {
      valueOnChange(currValue);
    }
  };

  const updateWebcomponent = () => {
    if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: currValue }, true);
    }
  };

  const scrollToLeft = () => {
    if (!itemsRef.current) {
      return;
    }
    itemsRef.current.scrollLeft -= lengthToScroll;
    updateArrowButtonsVisibility();
  };

  const scrollToRight = () => {
    if (!itemsRef.current) {
      return;
    }
    itemsRef.current.scrollLeft += lengthToScroll;
    updateArrowButtonsVisibility();
  };

  const updateArrowButtonsVisibility = () => {
    if (!itemsRef.current) {
      return;
    }
    const endOfItem = itemsRef.current.scrollWidth - itemsRef.current.getBoundingClientRect().width;
    const isOnRight = itemsRef.current.scrollLeft >= endOfItem - 1;
    const isOnLeft = itemsRef.current.scrollLeft <= 1;
    setIsOnRightEnd(isOnRight);
    setIsOnLeftEnd(isOnLeft);
  };

  const arrowLeftClasses = classNames('ewc-tabs__arrow', {
    ['ewc-tabs__arrow--hide']: isOnLeftEnd,
    ['ewc-tabs__arrow--remove']: isOnRightEnd && isOnLeftEnd,
  });
  const arrowRightClasses = classNames('ewc-tabs__arrow', {
    ['ewc-tabs__arrow--hide']: isOnRightEnd,
    ['ewc-tabs__arrow--remove']: isOnRightEnd && isOnLeftEnd,
  });
  const itemsClasses = classNames('ewc-tabs__items', {
    ['ewc-tabs--hide-fade-right']: isOnRightEnd,
    ['ewc-tabs--hide-fade-left']: isOnLeftEnd,
    ['ewc-tabs--scrolling']: !isOnLeftEnd || !isOnRightEnd,
  });

  return (
    <div className="ewc-tabs">
      <div className={arrowLeftClasses} onClick={() => scrollToLeft()}>
        <i
          className="ewc-icon ewc-icon--arrow_left-bold ewc-icon--xxs"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.716 23.122a2.89 2.89 0 00-.08-4.04L11.373 12l7.261-7.082a2.89 2.89 0 00.081-4.04A2.782 2.782 0 0014.74.796L5.365 9.939A2.88 2.88 0 004.5 12c0 .778.312 1.522.865 2.061l9.375 9.143a2.782 2.782 0 003.976-.082z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
          }}
          e-id="e-icone-icon--arrow_left-bold"
        ></i>
      </div>

      <div className={itemsClasses}>
        <div className="ewc-tabs__scroll" ref={itemsRef}>
          {items &&
            items.map((item, i) => (
              <button
                className={`ewc-tabs__label ${value === i && 'ewc-tabs__label--selected'}`}
                key={i}
                onClick={() => setCurrValue(i)}
                disabled={item.isDisabled}
              >
                {item.label}
              </button>
            ))}
        </div>
      </div>

      <div className={arrowRightClasses} onClick={() => scrollToRight()}>
        <i
          className="ewc-icon ewc-icon--arrow_right-bold ewc-icon--xxs"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.284.878a2.89 2.89 0 00.08 4.04L12.627 12l-7.261 7.082a2.89 2.89 0 00-.081 4.04 2.782 2.782 0 003.976.082l9.375-9.143A2.88 2.88 0 0019.5 12a2.88 2.88 0 00-.865-2.061L9.26.796a2.782 2.782 0 00-3.976.082z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
          }}
          e-id="e-icone-icon--arrow_right-bold"
        ></i>
      </div>
    </div>
  );
};

export default Tabs;
