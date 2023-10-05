import { ChildlessProp, NestedProp } from 'src/app/doc-pages/components/component-data.interface';

export interface LeafProp extends ChildlessProp {
  isLeaf?: true;
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
  isLeaf?: false;
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
