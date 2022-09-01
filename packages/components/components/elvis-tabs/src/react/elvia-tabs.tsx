import React, { FC, useEffect, useState, useRef, CSSProperties } from 'react';
import classNames from 'classnames';
import { outlineListener, throttle } from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import './style.scss';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
export interface TabsProps {
  items: string[];
  value?: number;
  isInverted?: boolean;
  hasManualActivation?: boolean;
  ariaLabel?: string;
  valueOnChange?: (value: number) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
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
  ...rest
}) => {
  const [currValue, setCurrValue] = useState(value);
  const [isOnRightEnd, setIsOnRightEnd] = useState(true);
  const [isOnLeftEnd, setIsOnLeftEnd] = useState(true);
  const [tabInFocus, setTabInFocus] = useState(value);
  const tabsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const lengthToScroll = 140;
  const scrollSteps = 12;

  /**
   * Start outline listener
   *
   * Start resize and scroll listener that updates arrow visibility
   */
  useEffect(() => {
    if (!itemsRef.current) {
      return;
    }

    outlineListener(tabsRef.current);

    const throttledResizeCount = throttle(updateArrowVisibility, 100);
    const throttledScrollCount = throttle(updateArrowVisibility, 50);
    window.addEventListener('resize', throttledResizeCount);
    itemsRef.current.addEventListener('scroll', throttledScrollCount);

    return () => {
      outlineListener(tabsRef.current, true);

      window.removeEventListener('resize', throttledResizeCount);
      if (itemsRef.current) {
        itemsRef.current.removeEventListener('scroll', throttledScrollCount);
      }
    };
  }, []);

  /**
   * Set arrow visibility
   *
   * Start listening to keydown events for updating tab-focus
   */
  useEffect(() => {
    updateArrowVisibility();

    if (itemsRef.current) {
      itemsRef.current.addEventListener('keydown', updateFocusedElement);
    }
    return () => {
      if (itemsRef.current) {
        itemsRef.current.removeEventListener('keydown', updateFocusedElement);
      }
    };
  });

  /** When value changes, currValue and tabInFocus should be updated */
  useEffect(() => {
    setCurrValue(value);
    setTabInFocus(value);
  }, [value]);

  /** Updates the active tab and triggering valueOnChange events. */
  const updateValue = (value: number): void => {
    setCurrValue(value);
    if (!webcomponent && valueOnChange) {
      valueOnChange(value);
    } else if (webcomponent) {
      webcomponent.setProps({ value: value }, true);
    }
  };

  /**
   * Checks if the tabs area is showing all the tabs or if some of them are overflowing.
   * Update variables for showing or hiding the navigational arrows.
   */
  const updateArrowVisibility = (): void => {
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

  /**
   * If arrow right or left are used, update the focused element
   *
   * If hasManualActivation is false update the tab value as well (switch tab)
   */
  const updateFocusedElement = (e: KeyboardEvent): void => {
    if (!itemsRef.current) {
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      let newTabToFocus = 0;
      const tabsCollection = itemsRef.current.children as HTMLCollection;
      tabsCollection[tabInFocus].setAttribute('tabIndex', '-1');
      if (e.key === 'ArrowRight') {
        newTabToFocus = tabInFocus + 1;
        if (newTabToFocus >= tabsCollection.length) {
          newTabToFocus = 0;
        }
      } else if (e.key === 'ArrowLeft') {
        newTabToFocus = tabInFocus - 1;
        if (newTabToFocus < 0) {
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

  /** Takes a direction (left or right) and scrolls a set amount in that direction within the tabs */
  const scrollSideways = (direction: string): void => {
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
      {...rest}
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
