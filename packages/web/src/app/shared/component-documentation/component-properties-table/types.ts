export interface ComponentProp {
  /** The indentation level of the prop.
   * @example
   * Root prop:
   * "level = 0"
   */
  level: number;
  attribute: string;
  type: string;
  description?: string;
  default?: string | number | boolean;
  isEvent?: boolean;
  isRequired?: boolean;
  example?: string;
}
