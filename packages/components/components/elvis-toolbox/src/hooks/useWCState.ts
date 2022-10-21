import { useEffect, useState } from 'react';

/**
 * Create a state that is synced with the webcomponent attribute state, and that triggers events (both in React and webcomponent) on changes.
 * @param value Initial state of prop. Will also be listened to for changes and update the returned value (without triggering events).
 * @param propName Name of the prop, used to trigger event on webcomponent.
 * @param webcomponent
 * @param reactOnChangeEvent
 * @returns Tuple similar to `React.useState` with a state and a setter.
 * @event `${propname}OnChange` event on webcomponent, calls `reactOnChangeEvent`.
 * @modifies `webcomponent.setAttribute(propName, value)` on change.
 */
export const useWCState = <
  TValue,
  TWrapper extends {
    setProps: (...args: unknown[]) => unknown;
    triggerEvent: (...args: unknown[]) => unknown;
  },
>(
  value: TValue,
  propName: string,
  webcomponent: TWrapper | undefined,
  reactOnChangeEvent: ((newValue: TValue) => void) | undefined,
): [TValue, (newValue: TValue) => void] => {
  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  const updateValue = (newValue: TValue) => {
    setValueState(newValue);

    if (!webcomponent) {
      reactOnChangeEvent?.(newValue);
    } else if (webcomponent) {
      webcomponent.setProps({ [propName]: newValue }, true);
      webcomponent.triggerEvent(`${propName}OnChange`, newValue);
    }
  };

  return [valueState, updateValue];
};
