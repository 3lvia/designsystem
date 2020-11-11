import * as React from 'react';
import { useRef, useState } from 'react';
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

  const checkboxEl = useRef<HTMLLabelElement>(null);

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

  document.body.addEventListener('keydown', e => toggleOutline(e));

  function toggleOutline(e: KeyboardEvent) {
    if (!checkboxEl.current) {
      return;
    } else if (e.key === 'Tab') {
      checkboxEl.current.classList.remove('e-no-outline');
    } else if (!checkboxEl.current.classList.contains('e-no-outline')) {
      checkboxEl.current.classList.add('e-no-outline');
    }
  }

  const classes = ['ewc-checkbox ', size === 'small' ? 'ewc-checkbox--sm' : '', ' e-no-outline'].join(' ');
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
    <label className={classes} ref={checkboxEl}>
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
