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
export interface AttributeTypeCEG {
  /**
   * Selects the default option from the `cegOptions` array.
   *
   * Can either be the index of the default value, or the default value itself.
   *
   * For `cegFormType = 'checkbox' | 'toggle'` it should be a boolean indicating whether it is selected by default.
   */
  cegDefault?: number | string | boolean;
  /**
   * The type of the values sent in with the attribute.
   */
  cegType?: 'string' | 'boolean' | 'number';
  /**
   * How the prop is displayed in the CEG.
   *
   * `'type'` and `'background'` are shown as dropdowns on top of the CEG.
   *
   * `'radio'` shows a radio button that is often used to show different states.
   *
   * `'checkbox'` is often used for additional props that can be turned on and off simultaneously.
   *
   * `'toggle'` should be used when the prop turns something visible on or off (e.g. heading).
   *
   * `'counter'` should be used to show a counter that can be adjusted.
   * Also requires `'cegCounterMax'`, `'cegCounterMin'`, `'cegStepValue'`, and `'cegCounterType'`.
   * See the component Progressbar for an example.
   *
   * `'custom-text'` will show the prop as an input field inside the 'Customize text'-popover.
   *
   * `'iconName'` is only used for the icon documentation.
   */
  cegFormType?:
    | 'type'
    | 'background'
    | 'radio'
    | 'checkbox'
    | 'toggle'
    | 'counter'
    | 'custom-text'
    | 'iconName';
  /**
   * Decides what kind of text input to use for the property inside 'Customize text'-popover. Only applies to `cegFormType = 'custom-text'`.
   */
  cegCustomTextType?: 'input' | 'textarea';
  /**
   * Options for the prop in the dropdown and the value sent in as the attribute in the code.
   *
   * Used for `cegFormType =  'background' | 'radio' | 'type'`.
   */
  cegOptions?: string[];
  /**
   * Custom labels that can be displayed instead of the `cegOptions` values.
   */
  cegOptionsLabel?: string[];

  /**
   * The value that will be sent in with the prop. If a slot is sent in for web component, instead use the option `cegSlot`.
   *
   * Used for `cegFormType = 'checkbox' | 'toggle'`.
   */
  cegOption?: string;
  /**
   * Replaces `cegOption` if it is a slot and not a normal prop in the custom element.
   *
   * Used for `cegFormType = 'checkbox' | 'toggle'`.
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
   * The typography of the labels for the prop in the CEG. Only applies to `cegFormType='radio'`.
   */
  cegLabelTypography?: 'capitalize' | 'uppercase' | 'lowercase';
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
   * Used for `cegFormType = 'counter'`.
   */
  cegCounterMax?: number;
  /**
   * Set the min value of the counter.
   *
   * Used for `cegFormType = 'counter'`.
   */
  cegCounterMin?: number;
  /**
   * Set the increment of the counter for each step.
   *
   * Used for `cegFormType = 'counter'`.
   */
  cegStepValue?: number;
  /**
   * Added to the back of the value of the counter (e.g. '%' to make the counter in percentages).
   *
   * Used for `cegFormType = 'counter'`.
   */
  cegCounterType?: string;
}

export interface AttributeType extends AttributeTypeCommon, AttributeTypeCEG {}

/**
 * These types are essental for the CEG to function.
 * Three examples of the component should exist, one for each framework.
 *
 * The codeNativeHTML and codeNativeScript are used to display the component in the CEG.
 *
 * It is also possible to use separate codes for each type of the component. See Card or Modal for examples.
 */
export interface ComponentDataCode {
  /**
   * The code required to show the component in React.
   */
  codeReact: string;
  /**
   * The code required to show the component in Angular.
   */
  codeAngular: string;
  /**
   * The code required to show the component in Vue.
   */
  codeVue: string;
  /**
   * The HTML code required to show the component in native HTML. This is the code that is actually used to display the component in the CEG.
   */
  codeNativeHTML: string;
  /**
   * The script code required to show the component in native HTML. This is the code that is actually used to display the component in the CEG.
   */
  codeNativeScript: string;
}
/**
 * Definition for an object/a single update in the changelog
 */
export interface ComponentChangelog {
  date: string;
  version: string;
  changelog: ComponentChangelogChange[];
}

/**
 * Each segment in the changelog for a specific update.
 */
export interface ComponentChangelogChange {
  type: 'breaking_changes' | 'new_feature' | 'bug_fix' | 'patch' | (string & {});
  changes: string[];
  fixes?: string[];
  pages?: { displayName: string; url: string }[];
  components?: { displayName: string; url: string }[];
}
/**
 * Interface for component data for documentation pages.
 */
export default interface ComponentData extends Partial<ComponentDataCode> {
  /**
   * Component name.
   * @example 'SegmentedControl'
   */
  name: `${string}`;
  /**
   * All the component's attributes should be in this object.
   * Some attributes will need more information depending on whether they should be displayed in the CEG or not,
   * however 3 attributes are required for all components: `'isRequired'`, `'type'` and `'description'`.
   */
  attributes: {
    [attribute: string]: AttributeType;
  };

  /**
   * Changes for component
   */
  changelog?: Array<ComponentChangelog>;
  does?: string[];
  donts?: string[];
}
