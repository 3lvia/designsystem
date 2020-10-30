import * as React from 'react';
import { useState } from 'react';
import './style.scss';
import { check } from '../../../../../elvis/icons';

function isTouchDevice() {
  return 'ontouchstart' in window;
}
const touchDevice =  isTouchDevice();

function propChecked(checkprop: string | undefined) {
  if(checkprop === "true") {
    return true;
  } else {
    return false
  }
}

export interface Checkbox {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface CheckboxProps {
  label: string;
  name?: string | "";
  value?: boolean;
  id?: string | "";
  size?: string | "";
  checked: string | "";
  // disabled?: boolean;
  // requiered?: boolean;
}


export const Checkbox: React.FC<CheckboxProps> = ({ label, name, value, id, size, checked }) => {

  const [check, setcheck] = useState(() => false);
  function toggleCheck() {
    setcheck(prevCheck => !prevCheck)
  }

  const [disabled, setDisabled] = useState(() => false);
  function toggleDisabled() {
    setcheck(preDisabled => !preDisabled)
  }
  const [require, setRequre] = useState(() => false);
  function toggleRequire() {
    setcheck(preRequire => !preRequire)
  }

  // function propCheck(checkprop: string) {
  //   if(checkprop === "true") {
  //     setcheck(true);
  //   } else {
  //     setcheck(false)
  //   }
  // }
  // propCheck(checked);
  // const isChecked = propChecked(checked);
  // if(isChecked) {
  //   setcheck(true);
  // }

  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }, []);

  const classes = ['ewc-checkbox', size === "small" ? 'ewc-checkbox--sm' : '', touchDevice ? 'is-Touch' : ''].join(' ');

  return (
  <label className={classes} >
      <input type="checkbox" name={name} value={value} id={id} checked={check} onClick={toggleCheck} onChange={toggleCheck}/>
      <span className="ewc-checkbox__mark"></span>
      <span className="ewc-checkbox__label">{label}</span>
  </label>
  );
};





