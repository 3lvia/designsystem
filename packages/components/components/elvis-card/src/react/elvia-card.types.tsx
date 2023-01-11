export type CardType = 'simple' | 'detail';
export type BorderColor = 'green' | 'blue-berry' | 'blueBerry' | 'blue' | 'red' | 'orange';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type BorderColors = {
  [key in BorderColor]: string;
};

export interface CardAreaProps {
  type: CardType;
  hasBorder: boolean;
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

export interface CardColoredLineContainerProps {
  hasBorder?: boolean;
}

export interface CardColoredLineProps {
  borderColor?: BorderColor;
}

export interface CardCornerIconProps {
  hasBorder?: boolean;
}
