export interface ComponentProp {
  attribute: string;
  default?: string | number | boolean;
  description?: string;
  isArgument?: boolean;
  isEvent?: boolean;
  isRequired?: boolean;
  /** The indentation level of the prop.
   * @example
   * Root prop:
   * "level = 0"
   */
  level: number;
  type: string;
  example?: string;
}
