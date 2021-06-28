import React, { FC, useState, useRef, useEffect } from 'react';
import { CarouselContainer, CarouselTitle, CarouselElement, LeftCarouselButton, ListOfDots, Dot, NavigationRow, RightCarouselButton,CarouselElementContainer  } from './StyledComponents';
import { CSSTransition } from 'react-transition-group';

type CarouselElement = {
  title?: string;
  element: JSX.Element | string |HTMLElement;
}

export interface BaseCarouselProps {
  className?: string;
  style?: React.CSSProperties;
  hideArrows?: boolean;
  valueOnChange?: (value: number) => void;
  webcomponent?: any;
  elements: CarouselElement[] | number;

}

// don't know why it says it does not exist
export const Carousel: FC<BaseCarouselProps> = ({ className, style, elements, hideArrows = false, valueOnChange, webcomponent }) => {
  className;
  style; //why are these just defined like this?
  const [index, setIndex] = useState(0)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left'|'right'>('left');

  const itemsRef = useRef<HTMLDivElement>(null);

  const lengthOfElements = typeof elements === 'object'  ? elements.length : elements

  const hideLeftArrow = index === 0
  const hideRightArrow = index === lengthOfElements - 1

  const updateValue = (index: number) => {
    setIndex(index)
    if (!webcomponent && valueOnChange) {
      valueOnChange(index);
    }
    else if (webcomponent) {
      // True -> Prevents rerender
      const value = index
      webcomponent.setProps({ value: value }, true);
    }
  }

   // Is necessary since the web component does not send all props at once
   useEffect(() => {
    setIndex(index);
  }, [index]);


  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    if (!itemsRef.current) {
      return;
    }
    setStartX(clientX -  itemsRef?.current?.offsetLeft);
    setIsDown(true)
  }


  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (isDown) {
      const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
      if (!itemsRef.current) {
        return;
      }
      const x = clientX - itemsRef?.current?.offsetLeft;
      const distance = (x - startX) * 3;
      if (distance < -400 ) {
        handleButtonClick(index,'right')
      }
      if (distance > 400) {
        handleButtonClick(index, 'left')
      }
    }
  }

  const handleButtonClick = (index: number, direction: 'left' | 'right'): void => {
    setIsDown(false)
    const oppDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(oppDirection);
    setSlideIn(false);

    setTimeout(() => {
      direction === 'left' ? updateValue((index - 1 + lengthOfElements) % lengthOfElements) : updateValue((index + 1) % lengthOfElements)
      setSlideDirection(direction);
      setSlideIn(true);
  }, 500);
  }


  return (
    <CarouselContainer slideDirection={slideDirection}>
      {typeof elements === 'object' &&
      <CSSTransition in={slideIn} classNames={'carousel'} timeout={{
        appear: 300,
        enter: 1000,
        exit: 1000,
       }}
       >
      <CarouselElementContainer >
      <CarouselTitle typography='medium'>
        {elements[index].title}
      </CarouselTitle>
      <CarouselElement typography='medium' ref={itemsRef}
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

      </CSSTransition>
      }
      <NavigationRow>
        <LeftCarouselButton aria-label={`Gå til side ${index + 1}`} hidden={hideArrows && hideLeftArrow} onClick={()=>
          handleButtonClick(index,'left')
        }><i/></LeftCarouselButton>
        <ListOfDots>
            {Array.from(Array(lengthOfElements), (e, listIndex: number) =>
            <Dot key={listIndex} isSelected={listIndex === index} tabIndex={0} aria-label={listIndex === index ? `Du er på side ${listIndex + 1}` : `Gå til side ${listIndex + 1}`}
            onClick={() => updateValue(listIndex)}
            />
          )}
        </ListOfDots>
        <RightCarouselButton aria-label={`Gå til side ${index + 1}`} hidden={hideArrows && hideRightArrow} onClick={()=>
          handleButtonClick(index,'right')
        }><i/></RightCarouselButton>
      </NavigationRow>
    </CarouselContainer>
  );
};

export default Carousel;
