import React, { FC, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import {
  CarouselContainer,
  CarouselTitle,
  CarouselElement,
  LeftCarouselButton,
  ListOfDots,
  Dot,
  NavigationRow,
  RightCarouselButton,
  CarouselElementContainer,
  CheckButton,
} from './StyledComponents';

type CarouselElement = {
  title?: string;
  element: JSX.Element | string | HTMLElement;
};

export interface BaseCarouselProps {
  className?: string;
  elements: CarouselElement[] | number;
  hideArrows?: boolean;
  onHide?: () => void;
  useOnboardingCheckmark?: boolean;
  value?: number;
  valueOnChange?: (value: number) => void;
  webcomponent?: any;
}

// don't know why it says it does not exist
export const Carousel: FC<BaseCarouselProps> = ({
  className,
  elements,
  hideArrows = false,
  onHide,
  useOnboardingCheckmark,
  value = 0,
  valueOnChange,
  webcomponent,
}) => {
  const [index, setIndex] = useState(value);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [componentInitialized, setComponentInitialized] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const itemsRef = useRef<HTMLDivElement>(null);

  const lengthOfElements =
    typeof elements === 'object' ? elements.length : typeof elements === 'string' ? +elements : elements;

  const hideLeftArrow = hideArrows && index === 0;
  const hideRightArrow = hideArrows && index === lengthOfElements - 1;
  const showOnboardingCheckmark = hideRightArrow && useOnboardingCheckmark;

  const updateValue = (index: number) => {
    setIndex(index);
    if (!webcomponent && valueOnChange) {
      valueOnChange(index);
    } else if (webcomponent) {
      // True -> Prevents rerender
      const value = index;
      webcomponent.setProps({ value: value }, true);
    }
  };

  // Is necessary since the web component does not send all props at once
  useEffect(() => {
    setIndex(index);
  }, [index]);

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
      handleButtonClick(index, 'right');
    }
    if (distance > 400 && !hideLeftArrow) {
      handleButtonClick(index, 'left');
    }
  };

  const handleButtonClick = (index: number, direction: 'left' | 'right'): void => {
    if (!componentInitialized) {
      setComponentInitialized(true);
    }
    setIsDown(false);
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(oppositeDirection);
    setSlideIn(false);

    setTimeout(() => {
      // Using modulo to be able to carousel to next element
      // For decrement you have to add the length of elements to prevent negative values
      direction === 'left'
        ? updateValue((index - 1 + lengthOfElements) % lengthOfElements)
        : updateValue((index + 1) % lengthOfElements);
      setSlideDirection(direction);
      setSlideIn(true);
    }, 500);
  };

  const classNameContainer = classnames({
    ['exit-animation']: !slideIn,
    ['enter-animation']: slideIn && componentInitialized,
  });

  return (
    <CarouselContainer slideDirection={slideDirection} className={className}>
      {typeof elements === 'object' && (
        <CarouselElementContainer className={classNameContainer}>
          <CarouselTitle>{elements[index].title}</CarouselTitle>
          <CarouselElement
            ref={itemsRef}
            onMouseDown={(e: MouseEvent) => handleMouseDown(e)}
            onMouseUp={() => setIsDown(false)}
            onMouseLeave={() => setIsDown(false)}
            onMouseMove={(e: MouseEvent) => handleMouseMove(e)}
            onTouchStart={(e: TouchEvent) => handleMouseDown(e)}
            onTouchMove={(e: TouchEvent) => handleMouseMove(e)}
            onTouchEnd={() => setIsDown(false)}
          >
            {elements[index].element}
          </CarouselElement>
        </CarouselElementContainer>
      )}
      <NavigationRow>
        <LeftCarouselButton
          aria-label={`Gå til forrige side`}
          aria-hidden={hideLeftArrow}
          hidden={hideLeftArrow}
          onClick={() => handleButtonClick(index, 'left')}
        >
          <i />
        </LeftCarouselButton>
        <ListOfDots>
          {Array.from(Array(lengthOfElements), (e, listIndex: number) => (
            <Dot
              key={listIndex}
              isSelected={listIndex === index}
              tabIndex={0}
              aria-label={
                listIndex === index ? `Du er på side ${listIndex + 1}` : `Gå til side ${listIndex + 1}`
              }
              onClick={() => updateValue(listIndex)}
            />
          ))}
        </ListOfDots>
        {showOnboardingCheckmark ? (
          <CheckButton aria-label={'Stegene er fullført. Lukk carousel.'} onClick={() => onHide && onHide()}>
            <i />
          </CheckButton>
        ) : (
          <RightCarouselButton
            aria-label={`Gå til neste side`}
            aria-hidden={hideRightArrow}
            hidden={hideRightArrow}
            onClick={() => handleButtonClick(index, 'right')}
          >
            <i />
          </RightCarouselButton>
        )}
      </NavigationRow>
    </CarouselContainer>
  );
};

export default Carousel;
