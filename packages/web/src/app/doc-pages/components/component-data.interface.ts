import { BaseProps } from '@elvia/elvis-toolbox';

type PrimitiveType = string | string[] | number | number[] | boolean | JSX.Element | Date | null;
type EventType = (...args: any) => any;
type ChildlessType = PrimitiveType | EventType;
type BaseType<T> = T extends (infer U)[] ? U : T;

interface PropBase {
  // Indicates whether a prop is required for the component.
  isRequired?: boolean;

  /**
   * The accepted type(s) of the prop, as a string in typescript format.
   *
   * @example
   * 'string'
   * 'number | boolean'
   * '"left" | "center" | "right"'
   */
  type: string;
  default?: string | number | boolean;
  /** An example of how the prop can be used. Typed as a string, but should be a valid ts code example.
   * @example
   * "myObject = {key: 'value'}"
   */
  example?: string;
}

/**
 * Represents props that are "primitive", which means that they have no child props.
 */
export interface ChildlessProp extends PropBase {
  isEvent?: boolean;
  type: 'string' | 'number' | 'boolean' | 'number[]' | 'string[]' | 'Date' | (string & {});
  description: string;
}

/**
 * Represents props that are nested.
 */
export interface NestedProp<TObjectProp> extends PropBase {
  type: 'object' | 'object[]' | (string & {});
  description?: string;
  children: Required<{
    [TProp in keyof BaseType<TObjectProp>]: NonNullable<BaseType<TObjectProp>[TProp]> extends ChildlessType
      ? ChildlessProp
      : NestedProp<NonNullable<BaseType<TObjectProp>[TProp]>>;
  }>;
}

/**
 * Definition for an object/a single update in the changelog
 */
export interface ComponentChangelog {
  date: string;
  version: string;
  changelog: ComponentChangelogChange[];
  private?: boolean;
}

/**
 * Each segment in the changelog for a specific update.
 */
interface ComponentChangelogChange {
  type: 'breaking_changes' | 'new_feature' | 'bug_fix' | 'patch' | (string & {});
  changes: string[];
  fixes?: string[];
  pages?: { displayName: string; url: string }[];
  components?: { displayName: string; url: string }[];
}

type ComponentProps<TComponentProps> = {
  [PropName in keyof Omit<TComponentProps, keyof BaseProps>]: NonNullable<
    TComponentProps[PropName]
  > extends infer U
    ? U extends ChildlessType
      ? ChildlessProp
      : NestedProp<U>
    : never;
};

/**
 * Interface for component data for documentation pages.
 */
export default interface ComponentData<TComponentProps = Record<string, any>> {
  /**
   * Component name.
   * @example 'SegmentedControl'
   */
  name: `${string}`;
  /**
   * All the component's attributes should be in this object.
   */
  attributes: ComponentProps<Required<TComponentProps>>;

  /**
   * Changes for component
   */
  changelog?: Array<ComponentChangelog>;
  does?: string[];
  donts?: string[];
}
