import React, { FC } from 'react';
import styled from 'styled-components';
import ElviaTypography from '@elvia/elvis-typography';

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
  elviaBlack: '#000',
  elviaWhite: '#fff',
  elviaCharge: '#29d305',
  green: '#29d305',
  elviaBlue: '#006DDB',
  red: '#EE0701',
  'blue-berry': '',
  orange: '',
};

const typography = {
  textMd: ElviaTypography['text-md'],
  textMdStrong: ElviaTypography['text-md-strong'],
  textSm: ElviaTypography['text-sm'],
  textSmStrong: ElviaTypography['text-sm-strong'],
  textMicro: ElviaTypography['text-micro'],
};

type CardAreaProps = {
  cardShape: CardShape;
  cardType: CardType;
};

const CardArea = styled.div<CardAreaProps>`
  position: relative;
  display: flex;
  padding: 24px 16px;
  box-sizing: border-box;

  width: 152px;
  height: 128px;

  ${typography.textMd}
  color: blue;
  text-align: center;
  border: ${(props: { cardShape: CardShape }) => (props.cardShape === 'square' ? '1px solid #e9e9e9' : '')};
  border-radius: ${(props: { cardShape: CardShape }) => (props.cardShape === 'square' ? '8px' : '50%')};
  :hover {
    border: 2px solid #29d305;
  }
`;

const CardLabel = styled.div`
  text-align: center;
  color: red;
`;

const CardDescription = styled.div`
  color: green;
`;

const CardContent = styled.div`
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
  return (
    <CardArea cardType={cardType} cardShape={cardShape}>
      {content && <CardContent>{content}</CardContent>}
      {label && <CardLabel>{label}</CardLabel>}
      {description && <CardDescription>{description}</CardDescription>}
      <CardColoredLine borderColor={borderColor}></CardColoredLine>
    </CardArea>
  );
};

export default Card;
