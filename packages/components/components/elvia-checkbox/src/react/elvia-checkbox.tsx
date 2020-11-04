import * as React from 'react';
import { useState } from 'react';
import './style.scss';
import { check } from '../../../../../elvis/icons';

// Temporary touchDevice check, needs work
function isTouchDevice() {
  return 'ontouchstart' in window;
}
const touchDevice = isTouchDevice();

export interface CheckboxProps {
  label: string;
  name?: string | '';
  value: string;
  id?: string | '';
  size?: string | '';
  checked: string;
  disabled: string;
  required: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  value,
  id,
  size,
  checked,
  disabled,
  required,
}) => {
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }, []);

  const classes = [
    'ewc-checkbox',
    size === 'small' ? 'ewc-checkbox--sm' : '',
    touchDevice ? 'is-Touch' : '',
  ].join(' ');

  // check and add html5 input modifers
  const isChecked = checked === 'true' || checked === '';
  const isDisabled = disabled === 'true' || disabled === '';
  const isRequired = required === 'true' || required === '';

  return (
    <label className={classes}>
      <input
        type="checkbox"
        name={name}
        value={value || ''}
        id={'ewc' + id}
        checked={isChecked}
        disabled={isDisabled}
        required={isRequired}
        readOnly
      />
      <span className="ewc-checkbox__mark"></span>
      <span className="ewc-checkbox__label">{label}</span>
    </label>
  );
};
