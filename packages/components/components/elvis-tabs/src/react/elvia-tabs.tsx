import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import './style.scss';

export interface TabsProps {
  labels: string[];
  selectedTab: number;
  disabledTabs?: number[];
  changeHandler?: any;
  webcomponent?: any;
}

const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(props.selectedTab);
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
    console.log("selected : "+selectedTab);
    console.log("selected prop : "+props.selectedTab);
    setSelectedTab(props.selectedTab);
  }, [props.selectedTab]);
  useEffect(() => {
    console.log("disabled prop : "+props.disabledTabs);
  }, [props.disabledTabs]);

  useEffect(() => {
    console.log("selected : "+selectedTab);
    console.log("selected prop : "+props.selectedTab);
    updateReactComponent();
    updateWebcomponent();
  }, [selectedTab]);
  
  function updateReactComponent() {
    if(!props.webcomponent && props.changeHandler){
      props.changeHandler(selectedTab);
    } 
  }

  function updateWebcomponent() {
    if (props.webcomponent) {
      // True -> Prevents rerender
      props.webcomponent.setProps({ selectedTab: selectedTab }, true);
    }
  }

  function isDisabled(i: number): boolean {
    if(props.disabledTabs === undefined) { return false; }
    let isDisabled = false;
    props.disabledTabs.forEach((index) => {if(index === i) { isDisabled = true}});
    return isDisabled;
  }

  function isSelected(i: number): boolean {
    return selectedTab === i;
  }

  return (
    <span className="ewc-tabs ewc-no-outline" ref={tabsRef}>
      { (props.labels !== undefined && props.labels !== null) && props.labels.map((label, i) => (
        <button 
          className={`
            ewc-tabs__label 
            ${isSelected(i) && "ewc-tabs__label--selected" } 
            ${isDisabled(i) && "ewc-tabs__label--disabled"}
          `} 
          key={i} 
          onClick={() => setSelectedTab(i)}
          disabled={isDisabled(i)}
        >
          {label}
        </button>
      ))}
    </span>
  );
};

export default Tabs;