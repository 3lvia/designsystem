import * as React from 'react';
import './style.scss';

export interface CheckboxProps {
  label: string;
  name: string;
  value: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, name, value }) => {
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }, []);

  return (

  <label className="e-checkbox">
      <input type="checkbox" name={name} id={value} />
      <span className="e-checkbox__mark"></span>
      <span className="e-checkbox__label">{label}</span>
  </label>
  );
};
