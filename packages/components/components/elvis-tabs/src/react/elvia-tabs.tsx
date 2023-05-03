import React, { FC, useEffect, useState, useRef, CSSProperties } from 'react';
import { IconWrapper, isSsr } from '@elvia/elvis-toolbox';

import {
  TabsContainer,
  ItemsContainer,
  ScrollContainer,
  Tab,
  TabLabel,
  ArrowButton,
} from './styledComponents';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import throttle from 'lodash.throttle';
import arrowLeftBold from '@elvia/elvis-assets-icons/dist/icons/arrowLeftBold';
import arrowRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowRightBold';
export interface TabsProps {
  items: string[];
  value?: number;
  hasManualActivation?: boolean;
  ariaLabel?: string;
  tabIdPrefix?: string;
  valueOnChange?: (value: number) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

const Tabs: FC<TabsProps> = ({
  items,
  value = 0,
  hasManualActivation = false,
  ariaLabel,
  tabIdPrefix,
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
  const [uniqueId, setUniqueId] = useState(`ewc-tabs-${tabIdPrefix ? tabIdPrefix + '-' : ''}`);
  const tabsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const lengthToScroll = 140;
  const scrollSteps = 12;

  useEffect(() => {
    setUniqueId(`ewc-tabs-${tabIdPrefix ? tabIdPrefix + '-' : ''}`);
  }, [tabIdPrefix]);

  /**
   * Start resize and scroll listener that updates arrow visibility
   */
  useEffect(() => {
    if (!itemsRef.current) {
      return;
    }

    const throttledResizeCount = throttle(updateArrowVisibility, 100);
    const throttledScrollCount = throttle(updateArrowVisibility, 50);
    window.addEventListener('resize', throttledResizeCount);
    itemsRef.current.addEventListener('scroll', throttledScrollCount);

    return () => {
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
      webcomponent.triggerEvent('valueOnChange', value);
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
      scrollIntoView(uniqueId + newTabToFocus);
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

  const scrollIntoView = (elementId: string) => {
    if (!isSsr()) {
      document
        .getElementById(elementId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <TabsContainer
      className={className}
      style={inlineStyle}
      ref={tabsRef}
      data-testid="tabs-container"
      {...rest}
    >
      <ArrowButton
        isVisible={isOnRightEnd && isOnLeftEnd}
        isLeftArrow={true}
        onClick={() => {
          scrollSideways('left');
        }}
      >
        <IconWrapper
          icon={arrowLeftBold}
          size="xxs"
          style={{
            position: 'absolute',
            top: '11px',
            visibility: isOnLeftEnd ? 'hidden' : 'visible',
          }}
        />
      </ArrowButton>
      <ItemsContainer isOnLeftEnd={isOnLeftEnd} isOnRightEnd={isOnRightEnd}>
        <ScrollContainer ref={itemsRef} role="tablist" aria-label={ariaLabel}>
          {items &&
            items.map((item, i) => (
              <Tab
                role="tab"
                id={uniqueId + i}
                key={i}
                aria-selected={currValue === i}
                aria-controls={uniqueId + i}
                tabIndex={currValue === i ? 0 : -1}
                onClick={() => {
                  updateValue(i);
                  scrollIntoView(uniqueId + i);
                }}
                data-testid="tab-button"
              >
                <TabLabel isSelected={currValue == i} data-testid="tab-label">
                  {item}
                </TabLabel>
              </Tab>
            ))}
        </ScrollContainer>
      </ItemsContainer>
      <ArrowButton
        isVisible={isOnRightEnd && isOnLeftEnd}
        isLeftArrow={false}
        onClick={() => {
          scrollSideways('right');
        }}
      >
        <IconWrapper
          icon={arrowRightBold}
          size="xxs"
          style={{
            position: 'absolute',
            top: '11px',
            visibility: isOnRightEnd ? 'hidden' : 'visible',
          }}
        />
      </ArrowButton>
    </TabsContainer>
  );
};

export default Tabs;
