import * as React from 'react';
import { forwardRef, useEffect, useState, useRef } from 'react';
import './style.scss';

export interface TabsProps {
  labels: string[];
  selected: number;
  disabled: number[];
}

const Tabs: React.FC<TabsProps> = forwardRef((props: TabsProps, ref: any) => {
  const [selected, setSelected] = useState(props.selected);
  const tabsRef = useRef<HTMLSpanElement>(null);

  // Running on first render only (on mount)
  useEffect(() => {
    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

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

  useEffect(() => {
    console.log(props.selected);
    setSelected(props.selected);
  }, [props.selected]);

  function isDisabled(i: number) {
    let disabled = false;
    props.disabled.map((index) => {disabled = index == i});
    return disabled;
  }

  return (
    <span ref={ref}>
      <span className="ewc-tabs ewc-no-outline" ref={tabsRef}>
        { (props.labels !== undefined && props.labels !== null) && props.labels.map((label, i) => (
          <button 
            className={`
              ewc-tabs__label 
              ${selected == i && "ewc-tabs__label--selected" } 
            `} 
            // ${isDisabled(i) && "ewc-tabs__label--disabled"}
            key={i} 
            onClick={() => setSelected(i)}
            // disabled={isDisabled(i)}
          >
            {label}
          </button>
        ))}
      </span>
    </span>
  );
});

export default Tabs;