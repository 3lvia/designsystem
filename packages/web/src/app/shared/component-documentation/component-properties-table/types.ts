import { ChildlessProp, NestedProp } from 'src/app/doc-pages/components/component-data.interface';

export interface LeafProp extends ChildlessProp {
  attribute: string;
  /** The indentation level of the prop.
   * @example
   * Root prop:
   * "level = 0"
   */
  level: number;
  childProps?: ComponentProp[];
}

export interface NestedInputProp extends NestedProp<Record<string, any>> {
  attribute: string;
  /** The indentation level of the prop.
   * @example
   * Root prop:
   * "level = 0"
   */
  level: number;
  childProps?: ComponentProp[];
}

export type ComponentProp = LeafProp | NestedInputProp;
