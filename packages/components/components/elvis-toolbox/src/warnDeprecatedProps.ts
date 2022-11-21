import { isSsr } from './isSsr';

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
 * export const Component: React.FC<Props> = function ({
 *  prop1,
 *  prop2,
 *  prop3,
 * }) {
 *  warnDeprecatedProps(config, arguments[0]);
 *  ...
 * }
 *
 * @since 1.3.0
 */
export const warnDeprecatedProps = (config: ComponentConfig, props: { [propName: string]: any }): void => {
  // If not on localhost, don't console log deprecation warnings.
  if (isSsr() || window.location.href.indexOf('localhost') === -1) {
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
          const callbackName: string | undefined = webcomponent[webcomponentAttribute]?.[0]?.['eventName'];
          if (callbackName && callbackName in deprecatedProps && !warnedCallbacks.includes(callbackName)) {
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
