export type CardType = 'simple' | 'detail';
export type BorderColor = 'green' | 'blue-berry' | 'blueBerry' | 'red' | 'orange';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type BorderColors = {
  [key in BorderColor]: string;
};
