import * as React from 'react';
import './style.scss';

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

  return (
  <label className={size === "small" ? 'ewc-checkbox ewc-checkbox--sm' : 'ewc-checkbox'}>
      <input type="checkbox" name={name} value={value || ''} id={id} />
      <span className="ewc-checkbox__mark"></span>
      <span className="ewc-checkbox__label">{label}</span>
  </label>
  );
};



