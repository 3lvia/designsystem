import styled from 'styled-components';
import ElviaTypography from '@elvia/elvis-typography';
import { getColor } from '@elvia/elvis-colors';
import { CardType, CardShape, BorderColor } from './elvia-card.types';

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
  hasBorder: boolean;
  width: string;
  minWidth: number;
  maxWidth: number;
  label?: string;
};

export const CardArea = styled.div<CardAreaProps>`
  position: relative;
  display: inline-flex;
  flex: 1;
  background: ${(props: { shape: CardShape }) =>
    props.shape === 'circle' ? 'transparent' : colors.elviaWhite};
  overflow: hidden;
  box-sizing: border-box;
  justify-content: center;

  min-width: ${(props: { minWidth: number }) => props.minWidth}px;
  max-width: ${(props: { maxWidth: number }) => props.maxWidth}px;
  padding: ${(props: { shape: CardShape }) => (props.shape === 'square' ? '24px' : '0')};
  width: ${(props: { width: string }) => props.width};
  height: 100%;
  ${(props: { shape: CardShape }) => props.shape === 'circle' && 'aspect-ratio: 1/1;'}

  border-radius: ${(props: { shape: CardShape }) => (props.shape === 'square' ? '8px' : '50%')};
  border: ${(props: { shape: CardShape; hasBorder: boolean }) =>
    props.shape === 'square' && props.hasBorder
      ? `1px solid ${colors.elviaGrey10}`
      : props.shape === 'square' && !props.hasBorder
      ? `1px solid ${colors.elviaGrey05}`
      : '1px solid transparent'};

  &:hover {
    border: 2px solid ${colors.elviaCharge};
    padding: ${(props: { shape: CardShape }) => (props.shape === 'square' ? '23px' : '0')};
    cursor: pointer;
  }
`;

type CardContentProps = {
  shape: CardShape;
};

export const CardContent = styled.div<CardContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props: { shape: CardShape }) => (props.shape === 'circle' ? 'center' : 'start')};
  padding-left: ${(props: { shape: CardShape }) => (props.shape === 'circle' ? '24px' : 0)};
  padding-right: ${(props: { shape: CardShape }) => (props.shape === 'circle' ? '24px' : 0)};
`;

type CardHeaderProps = {
  shape: CardShape;
  type: CardType;
};

export const CardHeader = styled.div<CardHeaderProps>`
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
  -webkit-line-clamp: ${(props: { type: CardType }) => (props.type === 'simple' ? 1 : 2)};
  line-clamp: ${(props: { type: CardType }) => (props.type === 'simple' ? 1 : 2)};
  -webkit-box-orient: vertical;
`;

type CardDescriptionProps = {
  shape: CardShape;
  type: CardType;
  maxDescriptionLines: number;
};

export const CardDescription = styled.div<CardDescriptionProps>`
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

export const CardIcon = styled.div`
  ${typography.titleLg}
  text-align: center;
  color: ${colors.elviaBlack};
  white-space: nowrap;

  transition: transform 0.3s ease-in-out;
  ${CardArea}:hover & {
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

type CardColoredLineProps = {
  borderColor?: BorderColor;
};

export const CardColoredLine = styled.div<CardColoredLineProps>`
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

export const CardLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${colors.elviaGrey10};
  font-family: 'Red Hat Text', 'Verdana, sans-serif';
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${colors.elviaBlack};
  white-space: nowrap;
`;

export const CardLabelContainer = styled.div`
  margin-top: 16px;
`;

export const CardDetailHoverArrow = styled.div`
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

export const CardCornerIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  ${CardArea}:hover & {
    right: 15px;
    top: 15px;
  }
`;
