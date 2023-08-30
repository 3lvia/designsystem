import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

interface AttributeBase {
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

  // Description of the prop.
  description: string;

  // Default value of the prop, if any.
  default?: string | number | boolean;
}

/**
 * Represents props that are of object type. These props have child props
 * that needs to be described as well.
 */
interface ObjectProp<TObjectProp> extends AttributeBase {
  type: 'object' | 'array<object>';
  children: {
    [TProp in keyof TObjectProp]: TObjectProp[TProp] extends PrimitiveType
      ? PrimitiveProp
      : ObjectProp<TObjectProp[TProp]>;
  };
}

type PrimitiveType = string | number | boolean | number[] | string[] | ((...args: any) => any);

/**
 * Represents props that are "primitive", which means that they have no child props.
 */
interface PrimitiveProp extends AttributeBase {
  type: 'string' | 'number' | 'boolean' | 'array<number>' | 'array<string>' | (string & {});
}

export type PropType = PrimitiveProp;

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

type ReactPropsWithoutElvisBaseProps = Omit<ComponentPropsWithoutRef<'div'>, keyof BaseProps>;
type FilteredComponentProps<TComponentProps> = Omit<
  TComponentProps,
  keyof ReactPropsWithoutElvisBaseProps | 'webcomponent'
>;

export type ComponentProps<TComponentProps> = {
  [PropName in keyof FilteredComponentProps<Required<TComponentProps>>]: NonNullable<
    TComponentProps[PropName]
  > extends infer T // This infer is a "hack" to allow us to check if props with union types extends _some_ of our primitive types
    ? T extends PrimitiveType
      ? PrimitiveProp
      : ObjectProp<TComponentProps[PropName]>
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
  attributes: ComponentProps<TComponentProps>;

  /**
   * Changes for component
   */
  changelog?: Array<ComponentChangelog>;
  does?: string[];
  donts?: string[];
}
