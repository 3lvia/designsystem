import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ElviaTypography from '@elvia/elvis-typography';
import { getColor } from '@elvia/elvis-colors';

type CardType = 'simple' | 'detail';
type CardShape = 'square' | 'circle';
type BorderColor = 'green' | 'blue-berry' | 'blueBerry' | 'red' | 'orange';

// 100 * (height / width) of desired aspect ratio
const simpleSquareAspectRatio = 100 * (128 / 152);
const simpleCircleAspectRatio = 100 * (100 / 100);
const detailAspectRatio = 100 * (144 / 299);

const globalMinWidth = 112;
const globalMaxWidth = 400;

export interface CardProps {
  label?: string;
  description?: string;
  icon?: string | HTMLElement;
  borderColor?: BorderColor;
  type: CardType;
  shape: CardShape;
  isInverted: boolean;
  width: string;
  minWidth?: number;
  maxWidth?: number;
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
  blueBerry: getColor('blue-berry'),
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

const decideCardSize = (type: CardType, shape: CardShape, minWidth: number, maxWidth: number) => {
  if (type === 'simple' && shape === 'square') {
    return `
      min-height: ${minWidth * (simpleSquareAspectRatio / 100)}px;
      padding-top: min(${simpleSquareAspectRatio}%, ${(maxWidth * simpleSquareAspectRatio) / 100}px);`;
  } else if (type === 'simple' && shape === 'circle') {
    return `
      min-height: ${minWidth * (simpleCircleAspectRatio / 100)}px;
      padding-top: min(${simpleCircleAspectRatio}%, ${(maxWidth * simpleCircleAspectRatio) / 100}px);`;
  } else {
    return `
      min-height: ${minWidth * (detailAspectRatio / 100)}px;
      padding-top: min(${detailAspectRatio}%, ${(maxWidth * detailAspectRatio) / 100}px);`;
  }
};

const decideCardSizeHover = (type: CardType, shape: CardShape, maxWidth: number) => {
  if (type === 'simple' && shape === 'square') {
    return `
      padding-top: calc(min(${simpleSquareAspectRatio}%, ${
      (maxWidth * simpleSquareAspectRatio) / 100
    }px) - 1px);`;
  } else if (type === 'simple' && shape === 'circle') {
    return `
      padding-top: calc(min(${simpleCircleAspectRatio}%, ${
      (maxWidth * simpleCircleAspectRatio) / 100
    }px) - 1px);`;
  } else {
    return `
      padding-top: calc(min(${detailAspectRatio}%, ${(maxWidth * detailAspectRatio) / 100}px) - 1px);`;
  }
};

type CardAreaProps = {
  shape: CardShape;
  type: CardType;
  isInverted: boolean;
  width: string;
  minWidth: number;
  maxWidth: number;
};

const CardArea = styled.div<CardAreaProps>`
  position: relative;
  display: inline-flex;
  background: ${colors.elviaWhite};
  overflow: hidden;
  box-sizing: border-box;

  min-width: ${(props: { minWidth: number }) => props.minWidth}px;
  max-width: ${(props: { maxWidth: number }) => props.maxWidth}px;
  padding: 1px;
  width: ${(props: { width: string }) => props.width};
  ${(props: { type: CardType; shape: CardShape; minWidth: number; maxWidth: number }) =>
    decideCardSize(props.type, props.shape, props.minWidth, props.maxWidth)}

  border-radius: ${(props: { shape: CardShape }) => (props.shape === 'square' ? '8px' : '50%')};
  border: ${(props: { shape: CardShape; isInverted: boolean }) =>
    props.shape === 'square' && !props.isInverted
      ? `1px solid ${colors.elviaGrey10}`
      : props.shape === 'square' && props.isInverted
      ? `1px solid ${colors.elviaGrey05}`
      : '1px solid transparent'};

  &:hover {
    border: 2px solid ${colors.elviaCharge};
    padding: 0;
    ${(props: { type: CardType; shape: CardShape; maxWidth: number }) =>
      decideCardSizeHover(props.type, props.shape, props.maxWidth)};
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
  shape: CardShape;
};

const CardLabel = styled.div<CardLabelProps>`
  ${(props: { shape: CardShape }) =>
    props.shape === 'square' ? typography.textSmStrong : typography.textMdStrong};
  text-align: center;
  white-space: nowrap;
  color: ${colors.elviaBlack};
`;

type CardDescriptionProps = {
  shape: CardShape;
  type: CardType;
};

const CardDescription = styled.div<CardDescriptionProps>`
  ${(props: { shape: CardShape; type: CardType }) =>
    props.shape === 'square' && props.type === 'simple' ? typography.textMicro : typography.textSm};
  text-align: ${(props: { type: CardType }) => (props.type === 'simple' ? 'center' : 'left')};
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
  type = 'simple',
  shape = 'square',
  isInverted,
  width = '100%',
  minWidth,
  maxWidth,
  webcomponent,
}) => {
  if (type === 'detail') shape = 'square';

  minWidth = minWidth ? Math.max(minWidth, globalMinWidth) : globalMinWidth;
  maxWidth = maxWidth ? Math.min(maxWidth, globalMaxWidth) : globalMaxWidth;

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
      type={type}
      shape={shape}
      isInverted={isInverted}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      data-testid="card-area"
    >
      {shape === 'square' && (
        <CardColoredLine borderColor={borderColor} data-testid="card-colored-line"></CardColoredLine>
      )}
      <CardContent data-testid="card-content">
        {icon && <CardIcon data-testid="card-icon">{icon}</CardIcon>}
        {!icon && (
          <CardIcon data-testid="card-icon">
            <div ref={cardIcon}></div>
          </CardIcon>
        )}
        {label && (
          <CardLabel shape={shape} data-testid="card-label">
            {label}
          </CardLabel>
        )}
        {!label && (
          <CardLabel shape={shape} data-testid="card-label">
            <div ref={cardLabel}></div>
          </CardLabel>
        )}
        {description && (
          <CardDescription shape={shape} type={type} data-testid="card-description">
            {description}
          </CardDescription>
        )}
        {!description && (
          <CardDescription shape={shape} type={type} data-testid="card-description">
            <div ref={cardDescription}></div>
          </CardDescription>
        )}
        {type === 'detail' && (
          <CardDetailHoverArrow data-testid="card-detail-hover-arrow">
            <i className="e-icon e-icon--arrow_long_right-bold e-icon--md"></i>
          </CardDetailHoverArrow>
        )}
      </CardContent>
    </CardArea>
  );
};

export default Card;
