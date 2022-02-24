import React, { FC, useEffect, useState, useRef, CSSProperties } from 'react';
import classNames from 'classnames';
import toolbox from '@elvia/elvis-toolbox';
import './style.scss';
export interface TabsProps {
  items: string[];
  value: number;
  isInverted: boolean;
  hasManualActivation: boolean;
  valueOnChange?: (value: number) => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: any;
}

const Tabs: FC<TabsProps> = ({
  items,
  value = 0,
  isInverted,
  hasManualActivation = false,
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const [currValue, setCurrValue] = useState(value);
  const [isOnRightEnd, setIsOnRightEnd] = useState(true);
  const [isOnLeftEnd, setIsOnLeftEnd] = useState(true);
  const [tabInFocus, setTabInFocus] = useState(value);
  const tabsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const tabGroup = Math.random();
  const lengthToScroll = 140;
  const scrollSteps = 12;

  useEffect(() => {
    // Start outline listener
    toolbox.outlineListener(tabsRef.current);

    // Listen to resize & scroll and update scrolled positions
    if (!itemsRef.current) {
      return;
    }
    const throttledResizeCount = toolbox.throttle(updateArrowVisibility, 100);
    const throttledScrollCount = toolbox.throttle(updateArrowVisibility, 50);

    window.addEventListener('resize', throttledResizeCount);
    itemsRef.current.addEventListener('scroll', throttledScrollCount);

    return () => {
      // Remove outline listener
      toolbox.outlineListener(tabsRef.current, true);

      window.removeEventListener('resize', throttledResizeCount);
      if (!itemsRef.current) {
        return;
      }
      itemsRef.current.removeEventListener('scroll', throttledScrollCount);
    };
  }, []);

  useEffect(() => {
    // Update scroll position on init
    updateArrowVisibility();
    if (!itemsRef.current) {
      return;
    }
    itemsRef.current.addEventListener('keydown', updateFocusedElement);
    return () => {
      if (!itemsRef.current) {
        return;
      }
      itemsRef.current.removeEventListener('keydown', updateFocusedElement);
    };
  });

  useEffect(() => {
    setCurrValue(value);
    setTabInFocus(value);
  }, [value]);

  const updateValue = (value: number) => {
    setCurrValue(value);
    if (!webcomponent && valueOnChange) {
      valueOnChange(value);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: value }, true);
    }
  };

  const updateArrowVisibility = () => {
    if (!itemsRef.current || !tabsRef.current) {
      return;
    }
    const overflowing = itemsRef.current.scrollWidth - tabsRef.current.getBoundingClientRect().width;
    if (overflowing < 1) {
      setIsOnRightEnd(true);
      setIsOnLeftEnd(true);
    } else {
      const isOnRight = itemsRef.current.scrollLeft >= overflowing;
      const isOnLeft = itemsRef.current.scrollLeft <= 0;
      setIsOnRightEnd(isOnRight);
      setIsOnLeftEnd(isOnLeft);
    }
  };

  const updateFocusedElement = (e: KeyboardEvent) => {
    if (!itemsRef.current) {
      return;
    }
    const tabs = itemsRef.current;
    const tabsCollection = tabs.children as HTMLCollection;
    let newTabToFocus = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      tabsCollection[tabInFocus].setAttribute('tabIndex', '-1');
      if (e.key === 'ArrowRight') {
        newTabToFocus = tabInFocus + 1;
        if (tabInFocus >= tabsCollection.length - 1) {
          newTabToFocus = 0;
        }
      } else if (e.key === 'ArrowLeft') {
        newTabToFocus = tabInFocus - 1;
        if (tabInFocus - 1 < 0) {
          newTabToFocus = tabsCollection.length - 1;
        }
      }
      if (!hasManualActivation) {
        updateValue(newTabToFocus);
      }
      setTabInFocus(newTabToFocus);
      tabsCollection[newTabToFocus].setAttribute('tabIndex', '0');
      (tabsCollection[newTabToFocus] as HTMLElement).focus();
    }
  };

  const scrollSideways = (direction: string) => {
    let scrollAmount = 0;
    const slideTimer = () => {
      if (!itemsRef.current) {
        return;
      }
      direction === 'left'
        ? (itemsRef.current.scrollLeft -= scrollSteps)
        : (itemsRef.current.scrollLeft += scrollSteps);
      scrollAmount += scrollSteps;
      if (scrollAmount < lengthToScroll) {
        requestAnimationFrame(slideTimer);
      }
    };
    slideTimer();
  };

  const tabsClasses = classNames('ewc-tabs', {
    ['ewc-tabs--inverted']: isInverted,
  });
  const arrowLeftClasses = classNames('ewc-tabs__arrow', 'ewc-tabs__arrow--left', {
    ['ewc-tabs__arrow--hide']: isOnLeftEnd,
    ['ewc-tabs__arrow--remove']: isOnRightEnd && isOnLeftEnd,
  });
  const arrowRightClasses = classNames('ewc-tabs__arrow', 'ewc-tabs__arrow--right', {
    ['ewc-tabs__arrow--hide']: isOnRightEnd,
    ['ewc-tabs__arrow--remove']: isOnRightEnd && isOnLeftEnd,
  });
  const itemsClasses = classNames('ewc-tabs__items', {
    ['right-arrow-fade']: !isOnRightEnd,
    ['left-arrow-fade']: !isOnLeftEnd,
    ['both-arrows-fade']: !isOnLeftEnd && !isOnRightEnd,
    ['ewc-tabs--scrolling']: !isOnLeftEnd || !isOnRightEnd,
  });

  return (
    <div
      className={tabsClasses + (className ? ' ' + className : '')}
      style={inlineStyle}
      ref={tabsRef}
      data-testid="tabs-container"
    >
      <div
        className={arrowLeftClasses}
        onClick={() => {
          scrollSideways('left');
        }}
      >
        {!isInverted && (
          <i
            className="ewc-tabs__icon"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.716 23.122a2.89 2.89 0 00-.08-4.04L11.373 12l7.261-7.082a2.89 2.89 0 00.081-4.04A2.782 2.782 0 0014.74.796L5.365 9.939A2.88 2.88 0 004.5 12c0 .778.312 1.522.865 2.061l9.375 9.143a2.782 2.782 0 003.976-.082z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
            }}
          ></i>
        )}
        {isInverted && (
          <i
            className="ewc-tabs__icon"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.716 23.122a2.89 2.89 0 00-.08-4.04L11.373 12l7.261-7.082a2.89 2.89 0 00.081-4.04A2.782 2.782 0 0014.74.796L5.365 9.939A2.88 2.88 0 004.5 12c0 .778.312 1.522.865 2.061l9.375 9.143a2.782 2.782 0 003.976-.082z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='black'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
            }}
          ></i>
        )}
      </div>

      <div className={itemsClasses}>
        <div className="ewc-tabs__items-scroll" ref={itemsRef} role="tablist">
          {items &&
            items.map((item, i) => (
              <button
                role="tab"
                name={'ewc-tab-group-' + tabGroup}
                id={'ewc-tab-id-' + i}
                value={currValue}
                aria-label={item}
                aria-selected={currValue === i}
                aria-controls={'simple-tabpanel-' + currValue}
                tabIndex={currValue === i ? 0 : -1}
                key={i}
                className="ewc-tabs__item"
                onClick={() => updateValue(i)}
              >
                <label className={`ewc-tabs__label ${currValue == i && 'ewc-tabs__label--selected'}`}>
                  {item}
                </label>
              </button>
            ))}
        </div>
      </div>

      <div
        className={arrowRightClasses}
        onClick={() => {
          scrollSideways('right');
        }}
      >
        {!isInverted && (
          <i
            className="ewc-tabs__icon"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.284.878a2.89 2.89 0 00.08 4.04L12.627 12l-7.261 7.082a2.89 2.89 0 00-.081 4.04 2.782 2.782 0 003.976.082l9.375-9.143A2.88 2.88 0 0019.5 12a2.88 2.88 0 00-.865-2.061L9.26.796a2.782 2.782 0 00-3.976.082z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
            }}
          ></i>
        )}
        {isInverted && (
          <i
            className="ewc-tabs__icon"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.284.878a2.89 2.89 0 00.08 4.04L12.627 12l-7.261 7.082a2.89 2.89 0 00-.081 4.04 2.782 2.782 0 003.976.082l9.375-9.143A2.88 2.88 0 0019.5 12a2.88 2.88 0 00-.865-2.061L9.26.796a2.782 2.782 0 00-3.976.082z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='black'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`,
            }}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Tabs;
