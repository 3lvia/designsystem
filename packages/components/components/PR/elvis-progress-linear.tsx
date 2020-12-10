import * as React from 'react';
import { useEffect, useRef } from 'react';
import './style.scss';

export interface ProgressbarProps {
  rangeValue?: number;
  indeterminate?: boolean ;
  error?: boolean;
  changeHandler?: any;
  webcomponent?: any;
}
// validate if progressrange is between 0 & 100
const isValid = (value: number) => value >= 0 && value <= 100 ;

const ProgressLinear: React.FC<ProgressbarProps> = (props) => {
  // check indeterminate props in case from webcomponent, convert string to boolean
  let isIndeterminate = false;
  if (props.indeterminate !== null) {
    if (props.indeterminate !== undefined) {
      if (props.indeterminate.toString() === 'false') {
        isIndeterminate = false;
      } else {
        isIndeterminate = props.indeterminate;
      }
    }
  }
  // check error props in case from webcomponent, convert string to boolean
  let isError = false;
  if (props.error !== null) {
    if (props.error !== undefined) {
      if (props.error.toString() === 'false') {
        isError = false;
      } else {
        isError = props.error;
      }
    }
  }

  // set inital class for progress-linear
  let classes = '';
  const initialClasses = [
    !isIndeterminate && !isError ? 'ewc-progress-linear--range' : '',
    isIndeterminate &&  !isError ? 'ewc-progress-linear--indeterminate' : '',
    isError && !isIndeterminate  ? 'ewc-progress-linear--error' : '' ,
    isIndeterminate && isError ? 'ewc-progress-linear--error' : '',
  ];
  classes = [...initialClasses].join('');

  // set new classes
  const setNewClasses = () => {
    const newClasses = [
    !isIndeterminate && !isError ? 'ewc-progress-linear--range' : '',
    isIndeterminate &&  !isError ? 'ewc-progress-linear--indeterminate' : '',
    isError && !isIndeterminate  ? 'ewc-progress-linear--error' : '' ,
    isIndeterminate && isError ? 'ewc-progress-linear--error' : '',
    ];
    classes = [...newClasses].join('');
  };
  const didMountRef = useRef(false);

  useEffect(() => {
    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }, []);

  // set new classes on prop change
  useEffect(() => {
   setNewClasses();
  }, [props.indeterminate, props.error]);

  // update on change from webcomp
  useEffect(() => {
    updateReactComponent(),
    updateWebcomponent();
  }, [props.rangeValue, props.indeterminate, props.error]);

  // console error message on invalid rangeValue
  useEffect(() => {
    if (props.rangeValue !== undefined) {
      if (!isValid(props.rangeValue)){
        console.error('<elvis-progressbar>: inputRange value ' + props.rangeValue + ' is invalid! Must be between 0 and 100.');
      }
    }
  }, [props.rangeValue]);


  function updateReactComponent() {
    if (!props.webcomponent && props.changeHandler) {
      // Small hack temporarily, because state not reflected correct on mount making infinite loop
      if (didMountRef.current) {
        props.changeHandler(true);
        didMountRef.current = true;
      } else {
        props.changeHandler(props.rangeValue),
        props.changeHandler(props.error),
        props.changeHandler(props.indeterminate);
      }
    }
  }

  function updateWebcomponent() {
    if (props.webcomponent) {
      // True -> Prevents rerender
      props.webcomponent.setProps({ rangeValue : props.rangeValue }),
      props.webcomponent.setProps({ error : props.error }),
      props.webcomponent.setProps({ indeterminate : props.indeterminate });
    }
  }

  return (
    <span>
      <div className='ewc-progress-linear'>
          <div
            className={classes}
            style={{width: `${props.rangeValue === null ? 0 : props.rangeValue}%`}}
            ></div>
      </div>
    </span>
  );
};

export default ProgressLinear;
