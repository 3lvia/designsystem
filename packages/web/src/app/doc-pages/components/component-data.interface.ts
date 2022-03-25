/**
 * These types are common for all attributes.
 */
export interface AttributeTypeCommon {
  /**
   * Indicates whether a prop is required for the component.
   * An asterisk will be shown in the properties table if set to true.
   */
  isRequired: boolean;
  /**
   * The accepted type(s) of the prop, as a string in typescript format. Will be shown in the properties table.
   *
   * @example
   * 'string'
   * 'number | boolean'
   * '"left" | "center" | "right"'
   */
  type: string;
  /**
   * Description of the prop. Will be shown in the properties table.
   */
  description: string;
  /**
   * Default value of the prop, if any. Will be shown in the properties table.
   */
  default?: string | number | boolean;
}

/**
 * These types are specific for the attributes that are shown in the CEG.
 */
export type AttributeTypeCEG = {
  /**
   * Selects the default option from the cegOptions array.
   *
   * Can either be the index of the default value, or the default value itself.
   *
   * For cegFormType = 'checkbox' | 'toggle' it should be a boolean indicating whether it is selected by default.
   */
  cegDefault?: number | string | boolean;
  /**
   * The type of the values sent in with the attribute.
   */
  cegType?: 'string' | 'boolean' | 'number';
  /**
   * How the prop is displayed in the CEG.
   *
   * 'type' and 'background' are shown as dropdowns on top of the CEG.
   *
   * 'checkbox' is often used for additional props that can be turned on and off simultaneously.
   *
   * 'radio' shows a radio button that is often used to show different states.
   *
   * 'toggle' should be used when the prop turns something visible on or off (e.g. heading).
   *
   * 'counter' should be used to show a counter that can be adjusted.
   * Also requires 'cegCounterMax', 'cegCounterMin', 'cegStepValue', and 'cegCounterType'.
   * See the component Progressbar for an example.
   *
   * 'iconName' is only used for the icon documentation.
   */
  cegFormType?: 'type' | 'background' | 'radio' | 'checkbox' | 'toggle' | 'counter' | 'iconName';
  /**
   * Options for the prop in the dropdown and the value sent in as the attribute in the code.
   *
   * Used for cegFormType =  'background' | 'radio' | 'type'.
   */
  cegOptions?: string[];

  /**
   * The value that will be sent in with the prop. If a slot is sent in for web component, instead use the option cegSlot.
   *
   * Used for cegFormType = 'checkbox' | 'toggle'.
   */
  cegOption?: string;
  /**
   * Replaces 'cegOption' if it is a slot and not a normal prop in the custom element.
   *
   * Used for cegFormType = 'checkbox' | 'toggle'.
   */
  cegSlot?: string;

  /**
   * Name or label for the prop to be displayed in the CEG. Can be different from the prop name to better explain
   * what the prop does.
   */
  cegDisplayName?: string;
  /**
   * Used to group toggles and checkboxes together in groups. The group will be given a name of this prop.
   */
  cegDisplayGroup?: string;
  /**
   * Used to filter when a prop is available in the CEG.
   * Add the name of the prop it is dependent on and what value (or values) the prop should have for it to work.
   */
  cegDependency?: {
    name: string;
    value: string | string[];
  }[];
  /**
   * Set the max value of the counter.
   *
   * Used for cegFormType = 'counter'.
   */
  cegCounterMax?: number;
  /**
   * Set the min value of the counter.
   *
   * Used for cegFormType = 'counter'.
   */
  cegCounterMin?: number;
  /**
   * Set the increment of the counter for each step.
   *
   * Used for cegFormType = 'counter'.
   */
  cegStepValue?: number;
  /**
   * Added to the back of the value of the counter (e.g. '%' to make the counter in percentages).
   *
   * Used for cegFormType = 'counter'.
   */
  cegCounterType?: string;
};

export type AttributeType = AttributeTypeCommon & AttributeTypeCEG;

/**
 * Interface for component data for documentation pages.
 */
export default interface ComponentData {
  /**
   * Component name (package name). Prefixed with 'elvis'.
   * @example 'elvis-component'
   */
  name: string;
  /**
   * Component name for the DOM (Custom element). Prefixed with 'elvia'.
   * @example 'elvia-component'
   */
  elementNameW: string;
  /**
   * Component name for the DOM (React).
   * @example 'Component'
   */
  elementNameR: string;
  /**
   * All the component's attributes should be in this object.
   * Some attributes will need more information depending on whether they should be displayed in the CEG or not,
   * however 3 attributes are required for all components: 'isRequired', 'type' and 'description'.
   */
  attributes: {
    [attribute: string]: AttributeType;
  };

  /**
   * Command to install the component from npm.
   */
  package: string;
  /**
   * Code to import component in React.
   * @example
   * "import { Component } from '@elvia/elvis-component/react';"
   */
  codeImportReact: string;
  /**
   * Code to import component as Web Component.
   * @example
   * "import '@elvia/elvis-component';"
   */
  codeImportWebComponent: string;

  codeReact?: string;
  codeAngular?: string;
  codeVue?: string;
  codeNativeHTML?: string;
  codeNativeScript?: string;

  does?: string[];
  donts?: string[];
}
