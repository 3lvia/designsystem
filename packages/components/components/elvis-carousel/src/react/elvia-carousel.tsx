import React, { FC, useState, useRef, useEffect, CSSProperties } from 'react';
import classnames from 'classnames';
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
import { Icon } from '@elvia/elvis-icon/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import { carouselConfig, carouselItemConfig } from './config';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';

type CarouselItem = {
  /**
   * @deprecated Deprecated in version 2.0.0. Use heading instead.
   */
  title?: JSX.Element | string | HTMLElement;
  /**
   * @deprecated Deprecated in version 2.0.0. Use item instead.
   */
  element?: JSX.Element | string | HTMLElement;
  heading?: JSX.Element | string | HTMLElement;
  item: JSX.Element | string | HTMLElement;
};

export interface CarouselProps {
  items: CarouselItem[] | number;
  /**
   * @deprecated Deprecated in version 2.0.0. Use items instead.
   */
  elements?: CarouselItem[] | number;
  /**
   *  @deprecated Deprecated in version 2.0.0.
   * Use loop instead. Remember to invert boolean.
   */
  hideArrows?: boolean;
  loop?: boolean;
  onFinish?: () => void;
  /**
   *  @deprecated Deprecated in version 2.0.0. Use onFinish instead.
   */
  onHide?: () => void;
  /**
   *  @deprecated Deprecated in version 2.0.0. Use hasConfirmationCheckmark instead.
   */
  useOnboardingCheckmark?: boolean;
  hasConfirmationCheckmark?: boolean;
  value?: number;
  valueOnChange?: (value: number) => void;
  hasAnimation: boolean;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: ElvisComponentWrapper;
}

export const Carousel: FC<CarouselProps> = function ({
  items,
  loop = true,
  onFinish,
  hasConfirmationCheckmark,
  value = 0,
  valueOnChange,
  hasAnimation = true,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(carouselConfig, arguments[0]);

  if (Array.isArray(items)) {
    // eslint-disable-next-line prefer-rest-params
    items.forEach((item) => {
      warnDeprecatedProps(carouselItemConfig, item);
    });
  }

  const [carouselItems, setCarouselItems] = useState<CarouselItem[] | number>();
  const [lengthOfItems, setLengthOfItems] = useState<number>(0);
  const [index, setIndex] = useState(value);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isHoveringRightButton, setIsHoveringRightButton] = useState(false);
  const [isHoveringLeftButton, setIsHoveringLeftButton] = useState(false);

  const itemsRef = useRef<HTMLDivElement>(null);

  const hideLeftArrow = !loop && index === 0;
  const hideRightArrow = !loop && index === lengthOfItems - 1;
  const showOnboardingCheckmark = hideRightArrow && hasConfirmationCheckmark;

  useEffect(() => {
    handleValueChange(value, value > index ? 'right' : 'left', true);
  }, [value]);

  useEffect(() => {
    setIndex(index);
  });

  /**
   * Get all slotted items from the webcomponent
   *
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

  /**
   * If items are provided (not as slots), set lengthOfItems
   */
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
   * and create a new object with the html-content of these slots.
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

  /**
   * Handles mobile events
   */
  const handleMouseDown = (e: MouseEvent | TouchEvent): void => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    if (!itemsRef.current) {
      return;
    }
    setStartX(clientX - itemsRef.current.offsetLeft);
    setIsDown(true);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent): void => {
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

  /**
   * Dispatch valueOnChange events
   */
  const updateValue = (updateValueIndex: number): void => {
    setIndex(updateValueIndex);
    if (!webcomponent && valueOnChange) {
      valueOnChange(updateValueIndex);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: updateValueIndex }, true);
    }
  };

  /**
   * Update the value of the carousel by fading in the next element
   */
  const handleValueChange = (
    handleValueChangeIndex: number,
    direction: 'left' | 'right',
    dotClick?: boolean,
  ): void => {
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

  /**
   * Dispatch onFinish events (when the checkmark button is clicked)
   */
  const triggerOnFinish = (): void => {
    if (!webcomponent) {
      onFinish && onFinish();
    } else {
      webcomponent.triggerEvent('onFinish');
    }
  };

  /**
   * Returns icons for the arrow-buttons depending on the hover state of the buttons
   */
  const getCarouselLeftButtonIcon = (): string => {
    return isHoveringLeftButton ? 'arrowLeftCircleFilledColor' : 'arrowLeftCircleColor';
  };

  const getCarouselRightButtonIcon = (): string => {
    return isHoveringRightButton ? 'arrowRightCircleFilledColor' : 'arrowRightCircleColor';
  };
  const getCarouselRightCheckButtonIcon = (): string => {
    return isHoveringRightButton ? 'checkCircleFilledColor' : 'checkCircleColor';
  };

  const classNameContainer = classnames({
    ['exit-animation']: hasAnimation && !fadeIn,
    ['enter-animation']: hasAnimation && fadeIn,
  });

  return (
    <CarouselContainer
      slideDirection={slideDirection}
      className={`${className ? className : ''}`}
      style={inlineStyle}
      data-testid="carousel-container"
      {...rest}
    >
      <CarouselElements>
        {typeof carouselItems === 'object' && (
          <CarouselElementContainer className={classNameContainer}>
            {typeof carouselItems[index].heading === 'string' && (
              <CarouselHeading data-testid="carousel-item-heading">
                <h2 className="e-heading-sm">{carouselItems[index].heading}</h2>
              </CarouselHeading>
            )}
            {typeof carouselItems[index].heading === 'object' && (
              <CarouselHeading>{carouselItems[index].heading}</CarouselHeading>
            )}
            <CarouselElement
              ref={itemsRef}
              onMouseDown={(e: MouseEvent) => handleMouseDown(e)}
              onMouseUp={() => setIsDown(false)}
              onMouseLeave={() => setIsDown(false)}
              onMouseMove={(e: MouseEvent) => handleMouseMove(e)}
              onTouchStart={(e: TouchEvent) => handleMouseDown(e)}
              onTouchMove={(e: TouchEvent) => handleMouseMove(e)}
              onTouchEnd={() => setIsDown(false)}
              data-testid="carousel-item"
            >
              {carouselItems[index].item}
            </CarouselElement>
          </CarouselElementContainer>
        )}
      </CarouselElements>
      <CarouselNavigationRow>
        <CarouselLeftButton
          aria-label={`Gå til forrige side`}
          aria-hidden={hideLeftArrow}
          hidden={hideLeftArrow}
          onClick={() => handleValueChange(index, 'left')}
          onMouseEnter={() => setIsHoveringLeftButton(true)}
          onMouseLeave={() => setIsHoveringLeftButton(false)}
          data-testid="carousel-left-arrow"
        >
          <Icon name={getCarouselLeftButtonIcon()} size="md" />
        </CarouselLeftButton>
        <CarouselListOfDots data-testid="carousel-list-of-dots">
          {Array.from(Array(lengthOfItems), (_e, listIndex: number) => (
            <CarouselDot
              key={listIndex}
              isSelected={listIndex === index}
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
            <Icon name={getCarouselRightCheckButtonIcon()} size="md" />
          </CarouselCheckButton>
        ) : (
          <CarouselRightButton
            aria-label={`Gå til neste side`}
            aria-hidden={hideRightArrow}
            hidden={hideRightArrow}
            onClick={() => handleValueChange(index, 'right')}
            onMouseEnter={() => setIsHoveringRightButton(true)}
            onMouseLeave={() => setIsHoveringRightButton(false)}
            data-testid="carousel-right-arrow"
          >
            <Icon name={getCarouselRightButtonIcon()} size="md" />
          </CarouselRightButton>
        )}
      </CarouselNavigationRow>
    </CarouselContainer>
  );
};

export default Carousel;
