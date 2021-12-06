import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ElviaTypography from '@elvia/elvis-typography';
import { getColor } from '@elvia/elvis-colors';

type CardType = 'simple' | 'detail';
type CardShape = 'square' | 'circle';
type BorderColor = 'green' | 'blue-berry' | 'red' | 'orange';

// 100 * (height / width) of desired aspect ratio
const simpleSquareAspectRatio = 100 * (128 / 152);
const simpleCircleAspectRatio = 100 * (100 / 100);
const detailAspectRatio = 100 * (144 / 299);

const minWidth = 112;
const maxWidth = 400;

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
      min-height: ${minWidth * (simpleSquareAspectRatio / 100)}px;
      padding-top: min(${simpleSquareAspectRatio}%, ${(maxWidth * simpleSquareAspectRatio) / 100}px);`;
  } else if (cardType === 'simple' && cardShape === 'circle') {
    return `
      width: ${width};
      min-height: ${minWidth * (simpleCircleAspectRatio / 100)}px;
      padding-top: min(${simpleCircleAspectRatio}%, ${(maxWidth * simpleCircleAspectRatio) / 100}px);`;
  } else {
    return `
      width: ${width};
      min-height: ${minWidth * (detailAspectRatio / 100)}px;
      padding-top: min(${detailAspectRatio}%, ${(maxWidth * detailAspectRatio) / 100}px);`;
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

  min-width: ${minWidth}px;
  max-width: ${maxWidth}px;
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
        ? `calc(min(${simpleSquareAspectRatio}%, ${(maxWidth * simpleSquareAspectRatio) / 100}px) - 1px)`
        : props.cardType === 'simple' && props.cardShape === 'circle'
        ? `calc(min(${simpleCircleAspectRatio}%, ${(maxWidth * simpleCircleAspectRatio) / 100}px) - 1px)`
        : `calc(min(${detailAspectRatio}%, ${(maxWidth * detailAspectRatio) / 100}px) - 1px)`};
  }
`;

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
  ${(props: { cardShape: CardShape; cardType: CardType }) =>
    props.cardShape === 'square' && props.cardType === 'simple' ? typography.textMicro : typography.textSm};
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

const CardDetailHoverArrow = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 40px;
  background: ${colors.elviaWhite};
  display: none;
  ${CardArea}:hover & {
    display: block;
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
  const cardLabel = useRef<HTMLDivElement>(null);

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
    if (cardLabel.current && webcomponent.getSlot('label')) {
      cardLabel.current.innerHTML = '';
      cardLabel.current.appendChild(webcomponent.getSlot('label'));
    }
  }, [webcomponent]);

  return (
    <CardArea
      cardType={cardType}
      cardShape={cardShape}
      isInverted={isInverted}
      width={width}
      data-testid="card-area"
    >
      <CardContent data-testid="card-content">
        {cardShape === 'square' && (
          <CardColoredLine borderColor={borderColor} data-testid="card-colored-line"></CardColoredLine>
        )}
        {icon && <CardIcon data-testid="card-icon">{icon}</CardIcon>}
        {!icon && (
          <CardIcon data-testid="card-icon">
            <div ref={cardIcon}></div>
          </CardIcon>
        )}
        {label && (
          <CardLabel cardShape={cardShape} data-testid="card-label">
            {label}
          </CardLabel>
        )}
        {!label && (
          <CardLabel cardShape={cardShape} data-testid="card-label">
            <div ref={cardLabel}></div>
          </CardLabel>
        )}
        {description && (
          <CardDescription cardShape={cardShape} cardType={cardType} data-testid="card-description">
            {description}
          </CardDescription>
        )}
        {!description && (
          <CardDescription cardShape={cardShape} cardType={cardType} data-testid="card-description">
            <div ref={cardDescription}></div>
          </CardDescription>
        )}
        {cardType === 'detail' && (
          <CardDetailHoverArrow data-testid="card-detail-hover-arrow">
            <i className="e-icon e-icon--arrow_long_right-bold e-icon--lg"></i>
          </CardDetailHoverArrow>
        )}
      </CardContent>
    </CardArea>
  );
};

export default Card;
