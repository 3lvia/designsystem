import React, { FC, useState, useRef, useEffect, TouchEvent, MouseEvent } from 'react';
import {
  CarouselContainer,
  CarouselElements,
  CarouselElementContainer,
  CarouselElement,
  CarouselHeading,
  CarouselLeftButton,
  CarouselListOfDots,
  CarouselDot,
  CarouselNavigationRow,
  CarouselRightButton,
  CarouselCheckButton,
} from './StyledComponents';
import { config } from './config';
import { warnDeprecatedProps, useRovingFocus, IconWrapper } from '@elvia/elvis-toolbox';
import arrowLeftCircleColor from '@elvia/elvis-assets-icons/dist/icons/arrowLeftCircleColor';
import arrowLeftCircleFilledColor from '@elvia/elvis-assets-icons/dist/icons/arrowLeftCircleFilledColor';
import arrowRightCircleColor from '@elvia/elvis-assets-icons/dist/icons/arrowRightCircleColor';
import arrowRightCircleFilledColor from '@elvia/elvis-assets-icons/dist/icons/arrowRightCircleFilledColor';
import checkCircleColor from '@elvia/elvis-assets-icons/dist/icons/checkCircleColor';
import checkCircleFilledColor from '@elvia/elvis-assets-icons/dist/icons/checkCircleFilledColor';
import { CarouselItem, CarouselProps, SlideDirection } from './elvia-carousel.types';

let UNIQUE_CAROUSEL_ID = 0;

export const Carousel: FC<CarouselProps> = function ({
  items,
  onFinish,
  hasConfirmationCheckmark,
  value = 0,
  valueOnChange,
  hasAnimation = true,
  className,
  inlineStyle,
  webcomponent,
  type = 'loop',
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);

  const [carouselItems, setCarouselItems] = useState<CarouselItem[] | number>();
  const [lengthOfItems, setLengthOfItems] = useState<number>(0);
  const [index, setIndex] = useState(value);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('left');
  const [isHoveringRightButton, setIsHoveringRightButton] = useState(false);
  const [isHoveringLeftButton, setIsHoveringLeftButton] = useState(false);
  const [id] = useState(`ewc-carousel-${UNIQUE_CAROUSEL_ID++}`);

  const itemsRef = useRef<HTMLDivElement>(null);
  const { ref: navigationElementsRef } = useRovingFocus<HTMLDivElement>({ dir: 'horizontal' });

  const hideLeftArrow = type === 'linear' && index === 0;
  const hideRightArrow = type === 'linear' && index === lengthOfItems - 1;
  const showOnboardingCheckmark = hideRightArrow && hasConfirmationCheckmark;

  useEffect(() => {
    handleValueChange(value, value > index ? 'right' : 'left', true);
  }, [value]);

  useEffect(() => {
    setIndex(index);
  });

  /**
   * Get all slotted items from the webcomponent
   * Convert slots to items and add them to the carousel, and set lengthOfItems from result
   */
  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    const slots = webcomponent.getAllSlots();
    const numberOfItemSlots = Object.keys(slots).filter((el) => el.includes('item-')).length;
    if (numberOfItemSlots !== 0) {
      const newItem = getMappedSlottedItems(slots, numberOfItemSlots);
      setLengthOfItems(newItem.length);
      setCarouselItems(newItem);
    }
  }, [webcomponent]);

  /** If items are provided (not as slots), set lengthOfItems */
  useEffect(() => {
    if (items !== undefined) {
      setCarouselItems(items);
      if (typeof items === 'object') setLengthOfItems(items.length);
      else {
        setLengthOfItems(typeof items === 'string' ? +items : items);
      }
    }
  }, [items]);

  /**
   * Map the slots to a list of items.
   *
   * Getting the item by getting the slot starting with 'heading-' and 'item-' and ending with a number
   * and create a new object with the HTML-content of these slots.
   */
  const getMappedSlottedItems = (slots: Record<string, any>, numberOfItemSlots: number): CarouselItem[] => {
    const newItems: CarouselItem[] = [];
    for (let i = 1; i < numberOfItemSlots + 1; i++) {
      const newEl: CarouselItem = { heading: '', item: '' };
      const heading = Object.keys(slots).find((el) => {
        return el === 'heading-' + i;
      });
      const item = Object.keys(slots).find((el) => {
        return el === 'item-' + i;
      });
      newEl.heading = <div dangerouslySetInnerHTML={{ __html: heading ? slots[heading].innerHTML : '' }} />;
      newEl.item = <div dangerouslySetInnerHTML={{ __html: item ? slots[item].innerHTML : '' }} />;
      newItems.push(newEl);
    }
    return newItems;
  };

  /** Handles mobile events */
  const handleMouseDown = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): void => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    if (!itemsRef.current) {
      return;
    }
    setStartX(clientX - itemsRef.current.offsetLeft);
    setIsDown(true);
  };

  /**
   * If the user is dragging, get the x position of the mouse and
   * if the distance is greater than 400, change the index of the carousel.
   */
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown) {
      return;
    }
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    if (!itemsRef.current) {
      return;
    }
    const x = clientX - itemsRef.current.offsetLeft;
    const distance = (x - startX) * 3;
    if (distance < -400 && !hideRightArrow) {
      handleValueChange(index, 'right');
    }
    if (distance > 400 && !hideLeftArrow) {
      handleValueChange(index, 'left');
    }
  };

  /** Dispatch valueOnChange events */
  const updateValue = (updateValueIndex: number): void => {
    setIndex(updateValueIndex);
    if (!webcomponent && valueOnChange) {
      valueOnChange(updateValueIndex);
    } else if (webcomponent) {
      webcomponent.setProps({ value: updateValueIndex }, true);
      webcomponent.triggerEvent('valueOnChange', updateValueIndex);
    }
  };

  /** Update the value of the carousel by fading in the next element */
  const handleValueChange = (
    handleValueChangeIndex: number,
    direction: SlideDirection,
    dotClick?: boolean,
  ): void => {
    // If the function is triggered by change of the value prop or clicking one of the dots,
    // and the value is the same as the current index, don't do anything.
    // This is to prevent the carousel from animating on page load.
    if (dotClick && handleValueChangeIndex === index) {
      return;
    }
    setIsDown(false);
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(oppositeDirection);
    setFadeIn(false);

    setTimeout(
      () => {
        // Using modulo to be able to carousel to next element
        // For decrement you have to add the length of elements to prevent negative values
        if (dotClick) {
          updateValue(handleValueChangeIndex);
        } else {
          direction === 'left'
            ? updateValue((handleValueChangeIndex - 1 + lengthOfItems) % lengthOfItems)
            : updateValue((handleValueChangeIndex + 1) % lengthOfItems);
        }
        setSlideDirection(direction);
        setFadeIn(true);
      },
      hasAnimation ? 480 : 0,
    );
  };

  /** Dispatch onFinish events (when the checkmark button is clicked) */
  const triggerOnFinish = (): void => {
    if (!webcomponent) {
      onFinish && onFinish();
    } else {
      webcomponent.triggerEvent('onFinish');
    }
  };

  return (
    <CarouselContainer
      className={className ?? ''}
      style={inlineStyle}
      aria-roledescription="carousel"
      aria-live="polite"
      role="group"
      id={id}
      {...rest}
    >
      <CarouselElements>
        {typeof carouselItems === 'object' && (
          <CarouselElementContainer
            $slideDirection={slideDirection}
            $enterAnimation={hasAnimation && fadeIn}
            $exitAnimation={hasAnimation && !fadeIn}
          >
            {typeof carouselItems[index].heading === 'string' && (
              <CarouselHeading data-testid="carousel-item-heading">
                {carouselItems[index].heading}
              </CarouselHeading>
            )}
            {typeof carouselItems[index].heading === 'object' && (
              <CarouselHeading>{carouselItems[index].heading}</CarouselHeading>
            )}
            <CarouselElement
              ref={itemsRef}
              onMouseDown={(e) => handleMouseDown(e)}
              onMouseUp={() => setIsDown(false)}
              onMouseLeave={() => setIsDown(false)}
              onMouseMove={(e) => handleMouseMove(e)}
              onTouchStart={(e) => handleMouseDown(e)}
              onTouchMove={(e) => handleMouseMove(e)}
              onTouchEnd={() => setIsDown(false)}
              data-testid="carousel-item"
            >
              {carouselItems[index].item}
            </CarouselElement>
          </CarouselElementContainer>
        )}
      </CarouselElements>
      <CarouselNavigationRow ref={navigationElementsRef}>
        <CarouselLeftButton
          aria-controls={id}
          aria-hidden={hideLeftArrow}
          aria-label={`Gå til forrige side`}
          hidden={hideLeftArrow}
          onClick={() => handleValueChange(index, 'left')}
          onMouseEnter={() => setIsHoveringLeftButton(true)}
          onMouseLeave={() => setIsHoveringLeftButton(false)}
          data-testid="carousel-left-arrow"
        >
          <IconWrapper
            icon={isHoveringLeftButton ? arrowLeftCircleFilledColor : arrowLeftCircleColor}
            size="md"
          />
        </CarouselLeftButton>
        <CarouselListOfDots>
          {Array.from(Array(lengthOfItems), (_e, listIndex) => (
            <CarouselDot
              data-testid="carousel-dot"
              key={listIndex}
              $isSelected={listIndex === index}
              tabIndex={0}
              aria-label={
                listIndex === index ? `Du er på side ${listIndex + 1}` : `Gå til side ${listIndex + 1}`
              }
              onClick={() =>
                listIndex !== index &&
                handleValueChange(listIndex, listIndex > index ? 'right' : 'left', true)
              }
            />
          ))}
        </CarouselListOfDots>

        {showOnboardingCheckmark ? (
          <CarouselCheckButton
            aria-label={'Fullfør og lukk.'}
            onClick={() => triggerOnFinish()}
            onMouseEnter={() => setIsHoveringRightButton(true)}
            onMouseLeave={() => setIsHoveringRightButton(false)}
            data-testid="carousel-onboarding-checkmark"
          >
            <IconWrapper icon={isHoveringRightButton ? checkCircleFilledColor : checkCircleColor} size="md" />
          </CarouselCheckButton>
        ) : (
          <CarouselRightButton
            aria-controls={id}
            aria-hidden={hideRightArrow}
            aria-label={`Gå til neste side`}
            hidden={hideRightArrow}
            onClick={() => handleValueChange(index, 'right')}
            onMouseEnter={() => setIsHoveringRightButton(true)}
            onMouseLeave={() => setIsHoveringRightButton(false)}
            data-testid="carousel-right-arrow"
          >
            <IconWrapper
              icon={isHoveringRightButton ? arrowRightCircleFilledColor : arrowRightCircleColor}
              size="md"
            />
          </CarouselRightButton>
        )}
      </CarouselNavigationRow>
    </CarouselContainer>
  );
};

export default Carousel;
