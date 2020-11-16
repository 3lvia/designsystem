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
  const classes = ['ewc-checkbox ', props.size === 'small' ? 'ewc-checkbox--sm' : '', ' e-no-outline'].join(' ');
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

    function toggleOutline(e: KeyboardEvent) {
      if (!checkboxRef.current) {
        return;
      } else if (e.key === 'Tab') {
        checkboxRef.current.classList.remove('e-no-outline');
      } else if (!checkboxRef.current.classList.contains('e-no-outline')) {
        checkboxRef.current.classList.add('e-no-outline');
      }
    }

    document.body.addEventListener('keydown', e => toggleOutline(e));

    return (() => {
      document.body.removeEventListener('keydown', e => toggleOutline(e));
    });
  }, []);

  function updateCheckedState(checked?: any) {
    if(checked){
      setCheckedState(checked);
    } else {
      setCheckedState(prevCheckedState => !prevCheckedState);
    }
  }

  useEffect(() => {
    // If not mounted only update state if it is a change
    if (didMountRef.current){
      updateCheckedState(props.checked);
    } else if (props.checked || props.checked === 'true') {
      updateCheckedState(props.checked);
      didMountRef.current = true;
    }
  }, [props.checked]);

  useEffect(() => {
    updateReactComponent()
    updateWebcomponent();
  }, [isChecked]);
  
  function updateReactComponent() {
    if(!props.webcomponent && props.changeHandler){
      props.changeHandler(isChecked);
    } 
  }

  function updateWebcomponent() {
    if (props.webcomponent) {
      // True -> Prevents rerender
      props.webcomponent.setProps({ checked: isChecked }, true);
    }
  }

  useImperativeHandle(ref, () => {
     return {
      updateCheckedState: updateCheckedState,
     }
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

export default Checkbox;