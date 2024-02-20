import React, { FC, MouseEvent, useEffect, useState } from 'react';

import arrowLeftBold from '@elvia/elvis-assets-icons/dist/icons/arrowLeftBold';
import arrowRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowRightBold';
import { IconWrapper, useRovingFocus } from '@elvia/elvis-toolbox';

import { TabsProps } from './elvia-tabs.types';
import {
  BoldTabTextPlaceholder,
  LeftButton,
  RightButton,
  ScrollContainer,
  Tab,
  TabText,
  TabsContainer,
} from './styledComponents';
import { useScrollPositionDetection } from './useScrollPositionDetection';

export const Tabs: FC<TabsProps> = ({
  items,
  value = 0,
  isInverted,
  hasManualActivation = false,
  ariaLabel,
  tabIdPrefix,
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [selectedIndex, setSelectedIndex] = useState(value);
  const uniqueId = `ewc-tabs-${tabIdPrefix ? tabIdPrefix + '-' : ''}`;
  const { ref: scrollContainerRef } = useRovingFocus<HTMLDivElement>({
    dir: 'horizontal',
    observableAttributes: ['aria-hidden'],
    onKeyDown: (focusedElement, index) => {
      scrollTo(focusedElement);

      if (!hasManualActivation) {
        updateValue(index);
      }
    },
  });
  const scrollPosition = useScrollPositionDetection(scrollContainerRef);

  /** When value changes, currValue and tabInFocus should be updated */
  useEffect(() => setSelectedIndex(value), [value]);

  /** Updates the active tab and triggering valueOnChange events. */
  const updateValue = (index: number): void => {
    setSelectedIndex(index);

    valueOnChange?.(index);
    webcomponent?.setProps({ value: index }, true);
    webcomponent?.triggerEvent('valueOnChange', index);
  };

  const scroll = (direction: 'left' | 'right'): void => {
    scrollContainerRef.current?.scrollBy({ left: direction === 'right' ? 120 : -120 });
  };

  const onTabClick = (tabIndex: number, event: MouseEvent): void => {
    updateValue(tabIndex);
    scrollTo(event.currentTarget);
  };

  const scrollTo = (element: EventTarget & Element): void => {
    const elementOffsetLeft = (element as HTMLElement).offsetLeft;
    const containerWidth = scrollContainerRef.current?.clientWidth || 0;
    const scrollLeft = elementOffsetLeft - containerWidth / 2 + element.clientWidth / 2;
    scrollContainerRef.current?.scrollTo(Math.max(scrollLeft, 0), 0);
  };

  return (
    <TabsContainer className={className} style={inlineStyle} data-testid="tabs-container" {...rest}>
      <LeftButton
        isVisible={['center', 'right'].includes(scrollPosition)}
        size="md"
        onClick={() => scroll('left')}
        aria-label="Scroll mot venstre"
      >
        <IconWrapper icon={arrowLeftBold} size="xxs" color={isInverted ? 'white' : undefined} />
      </LeftButton>
      <ScrollContainer
        ref={scrollContainerRef}
        role="tablist"
        aria-label={ariaLabel}
        scrollPosition={scrollPosition}
      >
        {items &&
          items.map((item, i) => (
            <Tab
              role="tab"
              id={uniqueId + i}
              key={item}
              aria-selected={selectedIndex === i}
              aria-controls={uniqueId + i}
              onClick={(event) => onTabClick(i, event)}
              isSelected={selectedIndex == i}
              isInverted={isInverted ?? false}
            >
              <BoldTabTextPlaceholder aria-hidden="true">{item}</BoldTabTextPlaceholder>
              <TabText>{item}</TabText>
            </Tab>
          ))}
      </ScrollContainer>
      <RightButton
        isVisible={['left', 'center'].includes(scrollPosition)}
        size="md"
        onClick={() => scroll('right')}
        aria-label="Scroll mot høyre"
      >
        <IconWrapper icon={arrowRightBold} size="xxs" color={isInverted ? 'white' : undefined} />
      </RightButton>
    </TabsContainer>
  );
};

export default Tabs;
