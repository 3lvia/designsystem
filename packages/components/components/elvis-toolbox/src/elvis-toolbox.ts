import { throttle } from 'lodash';

const customThrottle = (func: () => void, limit: number, options?: { trailing: boolean }): any => {
  return throttle(func, limit, options);
};

const outlineListener = (element: HTMLElement | null, destroy?: boolean): void => {
  if (!element) {
    return;
  }

  const addOutline = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && element.classList.contains('ewc-no-outline')) {
      element.classList.remove('ewc-no-outline');
      // Add mousedown event-listener to remove outline again
      element.addEventListener('mousedown', removeOutline, false);
    }
  };

  const removeOutline = () => {
    if (!element.classList.contains('ewc-no-outline')) {
      element.classList.add('ewc-no-outline');
      // Remove mousedown event-listener until next tab happens
      element.removeEventListener('mousedown', removeOutline, false);
    }
  };

  // If destroy is true -> Remove all listeners and return
  if (destroy) {
    element.removeEventListener('keydown', addOutline);
    element.removeEventListener('mousedown', removeOutline, false);
    return;
  }

  // Start listening for keyboard-events and mousedown on element to add or remove outline
  element.addEventListener('keydown', addOutline);
  element.addEventListener('mousedown', removeOutline, false);
};

export default { throttle: customThrottle, outlineListener: outlineListener };

const consoleWarnDeprecatedProp = (
  name: string,
  deprecatedProp: ComponentConfig['deprecatedProps'][0],
  componentName: string,
  isSlot: boolean,
) => {
  const propOrCallbackOrSlot = deprecatedProp.isCallbackFunction
    ? 'callback function'
    : isSlot
    ? 'slot'
    : 'prop';
  const versionString = deprecatedProp.version ? ` from version ${deprecatedProp.version}` : '';
  const newPropString = deprecatedProp.newProp
    ? `\nSee prop '${deprecatedProp.newProp}' for replacement.`
    : '';
  const directReplacementString = deprecatedProp.isDirectReplacement
    ? `\nThis prop can be directly replaced by the new prop name.`
    : '';
  const explanationString = deprecatedProp.explanation ? `\n${deprecatedProp.explanation}` : '';
  console.warn(
    `Deprecation warning in ${componentName}:\nThe ${propOrCallbackOrSlot} '${name}' is deprecated${versionString}.${newPropString}${directReplacementString}${explanationString}`,
  );
};

/**
 * Compares all the props (and slots) passed to a component to a configuration
 * file containing an overview of deprecated props. Will also check callback functions for React, Angular, and Vue.
 *
 * Each deprecated prop/slot will be `console.warn()`-ed.
 *
 * To get a list of all props passed to a function, use `arguments[0]` inside a function.
 * `arguments[0]` does not work in arrow functions!
 *
 * @param config Component configuration indicating what props are deprecated.
 * @param props Object containing all props passed to the component.
 *
 *
 * @example
 * export const Component: FC<Props> = function ({
 *  prop1,
 *  prop2,
 *  prop3,
 * }) {
 *  // eslint-disable-next-line prefer-rest-params
 *  warnDeprecatedProps(config, arguments[0]);
 *  ...
 * }
 *
 * @since 1.3.0
 */
export const warnDeprecatedProps = (config: ComponentConfig, props: { [propName: string]: any }): void => {
  // If not on localhost, don't console log deprecation warnings.
  if (window.location.href.indexOf('localhost') === -1) {
    return;
  }
  /** List of deprecated callbacks that have already been console warned. Used to avoid duplicated warnings. */
  const warnedCallbacks: string[] = [];
  const deprecatedProps = config.deprecatedProps;
  for (const prop in props) {
    // Check for deprecated props
    if (prop in deprecatedProps) {
      consoleWarnDeprecatedProp(prop, deprecatedProps[prop], config.componentName, false);
    }

    const webcomponent = props['webcomponent'];
    if (webcomponent) {
      // Check for deprecated slots on webcomponent.
      for (const slot in webcomponent['_slots']) {
        if (slot in deprecatedProps) {
          consoleWarnDeprecatedProp(slot, deprecatedProps[slot], config.componentName, true);
        }
      }
      // Check for deprecated callback function on webcomponent Angular.
      for (const webcomponentAttribute in webcomponent) {
        if (/^__zone_symbol__.*false/.test(webcomponentAttribute)) {
          const callbackName: string = webcomponent[webcomponentAttribute][0]['eventName'];
          if (callbackName in deprecatedProps && !warnedCallbacks.includes(callbackName)) {
            consoleWarnDeprecatedProp(
              callbackName,
              deprecatedProps[callbackName],
              config.componentName,
              false,
            );
            warnedCallbacks.push(callbackName);
          }
        }
      }
      // Check for deprecated callback function on webcomponent Vue.
      for (const callback in webcomponent['_vei']) {
        // Get callback name (e.g. onOnHide -> onHide).
        const callbackName = callback.charAt(2).toLowerCase() + callback.substring(3);
        if (callbackName in deprecatedProps && !warnedCallbacks.includes(callbackName)) {
          consoleWarnDeprecatedProp(callbackName, deprecatedProps[callbackName], config.componentName, false);
          warnedCallbacks.push(callbackName);
        }
      }
    }
  }
};

export interface ComponentConfig {
  /**
   * Name of component.
   */
  componentName: string;
  /**
   * All the deprecated props of a component.
   */
  deprecatedProps: {
    [propName: string]: {
      /**
       * The version number when the prop was deprecated.
       */
      version: string;
      /**
       * Name of replacement prop, if any exists.
       */
      newProp?: string;
      /**
       * Set to true to indicate that the new prop name is a direct replacement to the old prop.
       */
      isDirectReplacement?: boolean;
      /**
       * Set to true to indicate that the prop is a callback function. This will change the console warning.
       */
      isCallbackFunction?: boolean;
      /**
       * Explanation of why the prop has been deprecated.
       */
      explanation?: string;
    };
  };
}
