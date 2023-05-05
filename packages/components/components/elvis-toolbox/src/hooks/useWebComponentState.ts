import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

/**
 * Create a state that is synced with the webcomponent attribute state, and that triggers events (both in React and webcomponent) on changes.
 * @param value Initial state of prop. Will also be listened to for changes and update the returned value (without triggering events).
 * @param propName Name of the prop, used to trigger event on webcomponent.
 * @param webcomponent
 * @param reactOnChangeEvent
 * @returns Tuple similar to `React.useState` with a state and a setter.
 * @event `${propname}OnChange` event on webcomponent, calls `reactOnChangeEvent`.
 * @modifies `webcomponent.setAttribute(propName, value)` on change.
 *
 * @example
 * export const Component: FC<Props> = ({value, valueOnChange, webcomponent}) => {
 *   const [valueState, setValueState] = useWebComponentState(value, 'value', webcomponent, valueOnChange);
 *   ...
 *   // Will trigger a `valueOnChange` event on webcomponent and call `reactOnChangeEvent`.
 *   return (<div onClick={() => setValueState('new value')}>{value}</div>)
 * }
 *
 * @since 5.2.0
 */
export const useWebComponentState = <T>(
  value: T,
  propName: string,
  webcomponent: ElvisComponentWrapper | undefined,
  reactOnChangeEvent: ((newValue: T) => void) | undefined,
): [T, Dispatch<SetStateAction<T>>] => {
  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  const triggerEvent = (eventData: T) => {
    if (!webcomponent) {
      reactOnChangeEvent?.(eventData);
    } else if (webcomponent) {
      webcomponent.setProps({ [propName]: eventData }, true);
      webcomponent.triggerEvent(`${propName}OnChange`, eventData);
    }
  };

  const updateValue = (newValue: SetStateAction<T>) => {
    if (typeof newValue === 'function') {
      setValueState((oldValue) => {
        const newVal = (newValue as (oldValue: T) => T)(oldValue);
        triggerEvent(newVal);
        return newVal;
      });
    } else {
      setValueState(newValue);
      triggerEvent(newValue);
    }
  };

  return [valueState, updateValue];
};
