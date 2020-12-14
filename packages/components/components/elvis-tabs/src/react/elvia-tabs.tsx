import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import './style.scss';

export interface TabsProps {
  labels: string[];
  selected: number;
  disabled: number[];
}

const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
  const [selected, setSelected] = useState(props.selected);
  const tabsRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  function isDisabled(i: number): boolean {
    if(props.disabled === undefined) { return false; }
    let isDisabled = false;
    props.disabled.map((index) => {isDisabled = index == i});
    return isDisabled;
  }

  return (
    <span className="ewc-tabs ewc-no-outline" ref={tabsRef}>
      { (props.labels !== undefined && props.labels !== null) && props.labels.map((label, i) => (
        <button 
          className={`
            ewc-tabs__label 
            ${selected == i && "ewc-tabs__label--selected" } 
            ${isDisabled(i) && "ewc-tabs__label--disabled"}
          `} 
          key={i} 
          onClick={() => setSelected(i)}
          disabled={isDisabled(i)}
        >
          {label}
        </button>
      ))}
    </span>
  );
};

export default Tabs;