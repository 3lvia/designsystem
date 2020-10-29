import * as React from 'react';
import './style.scss';

function isTouchDevice() {
  return 'ontouchstart' in window;
}
const touchDevice =  isTouchDevice();

export interface CheckboxProps {
  label: string;
  name?: string | "";
  value: string;
  id?: string | "";
  size?: string | ""
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, name, value, id, size }) => {

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
      <input type="checkbox" name={name} value={value || ''} id={id} />
      <span className="ewc-checkbox__mark"></span>
      <span className="ewc-checkbox__label">{label}</span>
  </label>
  );
};



