import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface AttributeType {
  /**
   * Indicates whether a prop is required for the component.
   * An asterisk will be shown in the properties table if set to true.
   */
  isRequired?: boolean;
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
export type ComponentProps<TComponentProps> = Record<
  keyof Omit<TComponentProps, keyof ReactPropsWithoutElvisBaseProps | 'webcomponent'>,
  AttributeType
>;

/**
 * Interface for component data for documentation pages.
 */
export default interface ComponentData<TComponentProps extends Record<string, any> = Record<string, any>> {
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
