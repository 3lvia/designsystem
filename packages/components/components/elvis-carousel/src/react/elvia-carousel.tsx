import React, { FC, useState, useRef, useEffect, CSSProperties } from 'react';
import classnames from 'classnames';
import {
  CarouselContainer,
  CarouselElements,
  CarouselElementContainer,
  CarouselElement,
  CarouselTitle,
  CarouselLeftButton,
  CarouselListOfDots,
  CarouselDot,
  CarouselNavigationRow,
  CarouselRightButton,
  CarouselCheckButton,
} from './StyledComponents';
import { Icon } from '@elvia/elvis-icon/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import { CarouselConfig, CarouselItemConfig } from './config';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';

type CarouselItem = {
  title?: JSX.Element | string | HTMLElement;
  /**
   * @deprecated Deprecated in version 2.0.0. Use item instead.
   */
  element?: JSX.Element | string | HTMLElement;
  item: JSX.Element | string | HTMLElement;
};

export interface CarouselProps {
  items: CarouselItem[] | number;
  /**
   * @deprecated Deprecated in version 2.0.0. Use items instead.
   */
  elements?: CarouselItem[] | number;
  hideArrows?: boolean;
  onHide?: () => void;
  useOnboardingCheckmark?: boolean;
  value?: number;
  valueOnChange?: (value: number) => void;
  hasAnimation: boolean;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: ElvisComponentWrapper;
}

export const Carousel: FC<CarouselProps> = function ({
  items,
  hideArrows = false,
  onHide,
  useOnboardingCheckmark,
  value = 0,
  valueOnChange,
  hasAnimation = true,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(CarouselConfig, arguments[0]);

  if (Array.isArray(items)) {
    // eslint-disable-next-line prefer-rest-params
    items.forEach((item) => {
      warnDeprecatedProps(CarouselItemConfig, item);
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

  const hideLeftArrow = hideArrows && index === 0;
  const hideRightArrow = hideArrows && index === lengthOfItems - 1;
  const showOnboardingCheckmark = hideRightArrow && useOnboardingCheckmark;

  const updateValue = (updateValueIndex: number) => {
    setIndex(updateValueIndex);
    if (!webcomponent && valueOnChange) {
      valueOnChange(updateValueIndex);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: updateValueIndex }, true);
    }
  };

  useEffect(() => {
    handleValueChange(value, value > index ? 'right' : 'left', true);
  }, [value]);

  useEffect(() => {
    setIndex(index);
  });

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    const slots = webcomponent.getAllSlots();
    const slotElements = Object.keys(slots).filter((el) => el.includes('item-'));
    if (slotElements.length !== 0) {
      const newElements = mapSlottedItems(slots, slotElements);
      setLengthOfItems(newElements.length);
      setCarouselItems(newElements);
    }
  }, [webcomponent]);

  // TODO: Hvordan kan items bli til string??
  useEffect(() => {
    if (items !== undefined) {
      setCarouselItems(items);
      if (typeof items === 'object') setLengthOfItems(items.length);
      else {
        setLengthOfItems(typeof items === 'string' ? +items : items);
      }
    }
  }, [items]);

  const mapSlottedItems = (slots: Record<string, any>, slotElements: string | any[]) => {
    const newElements: CarouselItem[] = [];
    for (let i = 1; i < slotElements.length + 1; i++) {
      const newEl: CarouselItem = { title: '', item: '' };
      const title = Object.keys(slots).find((el) => {
        return el === 'title-' + i;
      });
      const item = Object.keys(slots).find((el) => {
        return el === 'item-' + i;
      });
      newEl.title = <div dangerouslySetInnerHTML={{ __html: title ? slots[title].innerHTML : '' }} />;
      newEl.item = <div dangerouslySetInnerHTML={{ __html: item ? slots[item].innerHTML : '' }} />;
      newElements.push(newEl);
    }
    return newElements;
  };

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    if (!itemsRef.current) {
      return;
    }
    setStartX(clientX - itemsRef.current.offsetLeft);
    setIsDown(true);
  };

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

  const triggerOnHide = () => {
    if (!webcomponent) {
      onHide && onHide();
    } else {
      webcomponent.triggerEvent('onHide');
    }
  };

  const carouselLeftButtonIcon = () => {
    return isHoveringLeftButton ? 'arrowLeftCircleFilledColor' : 'arrowLeftCircleColor';
  };

  const carouselRightButtonIcon = () => {
    return isHoveringRightButton ? 'arrowRightCircleFilledColor' : 'arrowRightCircleColor';
  };
  const carouselRightCheckButtonIcon = () => {
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
            {typeof carouselItems[index].title === 'string' && (
              <CarouselTitle data-testid="carousel-item-title">
                <h2 className="e-title-sm">{carouselItems[index].title}</h2>
              </CarouselTitle>
            )}
            {typeof carouselItems[index].title === 'object' && (
              <CarouselTitle>{carouselItems[index].title}</CarouselTitle>
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
          <Icon name={carouselLeftButtonIcon()} size="md" />
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
            onClick={() => triggerOnHide()}
            onMouseEnter={() => setIsHoveringRightButton(true)}
            onMouseLeave={() => setIsHoveringRightButton(false)}
            data-testid="carousel-onboarding-checkmark"
          >
            <Icon name={carouselRightCheckButtonIcon} size="md" />
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
            <Icon name={carouselRightButtonIcon()} size="md" />
          </CarouselRightButton>
        )}
      </CarouselNavigationRow>
    </CarouselContainer>
  );
};

export default Carousel;
