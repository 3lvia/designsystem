import React, { FC, useState } from 'react';
import styled from 'styled-components';
import ElviaTypography from '@elvia/elvis-typography';
import { getColor } from '@elvia/elvis-colors';

type CardType = 'simple' | 'detail';
type CardShape = 'square' | 'circle';
type BorderColor = 'green' | 'blue-berry' | 'red' | 'orange';

export interface CardProps {
  label?: string;
  description?: string;
  content: string | HTMLElement;
  borderColor?: BorderColor;
  cardType: CardType;
  cardShape: CardShape;
  webcomponent: any;
}

// TODO: Update to use elvis-colors
const colors = {
  elviaBlack: getColor('black'),
  elviaWhite: getColor('white'),
  elviaCharge: getColor('elvia-charge'),
  green: getColor('green'),
  red: getColor('red'),
  'blue-berry': getColor('blue-berry'),
  orange: getColor('orange'),
};

const typography = {
  textMd: ElviaTypography['text-md'],
  textMdStrong: ElviaTypography['text-md-strong'],
  textSm: ElviaTypography['text-sm'],
  textSmStrong: ElviaTypography['text-sm-strong'],
  textMicro: ElviaTypography['text-micro'],
};

const decideCardSize = (cardType: CardType, cardShape: CardShape) => {
  if (cardType === 'simple' && cardShape === 'square') {
    return `
      width: 152px;
      height: 128px;`;
  } else if (cardType === 'simple' && cardShape === 'circle') {
    return `
      width: 158px;
      height: 158px;`;
  } else {
    return `
      width: 299px;
      height: 144px;`;
  }
};

type CardAreaProps = {
  cardShape: CardShape;
  cardType: CardType;
};

const CardArea = styled.div<CardAreaProps>`
  position: relative;
  display: inline-block;

  padding: 24px 16px;
  box-sizing: border-box;

  ${(props: { cardType: CardType; cardShape: CardShape }) => decideCardSize(props.cardType, props.cardShape)}

  color: blue;
  border: ${(props: { cardShape: CardShape }) => (props.cardShape === 'square' ? '1px solid #e9e9e9' : '')};
  border-radius: ${(props: { cardShape: CardShape }) => (props.cardShape === 'square' ? '8px' : '50%')};

  &:hover {
    border: 2px solid ${colors.elviaCharge};
  }
`;

type CardLabelProps = {
  cardShape: CardShape;
};

const CardLabel = styled.div<CardLabelProps>`
  ${(props: { cardShape: CardShape }) =>
    props.cardShape === 'square' ? typography.textSmStrong : typography.textMdStrong};
  text-align: center;
  color: red;
`;

type CardDescriptionProps = {
  cardShape: CardShape;
};

const CardDescription = styled.div<CardDescriptionProps>`
  ${(props: { cardShape: CardShape }) =>
    props.cardShape === 'square' ? typography.textMicro : typography.textSm};
  text-align: center;
  color: green;
`;

const CardContent = styled.div`
  test-align: center;
  color: yellow;
`;

type CardColoredLineProps = {
  borderColor?: BorderColor;
};

const CardColoredLine = styled.div<CardColoredLineProps>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 4px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: ${(props: { borderColor?: BorderColor }) =>
    props.borderColor ? colors[props.borderColor] : ''};
`;

const Card: FC<CardProps> = ({
  label,
  description,
  content,
  borderColor,
  cardType = 'simple',
  cardShape = 'square',
}) => {
  const [hover, setHover] = useState(false);

  return (
    <CardArea
      cardType={cardType}
      cardShape={cardShape}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {content && <CardContent>{content}</CardContent>}
      {label && <CardLabel cardShape={cardShape}>{label}</CardLabel>}
      {description && <CardDescription cardShape={cardShape}>{description}</CardDescription>}
      {!hover && cardShape === 'square' && <CardColoredLine borderColor={borderColor}></CardColoredLine>}
    </CardArea>
  );
};

export default Card;
