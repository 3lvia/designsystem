import React, { FC, useEffect, useState, useRef, CSSProperties } from 'react';
import classNames from 'classnames';
import toolbox from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import './style.scss';
export interface TabsProps {
  items: string[];
  value: number;
  isInverted: boolean;
  hasManualActivation: boolean;
  ariaLabel: string;
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
  ariaLabel,
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
      if (itemsRef.current) {
        itemsRef.current.removeEventListener('scroll', throttledScrollCount);
      }
    };
  }, []);

  useEffect(() => {
    // Update scroll position on init
    updateArrowVisibility();

    // Listen for key-events to update focused element
    if (itemsRef.current) {
      itemsRef.current.addEventListener('keydown', updateFocusedElement);
    }
    return () => {
      if (itemsRef.current) {
        itemsRef.current.removeEventListener('keydown', updateFocusedElement);
      }
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
    const tabsCollection = itemsRef.current.children as HTMLCollection;
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
      setTabInFocus(newTabToFocus);
      tabsCollection[newTabToFocus].setAttribute('tabIndex', '0');
      (tabsCollection[newTabToFocus] as HTMLElement).focus();
      if (!hasManualActivation) {
        updateValue(newTabToFocus);
      }
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
    ['ewc-tabs__arrow--remove']: isOnRightEnd && isOnLeftEnd,
  });
  const arrowRightClasses = classNames('ewc-tabs__arrow', 'ewc-tabs__arrow--right', {
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
        <Icon
          name="arrowLeftBold"
          size="xxs"
          color={isInverted ? 'white' : undefined}
          inlineStyle={{
            position: 'absolute',
            top: '11px',
            visibility: isOnLeftEnd ? 'hidden' : 'visible',
          }}
        />
      </div>
      <div className={itemsClasses}>
        <div className="ewc-tabs__items-scroll" ref={itemsRef} role="tablist" aria-label={ariaLabel}>
          {items &&
            items.map((item, i) => (
              <button
                role="tab"
                id={'ewc-tab-id-' + i}
                key={i}
                aria-selected={currValue === i}
                aria-controls={item}
                tabIndex={currValue === i ? 0 : -1}
                className="ewc-tabs__item"
                onClick={() => updateValue(i)}
              >
                <span className={`ewc-tabs__label ${currValue == i && 'ewc-tabs__label--selected'}`}>
                  {item}
                </span>
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
        <Icon
          name="arrowRightBold"
          size="xxs"
          color={isInverted ? 'white' : undefined}
          inlineStyle={{
            position: 'absolute',
            top: '11px',
            visibility: isOnRightEnd ? 'hidden' : 'visible',
          }}
        />
      </div>
    </div>
  );
};

export default Tabs;
