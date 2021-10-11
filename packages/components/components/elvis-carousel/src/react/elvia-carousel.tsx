import React, { FC, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import {
  CarouselContainer,
  CarouselElement,
  CarouselTitle,
  LeftCarouselButton,
  ListOfDots,
  Dot,
  NavigationRow,
  RightCarouselButton,
  CarouselElementContainer,
  CheckButton,
} from './StyledComponents';

type CarouselElement = {
  title?: JSX.Element | string | HTMLElement;
  element: JSX.Element | string | HTMLElement;
};

export interface BaseCarouselProps {
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
  elements,
  hideArrows = false,
  onHide,
  useOnboardingCheckmark,
  value = 0,
  valueOnChange,
  webcomponent,
}) => {
  const [carouselElements, setCarouselElements] = useState<CarouselElement[] | number>();
  const [lengthOfElements, setLengthOfElements] = useState<number>(0);
  const [index, setIndex] = useState(value);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const itemsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    const slots = webcomponent.getAllSlots();
    const slotElements = Object.keys(slots).filter((el) => {
      return el.includes('element-');
    });
    if (!slotElements) {
      return;
    }

    const newElements: CarouselElement[] = [];
    for (let i = 1; i < slotElements.length + 1; i++) {
      const newEl: CarouselElement = { title: '', element: '' };
      const title = Object.keys(slots).find((el) => {
        return el === 'title-' + i;
      });
      const element = Object.keys(slots).find((el) => {
        return el === 'element-' + i;
      });
      newEl.title = <div dangerouslySetInnerHTML={{ __html: title ? slots[title].innerHTML : '' }} />;
      newEl.element = <div dangerouslySetInnerHTML={{ __html: element ? slots[element].innerHTML : '' }} />;
      newElements.push(newEl);
    }
    if (newElements && typeof newElements !== 'number') {
      setLengthOfElements(newElements.length);
    }
    setCarouselElements(newElements);
  }, [webcomponent]);

  useEffect(() => {
    setIndex(index);
  }, [index]);

  useEffect(() => {
    if (elements !== undefined) {
      setCarouselElements(elements);
      setLengthOfElements(
        typeof elements === 'object' ? elements.length : typeof elements === 'string' ? +elements : elements,
      );
    }
  }, [elements]);

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

  const handleButtonClick = (index: number, direction: 'left' | 'right', dotClick?: boolean): void => {
    setIsDown(false);
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(oppositeDirection);
    setFadeIn(false);

    setTimeout(() => {
      // Using modulo to be able to carousel to next element
      // For decrement you have to add the length of elements to prevent negative values
      if (dotClick) {
        updateValue(index);
      } else {
        direction === 'left'
          ? updateValue((index - 1 + lengthOfElements) % lengthOfElements)
          : updateValue((index + 1) % lengthOfElements);
      }
      setSlideDirection(direction);
      setFadeIn(true);
    }, 480);
  };

  const classNameContainer = classnames({
    ['exit-animation']: !fadeIn,
    ['enter-animation']: fadeIn,
  });

  return (
    <CarouselContainer slideDirection={slideDirection}>
      {typeof carouselElements === 'object' && (
        <CarouselElementContainer className={classNameContainer}>
          {typeof carouselElements[index].title === 'string' && (
            <CarouselTitle>
              <h2 className="e-title-sm">{carouselElements[index].title}</h2>
            </CarouselTitle>
          )}
          {typeof carouselElements[index].title === 'object' && (
            <CarouselTitle>{carouselElements[index].title}</CarouselTitle>
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
          >
            {carouselElements[index].element}
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
              onClick={() =>
                listIndex !== index &&
                handleButtonClick(listIndex, listIndex > index ? 'right' : 'left', true)
              }
            />
          ))}
        </ListOfDots>

        {showOnboardingCheckmark ? (
          <CheckButton aria-label={'Fullfør og lukk.'} onClick={() => onHide && onHide()}>
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
