import React, { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ElviaTypography from '@elvia/elvis-typography';
import { getColor } from '@elvia/elvis-colors';

type CardType = 'simple' | 'detail';
type CardShape = 'square' | 'circle';
type BorderColor = 'green' | 'blue-berry' | 'red' | 'orange';

export interface CardProps {
  label?: string;
  description?: string;
  icon: string | HTMLElement;
  borderColor?: BorderColor;
  cardType: CardType;
  cardShape: CardShape;
  isInverted: boolean;
  webcomponent: any;
}

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
  titleLg: ElviaTypography['title-lg'],
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
  isInverted: boolean;
};

const CardArea = styled.div<CardAreaProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${colors.elviaWhite};
  overflow: hidden;

  padding: 24px 16px;
  box-sizing: border-box;

  ${(props: { cardType: CardType; cardShape: CardShape }) => decideCardSize(props.cardType, props.cardShape)}

  border-radius: ${(props: { cardShape: CardShape }) => (props.cardShape === 'square' ? '8px' : '50%')};
  border: ${(props: { cardShape: CardShape; isInverted: boolean }) =>
    props.cardShape === 'square' && !props.isInverted ? '1px solid #e9e9e9' : ''};
  &:hover {
    border: 2px solid ${colors.elviaCharge};
    padding: 23px 15px;
  }
`;

type CardLabelProps = {
  cardShape: CardShape;
};

const CardLabel = styled.div<CardLabelProps>`
  ${(props: { cardShape: CardShape }) =>
    props.cardShape === 'square' ? typography.textSmStrong : typography.textMdStrong};
  text-align: center;
  color: ${colors.elviaBlack};
`;

type CardDescriptionProps = {
  cardShape: CardShape;
  cardType: CardType;
};

const CardDescription = styled.div<CardDescriptionProps>`
  ${(props: { cardShape: CardShape }) =>
    props.cardShape === 'square' ? typography.textMicro : typography.textSm};
  text-align: ${(props: { cardType: CardType }) => (props.cardType === 'simple' ? 'center' : 'left')};
  color: ${colors.elviaBlack};
`;

const CardIcon = styled.div`
  ${typography.titleLg}
  text-align: center;
  color: ${colors.elviaBlack};
`;

type CardColoredLineProps = {
  borderColor?: BorderColor;
};

const CardColoredLine = styled.div<CardColoredLineProps>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  border-top: 4px solid
    ${(props: { borderColor?: BorderColor }) =>
      props.borderColor ? colors[props.borderColor] : 'transparent'};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Card: FC<CardProps> = ({
  label,
  description,
  icon,
  borderColor,
  cardType = 'simple',
  cardShape = 'square',
  isInverted,
  webcomponent,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  if (cardType === 'detail') cardShape = 'square';

  const cardIcon = useRef<HTMLDivElement>(null);
  const cardDescription = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (cardIcon.current && webcomponent.getSlot('icon')) {
      cardIcon.current.innerHTML = '';
      cardIcon.current.appendChild(webcomponent.getSlot('icon'));
    }
    if (cardDescription.current && webcomponent.getSlot('description')) {
      cardDescription.current.innerHTML = '';
      cardDescription.current.appendChild(webcomponent.getSlot('description'));
    }
  }, [webcomponent]);

  return (
    <CardArea
      cardType={cardType}
      cardShape={cardShape}
      isInverted={isInverted}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {icon && <CardIcon>{icon}</CardIcon>}
      {!icon && (
        <CardIcon>
          <div ref={cardIcon}></div>
        </CardIcon>
      )}
      {label && <CardLabel cardShape={cardShape}>{label}</CardLabel>}
      {description && (
        <CardDescription cardShape={cardShape} cardType={cardType}>
          {description}
        </CardDescription>
      )}
      {!description && (
        <CardDescription cardShape={cardShape} cardType={cardType}>
          <div ref={cardDescription}></div>
        </CardDescription>
      )}
      {!isHovering && cardShape === 'square' && <CardColoredLine borderColor={borderColor}></CardColoredLine>}
    </CardArea>
  );
};

export default Card;
