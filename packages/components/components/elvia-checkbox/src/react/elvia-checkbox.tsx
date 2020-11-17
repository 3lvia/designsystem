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
    console.log('updating: ' + checked);
    if(checked !== undefined){
      setCheckedState(checked);
    } else {
      setCheckedState(prevCheckedState => !prevCheckedState);
    }
    console.log('updated ' + isChecked);
  }

  useEffect(() => {
    // If not mounted only update state if it is a change
    console.log(props.checked + ' : ' + isChecked);
    if(props.checked === isChecked && props.checked === undefined) {
      return;
    }
    if (didMountRef.current) {
      updateCheckedState(props.checked);
    } else if (props.checked || props.checked === 'true'){
      updateCheckedState(true);
    }  else {
      didMountRef.current = true;
    }
  }, [props.checked]);

  useEffect(() => {
    console.log('after update: ' + isChecked);
    updateReactComponent();
    updateWebcomponent();
  }, [isChecked]);
  
  function updateReactComponent() {
    console.log('update react: ' + isChecked);
    if(!props.webcomponent && props.changeHandler){
      // Small hack temporarily, because state not reflected correct on mount making infinite loop
      if(!didMountRef.current) {
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