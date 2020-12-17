import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import './style.scss';


export interface TabItem {
  label: string;
  disabled?: boolean;
}
export interface TabsProps {
  items: TabItem[];
  value: number;
  valueOnChange?: any;
  webcomponent?: any;
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const throttle = (func: any, limit: number) => {
  let inThrottle: boolean | NodeJS.Timeout;
  return (...args: any) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Tabs: React.FC<TabsProps> = ({items, value, valueOnChange, webcomponent}) => {
  const [currValue, setValue] = useState(value);
  const [onTheRightEnd, setOnTheRightEnd] = useState(false);
  const [onTheLeftEnd, setOnTheLeftEnd] = useState(true);
  const tabsRef = useRef<HTMLSpanElement>(null);
  const itemsRef = useRef<HTMLSpanElement>(null);

  // Running on first render only (on mount)
  useEffect(() => {
    function addOutline(e: KeyboardEvent) {
      if (tabsRef.current && e.key === 'Tab') {
        tabsRef.current.classList.remove('ewc-no-outline');
      }
    }
    function removeOutline() {
      if (tabsRef.current &&  !tabsRef.current.classList.contains('ewc-no-outline')) {
        tabsRef.current.classList.add('ewc-no-outline');
      }
    }

    document.body.addEventListener('keydown', e => addOutline(e));
    document.body.addEventListener('click', () => removeOutline());

    return (() => {
      document.body.removeEventListener('keydown', e => addOutline(e));
      document.body.removeEventListener('keydown', () => removeOutline());
    });
  }, []);


  // Selected value
  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [currValue]);

  function updateReactComponent() {
    if(!webcomponent && valueOnChange){
      valueOnChange(currValue);
    } 
  }

  function updateWebcomponent() {
    if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: currValue }, true);
    }
  }
  
  // Scroll position
  useEffect(() => {
    if(!itemsRef){
      return;
    }
    updateScrollPosition();
  }, [itemsRef]);

  function updateScrollPosition() {
    if(!itemsRef.current){
      return;
    }
    const endOfItem = itemsRef.current.scrollWidth - itemsRef.current.getBoundingClientRect().width
    setOnTheRightEnd(itemsRef.current.scrollLeft >= endOfItem);
    setOnTheLeftEnd(itemsRef.current.scrollLeft <= 0);
  }

  function scrollToLeft() {
    if(!itemsRef.current){
      return;
    }
    itemsRef.current.scrollLeft -= 50;
    updateScrollPosition();
  }

  function scrollToRight() {
    if(!itemsRef.current){
      return;
    }
    itemsRef.current.scrollLeft += 50;
    updateScrollPosition();
  }

  // Listen to resize changes
  useEffect(() => {
    const throttledCount = throttle(updateScrollPosition, 150);
    window.addEventListener('resize', throttledCount);
    return () => window.removeEventListener('resize', throttledCount);
  }, [updateScrollPosition]);

  return (
    <span className="ewc-tabs ewc-no-outline" ref={tabsRef}>
      { !onTheLeftEnd && <span className="ewc-tabs__icon" onClick={() => scrollToLeft()}>
        <i
          className="ewc-icon ewc-icon--arrow_left-bold ewc-icon--xxs"
          style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.716 23.122a2.89 2.89 0 00-.08-4.04L11.373 12l7.261-7.082a2.89 2.89 0 00.081-4.04A2.782 2.782 0 0014.74.796L5.365 9.939A2.88 2.88 0 004.5 12c0 .778.312 1.522.865 2.061l9.375 9.143a2.782 2.782 0 003.976-.082z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`}}
          e-id="e-icone-icon--arrow_left-bold"
        ></i>
      </span>}

      <span className="ewc-tabs__items" ref={itemsRef}>
        { items.map((item, i) => (
          <button 
            className={`ewc-tabs__label ${value === i && "ewc-tabs__label--selected" }`} 
            key={i} 
            onClick={() => setValue(i)}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </span>

      { !onTheRightEnd && <span className="ewc-tabs__icon" onClick={() => scrollToRight()}>
        <i
          className="ewc-icon ewc-icon--arrow_right-bold ewc-icon--xxs"
          style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.284.878a2.89 2.89 0 00.08 4.04L12.627 12l-7.261 7.082a2.89 2.89 0 00-.081 4.04 2.782 2.782 0 003.976.082l9.375-9.143A2.88 2.88 0 0019.5 12a2.88 2.88 0 00-.865-2.061L9.26.796a2.782 2.782 0 00-3.976.082z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`}}
          e-id="e-icone-icon--arrow_right-bold"
        ></i>
      </span> }
    </span>
  );
};

export default Tabs;