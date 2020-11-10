import * as React from 'react';
import { useState } from 'react';
import './style.scss';

export interface CheckboxProps {
  label: string;
  name?: string | '';
  size?: string | '';
  checked: string | boolean;
  disabled: string;
  required: string;
  changeHandler?: any;
  webcomponent?: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  size,
  checked,
  disabled,
  required,
  webcomponent,
}) => {
  let [isChecked, setCheckedState] = useState(false);

  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }, []);

  React.useEffect(() => {
    if (checked === true || checked === 'true') {
      toggleChecked();
    }
  }, [checked]);

  const classes = ['ewc-checkbox', size === 'small' ? 'ewc-checkbox--sm' : ''].join(' ');
  // check and add html5 input modifers
  const isDisabled = disabled === 'true' || disabled === '';
  const isRequired = required === 'true' || required === '';

  const toggleChecked = () => {
    isChecked = !!!isChecked;
    setCheckedState(isChecked);
    if (webcomponent) {
      webcomponent.setProps(
        {
          checked: isChecked,
        },
        true, // Prevent rerender
      );
    }
  };

  return (
    <label className={classes}>
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        disabled={isDisabled}
        onClick={toggleChecked}
        required={isRequired}
        readOnly
      />
      <span className="ewc-checkbox__mark"></span>
      <span className="ewc-checkbox__label">{label}</span>
    </label>
  );
};
