import React, { FC, useState, useRef, useEffect } from 'react';
import { CarouselContainer, CarouselTitle, Element, Ellipse, LeftCarouselButton, ListOfEllipses, NavigationRow, RightCarouselButton,  } from './StyledComponents';

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
  const itemsRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)


  const lengthOfElements = typeof elements === 'object'  ? elements.length : elements
  console.log(lengthOfElements)

  const updateIndex = (index: number) => {
    setIndex(index)
    updateCallbackValue(index)
  }

  const updateCallbackValue = (index: number) => {
    if (!webcomponent && valueOnChange) {
      valueOnChange(index);
    }
    else if (webcomponent) {
      // True -> Prevents rerender
      const value = index
      console.log(webcomponent)
      webcomponent.setProps({ value: value }, true);
    }
  }

  useEffect(() => {
    updateCallbackValue(index)
  },[])

  const handleMouseDown = (e: MouseEvent) => {
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    setStartX(clientX - itemsRef?.current?.offsetLeft);
    //setScrollLeft(itemsRef?.current?.scrollLeft)
    setIsDown(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    //e.preventDefault();
    if (isDown) {
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
      const x = clientX - itemsRef?.current?.offsetLeft;
      const walk = (x - startX) * 3;
      //itemsRef.current.scrollLeft = scrollLeft - walk;
      if (walk < -400 ) {
        handleButtonClick(index,'right')
      }
      if (walk > 400) {
        handleButtonClick(index, 'left')
      }
    }
  }

  const handleButtonClick = (index: number, direction: 'left' | 'right'): void => {
    setIsDown(false)
    return direction === 'left' ? updateIndex((index - 1 + lengthOfElements) % lengthOfElements) : updateIndex((index + 1) % lengthOfElements)

  }

  const hideLeftArrow = index === 0
  const hideRightArrow = index === lengthOfElements - 1


console.log(isDown)

  return (
    <CarouselContainer>
      {typeof elements === 'object' &&
      <>
      <CarouselTitle typography='medium'>
        {elements[index].title}
      </CarouselTitle>
      <Element typography='medium' ref={itemsRef}
          onMouseDown={(e: MouseEvent) => handleMouseDown(e)}
          onMouseUp={() => setIsDown(false)}
          onMouseLeave={() => setIsDown(false)}
          onMouseMove={(e: MouseEvent) => handleMouseMove(e)}
          onTouchStart={(e: MouseEvent) => handleMouseDown(e)}
          onTouchMove={(e: MouseEvent) => handleMouseMove(e)}
          onTouchEnd={() => setIsDown(false)}
             >
          {elements[index].element}
      </Element>
      </>
      }
      <NavigationRow>
        <LeftCarouselButton aria-label={`Gå til side ${index + 1}`} hidden={hideArrows && hideLeftArrow} onClick={()=>
          handleButtonClick(index,'left')
        }><i/></LeftCarouselButton>
        <ListOfEllipses>
            {Array.from(Array(lengthOfElements), (e, listIndex: number) =>
            <Ellipse key={listIndex} isSelected={listIndex === index} tabIndex={0} aria-label={listIndex === index ? `Du er på side ${listIndex + 1}` : `Gå til side ${listIndex + 1}`}
            onClick={() => updateIndex(listIndex)}
            />
          )}
        </ListOfEllipses>
        <RightCarouselButton aria-label={`Gå til side ${index + 1}`} hidden={hideArrows && hideRightArrow} onClick={()=>
          handleButtonClick(index,'right')
        }><i/></RightCarouselButton>
      </NavigationRow>
    </CarouselContainer>
  );
};

export default Carousel;
