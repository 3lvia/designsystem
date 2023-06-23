import React, { FC, useEffect, useState } from 'react';
import { IconWrapper, isSsr, useRovingFocus } from '@elvia/elvis-toolbox';
import {
  TabsContainer,
  ItemsContainer,
  ScrollContainer,
  Tab,
  TabLabel,
  LeftArrowButton,
  RightArrowButton,
} from './styledComponents';
import arrowLeftBold from '@elvia/elvis-assets-icons/dist/icons/arrowLeftBold';
import arrowRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowRightBold';
import { TabsProps } from './elvia-tabs.types';
import { useScrollPositionDetection } from './useScrollPositionDetection';

const Tabs: FC<TabsProps> = ({
  items,
  value = 0,
  isInverted,
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
  const { ref: scrollContainerRef } = useRovingFocus<HTMLDivElement>({ dir: 'horizontal' });
  const scrollPosition = useScrollPositionDetection(scrollContainerRef);

  /** When value changes, currValue and tabInFocus should be updated */
  useEffect(() => {
    setSelectedIndex(value);
  }, [value]);

  /** Updates the active tab and triggering valueOnChange events. */
  const updateValue = (index: number): void => {
    setSelectedIndex(index);

    valueOnChange?.(index);
    webcomponent?.setProps({ value: index }, true);
    webcomponent?.triggerEvent('valueOnChange', index);
  };

  const scroll = (direction: 'left' | 'right'): void => {
    scrollContainerRef.current?.scrollBy({ left: direction === 'right' ? 120 : -120, behavior: 'smooth' });
  };

  const scrollIntoView = (elementId: string) => {
    if (!isSsr() && scrollContainerRef.current) {
      scrollContainerRef.current
        .querySelector(`#${elementId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <TabsContainer className={className} style={inlineStyle} data-testid="tabs-container" {...rest}>
      <LeftArrowButton
        isVisible={['center', 'right'].includes(scrollPosition)}
        size="md"
        onClick={() => scroll('left')}
      >
        <IconWrapper icon={arrowLeftBold} size="xxs" color={isInverted ? 'white' : undefined} />
      </LeftArrowButton>
      <ItemsContainer isInverted={isInverted} scrollPosition={scrollPosition}>
        <ScrollContainer ref={scrollContainerRef} role="tablist" aria-label={ariaLabel}>
          {items &&
            items.map((item, i) => (
              <Tab
                role="tab"
                id={uniqueId + i}
                key={item}
                aria-selected={selectedIndex === i}
                aria-controls={uniqueId + i}
                onClick={() => {
                  updateValue(i);
                  scrollIntoView(uniqueId + i);
                }}
              >
                <TabLabel isSelected={selectedIndex == i} isInverted={isInverted}>
                  {item}
                </TabLabel>
              </Tab>
            ))}
        </ScrollContainer>
      </ItemsContainer>
      <RightArrowButton
        isVisible={['left', 'center'].includes(scrollPosition)}
        size="md"
        onClick={() => scroll('right')}
      >
        <IconWrapper icon={arrowRightBold} size="xxs" color={isInverted ? 'white' : undefined} />
      </RightArrowButton>
    </TabsContainer>
  );
};

export default Tabs;
