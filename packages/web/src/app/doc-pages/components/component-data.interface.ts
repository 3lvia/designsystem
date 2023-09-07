import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

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
}

export type PrimitiveType = string | number | boolean | number[] | string[] | JSX.Element;
export type EventType = (...args: any) => any;
type ChildlessType = PrimitiveType | EventType;

/**
 * Represents props that are "primitive", which means that they have no child props.
 */
export interface PrimitiveProp extends PropBase {
  type: 'string' | 'number' | 'boolean' | 'number[]' | 'string[]' | (string & {});
  description: string;
  default?: string | number | boolean;
}

/**
 * Represents props that are nested.
 */
export interface NestedProp<TObjectProp> extends PropBase {
  type: 'object' | 'object[]';
  description?: string;
  children: {
    [TProp in keyof TObjectProp]: TObjectProp[TProp] extends ChildlessType
      ? PrimitiveProp
      : NestedProp<TObjectProp[TProp]>;
  };
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

type ReactPropsWithoutElvisBaseProps = Omit<ComponentPropsWithoutRef<'div'>, keyof BaseProps>;
type FilteredComponentProps<TComponentProps> = Omit<
  TComponentProps,
  keyof ReactPropsWithoutElvisBaseProps | 'webcomponent'
>;

export type ComponentProps<TComponentProps> = {
  [PropName in keyof FilteredComponentProps<Required<TComponentProps>>]: NonNullable<
    TComponentProps[PropName]
  > extends ChildlessType
    ? PrimitiveProp
    : NestedProp<TComponentProps[PropName]>;
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
