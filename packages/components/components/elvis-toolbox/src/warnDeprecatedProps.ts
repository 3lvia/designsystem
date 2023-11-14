import { ComponentConfig, ComponentAttribute, DeprecatedDetails } from './componentConfig.types';
import { isSsr } from './isSsr';

interface PropInfo {
  propName: string;
  componentName: string;
  deprecatedDetails: DeprecatedDetails | undefined;
}

const consoleWarnDeprecatedProp = (propInfo: PropInfo, isSlot: boolean) => {
  const { propName, componentName, deprecatedDetails } = propInfo;
  if (deprecatedDetails === undefined) {
    return;
  }
  const propOrCallbackOrSlot = deprecatedDetails.isCallbackFunction
    ? 'callback function'
    : isSlot
      ? 'slot'
      : 'prop';
  const versionString = deprecatedDetails.version ? ` from version ${deprecatedDetails.version}` : '';
  const newPropString = deprecatedDetails.newProp
    ? `\nSee prop '${deprecatedDetails.newProp}' for replacement.`
    : '';
  const directReplacementString = deprecatedDetails.isDirectReplacement
    ? `\nThis prop can be directly replaced by the new prop name.`
    : '';
  const explanationString = deprecatedDetails.explanation ? `\n${deprecatedDetails.explanation}` : '';
  console.warn(
    `Deprecation warning in ${componentName}:\nThe ${propOrCallbackOrSlot} '${propName}' is deprecated${versionString}.${newPropString}${directReplacementString}${explanationString}`,
  );
};

const isDeprecatedProp = (propName: string, deprecatedProps: ComponentAttribute[]) => {
  return deprecatedProps.some((attr) => attr.name === propName);
};

const getPropInfo = (propName: string, deprecatedProps: ComponentAttribute[], config: ComponentConfig) => {
  const propIndex = deprecatedProps.map((object) => object.name).indexOf(propName);
  const componentName = 'elvia' + config.name.replace(/([A-Z])/g, '-$1').toLowerCase();
  const deprecatedDetails = deprecatedProps[propIndex].deprecatedDetails;
  return { propName, componentName, deprecatedDetails };
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
  const deprecatedProps = config.attributes.filter((attr) => attr.deprecatedDetails);
  // List of deprecated callbacks that have already been console warned. Used to avoid duplicated warnings.
  const warnedCallbacks: string[] = [];

  for (const propName in props) {
    // Check for deprecated props
    if (isDeprecatedProp(propName, deprecatedProps)) {
      consoleWarnDeprecatedProp(getPropInfo(propName, deprecatedProps, config), false);
    }

    const webcomponent = props['webcomponent'];
    if (webcomponent) {
      // Check for deprecated slots on webcomponent.
      if ('_slots' in webcomponent) {
        for (const slotName in webcomponent['_slots']) {
          if (isDeprecatedProp(slotName, deprecatedProps)) {
            consoleWarnDeprecatedProp(getPropInfo(slotName, deprecatedProps, config), true);
          }
        }
      }
      // Check for deprecated callback function on webcomponent Angular.
      for (const webcomponentAttribute in webcomponent) {
        if (/^__zone_symbol__.*false/.test(webcomponentAttribute)) {
          const callbackName: string | undefined = webcomponent[webcomponentAttribute]?.[0]?.['eventName'];
          if (
            callbackName &&
            isDeprecatedProp(callbackName, deprecatedProps) &&
            !warnedCallbacks.includes(callbackName)
          ) {
            consoleWarnDeprecatedProp(getPropInfo(callbackName, deprecatedProps, config), false);
            warnedCallbacks.push(callbackName);
          }
        }
      }
      // Check for deprecated callback function on webcomponent Vue.
      if ('_vei' in webcomponent) {
        for (const callback in webcomponent['_vei']) {
          // Get callback name (e.g. onOnHide -> onHide).
          const callbackName = callback.charAt(2).toLowerCase() + callback.substring(3);
          if (isDeprecatedProp(callbackName, deprecatedProps) && !warnedCallbacks.includes(callbackName)) {
            consoleWarnDeprecatedProp(getPropInfo(callbackName, deprecatedProps, config), false);
            warnedCallbacks.push(callbackName);
          }
        }
      }
    }
  }
};
