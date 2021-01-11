import * as React from 'react';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
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

const Checkbox: React.FC<CheckboxProps> = forwardRef((props, ref: any) => {
  const [isChecked, setCheckedState] = useState(false);
  const checkboxRef = useRef<HTMLLabelElement>(null);
  const classes = ['ewc-checkbox ', props.size === 'small' ? 'ewc-checkbox--sm' : '', ' ewc-no-outline'].join(
    ' ',
  );
  // check and add html5 input modifers
  const isDisabled = props.disabled === 'true' || props.disabled === '';
  const isRequired = props.required === 'true' || props.required === '';
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
    if (props.checked === isChecked && props.checked === undefined) {
      return;
    }
    if (didMountRef.current) {
      updateCheckedState(props.checked);
    } else if (props.checked || props.checked === 'true') {
      updateCheckedState(true);
    } else {
      didMountRef.current = true;
    }
  }, [props.checked]);

  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [isChecked]);

  function updateReactComponent() {
    if (!props.webcomponent && props.changeHandler) {
      // Small hack temporarily, because state not reflected correct on mount making infinite loop
      if (!didMountRef.current) {
        props.changeHandler(true);
        didMountRef.current = true;
      } else {
        props.changeHandler(isChecked);
      }
    }
  }

  function updateWebcomponent() {
    if (props.webcomponent) {
      // True -> Prevents rerender
      props.webcomponent.setProps({ checked: isChecked }, true);
    }
  }

  // Defines methods available with use of ref
  useImperativeHandle(ref, () => {
    return {
      updateCheckedState: updateCheckedState,
    };
  });

  return (
    <span ref={ref}>
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
        <span className="ewc-checkbox__label">{props.label}</span>
      </label>
    </span>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
