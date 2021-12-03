import React, { FC, useRef, useEffect } from 'react';
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
  width: string;
  webcomponent: any;
}

const colors = {
  elviaBlack: getColor('black'),
  elviaWhite: getColor('white'),
  elviaCharge: getColor('elvia-charge'),
  elviaGrey10: getColor('grey-10'),
  elviaGrey05: getColor('grey-05'),
  green: getColor('green'),
  'blue-berry': getColor('blue-berry'),
  red: getColor('red'),
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

const decideCardSize = (cardType: CardType, cardShape: CardShape, width: string) => {
  if (cardType === 'simple' && cardShape === 'square') {
    return `
      width: ${width};
      padding-top: 84.21%;`;
  } else if (cardType === 'simple' && cardShape === 'circle') {
    return `
      width: ${width};
      padding-top: 100%;`;
  } else {
    return `
      width: ${width};
      width: 299px;
      padding-top: 48.16%;`;
  }
};

type CardAreaProps = {
  cardShape: CardShape;
  cardType: CardType;
  isInverted: boolean;
  width: string;
};

const CardArea = styled.div<CardAreaProps>`
  position: relative;
  display: inline-flex;
  background: ${colors.elviaWhite};
  overflow: hidden;
  box-sizing: border-box;

  min-width: 112px;
  max-width: 400px;
  padding: 1px;
  ${(props: { cardType: CardType; cardShape: CardShape; width: string }) =>
    decideCardSize(props.cardType, props.cardShape, props.width)}
  border-radius: ${(props: { cardShape: CardShape }) => (props.cardShape === 'square' ? '8px' : '50%')};
  border: ${(props: { cardShape: CardShape; isInverted: boolean }) =>
    props.cardShape === 'square' && !props.isInverted
      ? `1px solid ${colors.elviaGrey10}`
      : props.cardShape === 'square' && props.isInverted
      ? `1px solid ${colors.elviaGrey05}`
      : '1px solid transparent'};

  &:hover {
    border: 2px solid ${colors.elviaCharge};
    padding: 0;
    padding-top: ${(props: { cardType: CardType; cardShape: CardShape }) =>
      props.cardType === 'simple' && props.cardShape === 'square'
        ? 'calc(84.21% - 1px)'
        : props.cardType === 'simple' && props.cardShape === 'circle'
        ? 'calc(100% - 1px)'
        : 'calc(48.16% - 1px)'};
  }
`;

// type CardContentProps = {};

const CardContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 24px 16px;
  ${CardArea}:hover & {
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
  white-space: nowrap;
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
  white-space: nowrap;
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
  ${CardArea}:hover & {
    display: none;
  }
`;

const Card: FC<CardProps> = ({
  label,
  description,
  icon,
  borderColor,
  cardType = 'simple',
  cardShape = 'square',
  isInverted,
  width = '100%',
  webcomponent,
}) => {
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
      width={width}
      onClick={() => {
        console.log('clicked');
      }}
    >
      <CardContent>
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
        {cardShape === 'square' && <CardColoredLine borderColor={borderColor}></CardColoredLine>}
      </CardContent>
    </CardArea>
  );
};

export default Card;
