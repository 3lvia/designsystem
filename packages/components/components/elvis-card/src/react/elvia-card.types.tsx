import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export type CardType = 'simple' | 'detail';
export type BorderColor = 'none' | 'green' | 'blue-berry' | 'blueBerry' | 'blue' | 'red' | 'orange';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type BorderColors = {
  [key in BorderColor]: string;
};

export interface CardAreaProps {
  type: CardType;
  width: string;
  height?: string;
  minWidth?: number;
  maxWidth?: number;
}

export interface CardContentProps {
  type: CardType;
}

export interface CardHeadingProps {
  type: CardType;
  maxHeadingLines?: number;
}

export interface CardDescriptionProps {
  type: CardType;
  maxDescriptionLines: number;
}

export interface CardColoredLineProps {
  borderColor?: BorderColor;
}

export interface CardProps extends ComponentPropsWithoutRef<'article'>, BaseProps {
  icon?: string | JSX.Element;
  iconHover?: string | JSX.Element;
  /**
   * @deprecated Deprecated in version 2.0.0. Use `heading` instead.
   */
  header?: never;
  heading?: string;
  headingLevel?: HeadingLevel;
  description?: string;
  borderColor?: BorderColor;
  type?: CardType;
  /**
   * @deprecated Deprecated in version 2.0.0. Card no longer supports circle type.
   */
  shape?: never;
  /**
   * @deprecated Deprecated in version 3.2.0. Card now has the same border on all backgrounds. No replacement needed.
   */
  hasBorder?: boolean;
  width?: string;
  height?: string;
  minWidth?: number;
  maxWidth?: number;
  maxDescriptionLines?: number;
  maxHeadingLines?: number;
  /**
   * @deprecated Deprecated in version 2.0.0. Instead use `tag`.
   */
  label?: never;
  tag?: string;
  cornerIcon?: string | JSX.Element;
}
