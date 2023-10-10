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

export interface BaseCardProps extends BaseProps {
  icon?: string | JSX.Element;
  iconHover?: string | JSX.Element;
  heading?: string;
  headingLevel?: HeadingLevel;
  description?: string;
  borderColor?: BorderColor;
  type?: CardType;
  width?: string;
  height?: string;
  minWidth?: number;
  maxWidth?: number;
  maxDescriptionLines?: number;
  maxHeadingLines?: number;
  tag?: string;
  cornerIcon?: string | JSX.Element;
}

export interface CardProps extends BaseCardProps, ComponentPropsWithoutRef<'article'> {}
