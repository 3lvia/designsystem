import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ElviaTypography from '@elvia/elvis-typography';
import { getColor } from '@elvia/elvis-colors';
import { arrowLongRight } from '@elvia/elvis-assets-icons';

type CardType = 'simple' | 'detail';
type CardShape = 'square' | 'circle';
type BorderColor = 'green' | 'blue-berry' | 'blueBerry' | 'red' | 'orange';

const globalMinWidth = 112;
const globalMaxWidth = 400;

export interface CardProps {
  icon?: string;
  title: string;
  description?: string;
  borderColor?: BorderColor;
  type: CardType;
  shape: CardShape;
  isInverted: boolean;
  width: string;
  minWidth?: number;
  maxWidth?: number;
  maxDescriptionLines: number;
  label?: string;
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
  textMdStrong: ElviaTypography['text-md-strong'],
  textSm: ElviaTypography['text-sm'],
  textSmStrong: ElviaTypography['text-sm-strong'],
  titleSm: ElviaTypography['title-sm'],
  textMicro: ElviaTypography['text-micro'],
};

type CardAreaProps = {
  shape: CardShape;
  type: CardType;
  isInverted: boolean;
  width: string;
  minWidth: number;
  maxWidth: number;
  label?: string;
};

const CardArea = styled.div<CardAreaProps>`
  position: relative;
  display: flex;
  flex: 1;
  background: ${colors.elviaWhite};
  overflow: hidden;
  box-sizing: border-box;
  justify-content: center;

  min-width: ${(props: { minWidth: number }) => props.minWidth}px;
  max-width: ${(props: { maxWidth: number }) => props.maxWidth}px;
  padding: 24px;
  width: ${(props: { width: string }) => props.width};
  height: 100%;
  ${(props: { shape: CardShape }) => props.shape === 'circle' && 'aspect-ratio: 1/1;'}

  border-radius: ${(props: { shape: CardShape }) => (props.shape === 'square' ? '8px' : '50%')};
  border: ${(props: { shape: CardShape; isInverted: boolean }) =>
    props.shape === 'square' && !props.isInverted
      ? `1px solid ${colors.elviaGrey10}`
      : props.shape === 'square' && props.isInverted
      ? `1px solid ${colors.elviaGrey05}`
      : '1px solid transparent'};

  &:hover {
    border: 2px solid ${colors.elviaCharge};
    padding: 23px;
    cursor: pointer;
  }
`;

type CardContentProps = {
  shape: CardShape;
};

const CardContent = styled.div<CardContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props: { shape: CardShape }) => (props.shape === 'circle' ? 'center' : 'start')};
`;

type CardTitleProps = {
  shape: CardShape;
  type: CardType;
};

const CardTitle = styled.div<CardTitleProps>`
  ${(props: { shape: CardShape; type: CardType }) =>
    props.shape === 'square'
      ? props.type === 'simple'
        ? typography.textSmStrong
        : typography.titleSm
      : typography.textMdStrong};
  ${(props: { type: CardType }) => props.type === 'detail' && 'padding-bottom: 8px;'}
  text-align: ${(props: { type: CardType }) => (props.type === 'simple' ? 'center' : 'left')};
  color: ${colors.elviaBlack};
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

type CardDescriptionProps = {
  shape: CardShape;
  type: CardType;
  maxDescriptionLines: number;
};

const CardDescription = styled.div<CardDescriptionProps>`
  ${(props: { shape: CardShape; type: CardType }) =>
    props.shape === 'square' && props.type === 'simple' ? typography.textMicro : typography.textSm};
  text-align: ${(props: { type: CardType }) => (props.type === 'simple' ? 'center' : 'left')};
  color: ${colors.elviaBlack};
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${(props: { maxDescriptionLines: number }) => props.maxDescriptionLines};
  line-clamp: ${(props: { maxDescriptionLines: number }) => props.maxDescriptionLines};
  -webkit-box-orient: vertical;
`;

const CardIcon = styled.div`
  ${typography.titleLg}
  text-align: center;
  color: ${colors.elviaBlack};
  white-space: nowrap;
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

const CardLabel = styled.div`
  margin-top: 16px;
`;

const CardDetailHoverArrow = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  background: ${colors.elviaWhite};
  display: none;
  ${CardArea}:hover & {
    display: block;
  }
`;

const CardMarker = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  ${CardArea}:hover & {
    right: 15px;
    top: 15px;
  }
`;

const Card: FC<CardProps> = ({
  title,
  description,
  icon,
  borderColor,
  type = 'simple',
  shape = 'square',
  isInverted,
  width = '100%',
  minWidth,
  maxWidth,
  maxDescriptionLines = 5,
  label,
  webcomponent,
}) => {
  if (type === 'detail') shape = 'square';

  minWidth = minWidth ? Math.max(minWidth, globalMinWidth) : globalMinWidth;
  maxWidth = maxWidth ? Math.min(maxWidth, globalMaxWidth) : globalMaxWidth;

  const cardIcon = useRef<HTMLDivElement>(null);
  const cardMarker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (cardIcon.current && webcomponent.getSlot('icon')) {
      cardIcon.current.innerHTML = '';
      cardIcon.current.appendChild(webcomponent.getSlot('icon'));
    }
    if (cardMarker.current && webcomponent.getSlot('marker')) {
      cardMarker.current.innerHTML = '';
      cardMarker.current.appendChild(webcomponent.getSlot('marker'));
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
      label={label}
      data-testid="card-area"
    >
      {shape === 'square' && type === 'simple' && (
        <CardColoredLine borderColor={borderColor} data-testid="card-colored-line"></CardColoredLine>
      )}
      <CardContent shape={shape} data-testid="card-content">
        {icon && <CardIcon data-testid="card-icon">{icon}</CardIcon>}
        {!icon && (
          <CardIcon data-testid="card-icon">
            <div ref={cardIcon}></div>
          </CardIcon>
        )}
        {title && (
          <CardTitle shape={shape} type={type} data-testid="card-title">
            {title}
          </CardTitle>
        )}
        {description && (
          <CardDescription
            shape={shape}
            type={type}
            maxDescriptionLines={maxDescriptionLines}
            data-testid="card-description"
          >
            {description}
          </CardDescription>
        )}
        {type === 'detail' && label && (
          <CardLabel data-testid="card-detail-label">
            <label className="e-label">{label}</label>
          </CardLabel>
        )}
      </CardContent>
      {type === 'detail' && (
        <CardDetailHoverArrow data-testid="card-detail-hover-arrow">
          <i dangerouslySetInnerHTML={{ __html: arrowLongRight.getIcon(colors.elviaBlack) }}></i>
        </CardDetailHoverArrow>
      )}
      <CardMarker data-testid="card-marker">
        <div ref={cardMarker}></div>
      </CardMarker>
    </CardArea>
  );
};

export default Card;
