import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import './style.scss';

export interface ProgressbarProps {
  rangeValue: number;
  indeterminate?: boolean;
  error?: boolean;
  changeHandler?: any;
  webcomponent?: any;
}
// validate if progressrange is between 0 & 100
const isValid = (value: number) => value > -1 && value <= 100;

const ProgressbarLinear: React.FC<ProgressbarProps> = (props) => {
  // inital state
  const [percentRange, setProgress] = useState(0);
  const [isIndeterminate, setIndeterminateState] = useState(() => {
    return false;
  });
  const [isError, setErrorState] = useState(false);

  const setClasses = [
    // tslint:disable-next-line:max-line-length
    !props.indeterminate && !props.error ? 'ewc-progress--linear__range' : '',
    props.indeterminate &&  !props.error ? 'ewc-progress--linear__indeterminate' : '',
    props.error && !props.indeterminate  ? 'ewc-progress--linear__error' : '' ,
    props.indeterminate && props.error ? 'ewc-progress--linear__error' : '',
  ];
  const classes = [...setClasses].join('');
  const didMountRef = useRef(false);

  useEffect(() => {
    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }, []);

  const updateRangeValue = (progressInput: number | undefined) => {
    if (progressInput !== undefined) {
      if (!isValid(progressInput)) {
        console.error('<elvis-progressbar>: inputRange value ' + props.rangeValue + ' is invalid! Must be between 0 and 100.');
      } else {
        if (progressInput === null) {
          setProgress(0);
        } else {
          setProgress(progressInput);
        }
      }
    }
  };

  const updateErrorState = (errorInput: boolean | undefined) => {
    if (errorInput && errorInput !== isError) {
      setErrorState(true);
    } else if (!errorInput && errorInput !== isError){
      setErrorState(false);
    } else {
      return;
    }
  };

  const updateIsIndeterminateState = (indeterminateInputState: boolean | undefined) => {
    if (indeterminateInputState) {
      setIndeterminateState(true);
    } else if (!indeterminateInputState && indeterminateInputState !== undefined && isIndeterminate === true) {
      setIndeterminateState(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (didMountRef.current) {
      if (props.error) {
        updateErrorState(props.error);
      } else {
        if (props.indeterminate) {
          updateIsIndeterminateState(props.indeterminate);
        } else {
          updateRangeValue(props.rangeValue);
        }
      }
    } else {
      didMountRef.current = true;
    }

  }, [props.rangeValue, props.indeterminate, props.error] );



  useEffect(() => {
    updateReactComponent(),
    updateWebcomponent();
  }, [percentRange]);


  function updateReactComponent() {
    if (!props.webcomponent && props.changeHandler) {
      // Small hack temporarily, because state not reflected correct on mount making infinite loop
      if (didMountRef.current) {
        props.changeHandler(true);
        didMountRef.current = true;
      } else {
        props.changeHandler(percentRange),
        props.changeHandler(props.error),
        props.changeHandler(props.indeterminate);
      }
    }
  }

  function updateWebcomponent() {
    if (props.webcomponent) {
      // True -> Prevents rerender
      props.webcomponent.setProps({ rangeValue : percentRange }),
      props.webcomponent.setProps({ error : props.error }),
      props.webcomponent.setProps({ indeterminate : props.indeterminate });
    }
  }

  return (
    <span>
      <div className='ewc-progress--linear'>
          <div
            className={classes}
            style={{width: `${percentRange}%`}}
            ></div>
      </div>
    </span>
  );
};

export default ProgressbarLinear;
