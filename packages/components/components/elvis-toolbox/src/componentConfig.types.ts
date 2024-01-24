export interface ComponentConfig {
  /**
   * Name of component.
   */
  name: string;
  /**
   * All attributes of the component.
   */
  attributes: ComponentAttribute[];
}

export interface ComponentAttribute {
  /**
   * Name of attribute.
   */
  name: string;
  /**
   * Type of attribute.
   */
  type: 'string' | 'number' | 'boolean' | 'object' | 'Date' | 'function' | 'event';
  /**
   * Supply deprecated details if the attribute has been deprecated.
   */
  deprecatedDetails?: DeprecatedDetails;
}

export interface DeprecatedDetails {
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
}
