import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import './style.scss';

export interface CheckboxProps {
  label: string;
  name: string;
  size: string;
  checked: boolean;
  disabled: string;
  required: string;
  changeHandler?: any;
  webcomponent?: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  size,
  checked,
  disabled,
  required,
  changeHandler,
  webcomponent,
}) => {
  const [isChecked, setCheckedState] = useState(false);
  const checkboxRef = useRef<HTMLLabelElement>(null);
  const classes = ['ewc-checkbox ', size === 'small' ? 'ewc-checkbox--sm' : '', ' ewc-no-outline'].join(' ');
  // check and add html5 input modifers
  const isDisabled = disabled === 'true' || disabled === '';
  const isRequired = required === 'true' || required === '';
  const didMountRef = useRef(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    function addOutline(e: KeyboardEvent) {
      if (checkboxRef.current && e.key === 'Tab') {
        checkboxRef.current.classList.remove('ewc-no-outline');
      }
    }
    function removeOutline() {
      if (checkboxRef.current && !checkboxRef.current.classList.contains('ewc-no-outline')) {
        checkboxRef.current.classList.add('ewc-no-outline');
      }
    }

    document.body.addEventListener('keydown', (e) => addOutline(e));
    document.body.addEventListener('click', () => removeOutline());

    return () => {
      document.body.removeEventListener('keydown', (e) => addOutline(e));
      document.body.removeEventListener('keydown', () => removeOutline());
    };
  }, []);

  function updateCheckedState(checked?: any) {
    if (checked !== undefined) {
      setCheckedState(checked);
    } else {
      setCheckedState((prevCheckedState) => !prevCheckedState);
    }
  }

  useEffect(() => {
    // If not mounted only update state if it is a change
    if (checked === isChecked && checked === undefined) {
      return;
    }
    if (didMountRef.current) {
      updateCheckedState(checked);
    } else if (checked) {
      updateCheckedState(true);
    } else {
      didMountRef.current = true;
    }
  }, [checked]);

  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [isChecked]);

  function updateReactComponent() {
    if (!webcomponent && changeHandler) {
      // Small hack temporarily, because state not reflected correct on mount making infinite loop
      if (!didMountRef.current) {
        changeHandler(true);
        didMountRef.current = true;
      } else {
        changeHandler(isChecked);
      }
    }
  }

  function updateWebcomponent() {
    if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ checked: isChecked }, true);
    }
  }

  // Defines methods available with use of ref
  // useImperativeHandle(ref, () => {
  //   return {
  //     updateCheckedState: updateCheckedState,
  //   };
  // });

  return (
    <span>
      <label className={classes} ref={checkboxRef}>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          disabled={isDisabled}
          onClick={() => updateCheckedState()}
          required={isRequired}
          readOnly
        />
        <span className="ewc-checkbox__mark"></span>
        <span className="ewc-checkbox__label">{label}</span>
      </label>
    </span>
  );
};

Checkbox.displayName = 'Checkbox';
export default Checkbox;
