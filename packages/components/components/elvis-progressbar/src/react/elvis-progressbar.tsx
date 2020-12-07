import * as React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import './style.scss';

export interface ProgressbarProps {
  rangeValue: number;
  indeterminate?: boolean;
  error?: boolean;
  changeHandler?: any;
  webcomponent?: any;
}
// validate if progressrange is between 0 & 100
const isValid = (value: number) => value >= 0 && value <= 100;

const Progressbar: React.FC<ProgressbarProps> = (props) => {
  // inital state
  const [percentRange, setProgress] = useState(0);
  const [isIndeterminate, setIndeterminateState] = useState(() => {
    return false;
  });
  const [isError, setErrorState] = useState(false);

  const setClasses = [
    // tslint:disable-next-line:max-line-length
    !isIndeterminate || isIndeterminate === undefined || isIndeterminate === null  && !isError || isError === undefined || isError === undefined  ? 'ewc-progress--linear__range' : '',
    isIndeterminate === true && isIndeterminate !== undefined && isIndeterminate !== null &&  !isError ? 'ewc-progress--linear__indeterminate' : '',
    isError ? 'ewc-progress--linear__error' : '' ,
    isIndeterminate && isError ? 'ewc-progress--linear__error' : '',
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
        setProgress(progressInput);
      }
    }
  };

  const updateErrorState = () => {
    if (!props.error) {
      setErrorState(false);
    } else {
      setErrorState(true);
      setIndeterminateState(false);
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
    if (didMountRef.current && props.rangeValue !== percentRange) {
        updateRangeValue(props.rangeValue);
    } else if (didMountRef.current && props.indeterminate !== isIndeterminate){
      updateIsIndeterminateState(props.indeterminate);

      // få inn error her også
    } else {
     didMountRef.current = true;
    }
  }, [props.rangeValue, props.indeterminate] );



  useEffect(() => {
    updateReactComponent(),
    updateWebcomponent();
    // her må det også legges til sjekker at vi oppdaterer web comp ved endringer på error og indeterminate???
  }, [percentRange]);


  function updateReactComponent() {
    if (!props.webcomponent && props.changeHandler) {
      // Small hack temporarily, because state not reflected correct on mount making infinite loop
      if (didMountRef.current) {
        props.changeHandler(true);
        didMountRef.current = true;
      } else {
        props.changeHandler(percentRange),
        props.changeHandler(isError),
        props.changeHandler(isIndeterminate);
      }
    }
  }

  function updateWebcomponent() {
    if (props.webcomponent) {
      // True -> Prevents rerender
      props.webcomponent.setProps({ rangeValue : percentRange }),
      props.webcomponent.setProps({ error : isError }),
      props.webcomponent.setProps({ indeterminate : isIndeterminate });
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

export default Progressbar;
