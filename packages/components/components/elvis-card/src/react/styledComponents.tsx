import styled from 'styled-components';
import { getTypographyCss } from '@elvia/elvis-typography';
import { getColor } from '@elvia/elvis-colors';
import { CardType, BorderColor } from './elvia-card.types';

const colors = {
  black: getColor('black'),
  white: getColor('white'),
  charge: getColor('elvia-charge'),
  grey10: getColor('grey-10'),
  grey05: getColor('grey-05'),
  green: getColor('green'),
  'blue-berry': getColor('blue-berry'),
  blueBerry: getColor('blue-berry'),
  red: getColor('red'),
  orange: getColor('orange'),
};

const typography = {
  titleLg: getTypographyCss('title-lg'),
  textSm: getTypographyCss('text-sm'),
  textSmStrong: getTypographyCss('text-sm-strong'),
  titleSm: getTypographyCss('title-sm'),
  textMicro: getTypographyCss('text-micro'),
};

const globalMinWidthSimple = 112;
const globalMinWidthDetail = 250;
const globalMaxWidth = 400;

const decideCardAreaWidths = (type: CardType, minWidth?: number, maxWidth?: number) => {
  let cssValue = '';
  if (type === 'simple') {
    cssValue += minWidth
      ? `min-width: ${Math.max(minWidth, globalMinWidthSimple)}px;`
      : `min-width: ${globalMinWidthSimple}px;`;
  } else {
    cssValue += minWidth
      ? `min-width: ${Math.max(minWidth, globalMinWidthDetail)}px;`
      : `min-width: ${globalMinWidthDetail}px;`;
  }
  cssValue += maxWidth
    ? `max-width: min(${maxWidth}px, ${globalMaxWidth}px);`
    : `max-width: ${globalMaxWidth}px;`;

  return cssValue;
};

interface CardAreaProps {
  type: CardType;
  hasBorder: boolean;
  width: string;
  minWidth?: number;
  maxWidth?: number;
}

export const CardArea = styled.div<CardAreaProps>`
  position: relative;
  background: ${colors.white};
  overflow: hidden;
  box-sizing: border-box;

  padding: 24px;
  ${(props) => decideCardAreaWidths(props.type, props.minWidth, props.maxWidth)};
  width: ${(props) => props.width};

  border-radius: 8px;
  border: ${(props) => (props.hasBorder ? `1px solid ${colors.grey10}` : `1px solid ${colors.grey05}`)};

  &:hover {
    border: 2px solid ${colors.charge};
    padding: 23px;
    cursor: pointer;
  }
`;

interface CardContentProps {
  type: CardType;
}
export const CardContent = styled.div<CardContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
  padding-top: 4px;
  height: ${(props) => (props.type === 'detail' ? '140px' : 'min-content')};
  overflow: hidden;
`;

interface CardHeaderProps {
  type: CardType;
}

export const CardHeader = styled.div<CardHeaderProps>`
  ${(props) => (props.type === 'simple' ? typography.textSmStrong : typography.titleSm)};
  text-align: ${(props) => (props.type === 'simple' ? 'center' : 'left')};
  color: ${colors.black};
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${(props) => (props.type === 'simple' ? 1 : 2)};
  line-clamp: ${(props) => (props.type === 'simple' ? 1 : 2)};
  -webkit-box-orient: vertical;
  word-break: break-word;

  &:hover {
    -webkit-line-clamp: unset;
    line-clamp: unset;
    overflow: visible;
  }
`;

interface CardDescriptionProps {
  type: CardType;
  maxDescriptionLines: number;
}

export const CardDescription = styled.div<CardDescriptionProps>`
  ${(props) => (props.type === 'simple' ? typography.textMicro : typography.textSm)};
  text-align: ${(props) => (props.type === 'simple' ? 'center' : 'left')};
  color: ${colors.black};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${(props) => props.maxDescriptionLines};
  line-clamp: ${(props) => props.maxDescriptionLines};
`;

export const CardIcon = styled.div`
  ${typography.titleLg}
  text-align: center;
  color: ${colors.black};
  white-space: nowrap;

  transition: transform 0.3s ease-in-out;
  -webkit-transition: transform 0.3s ease-in-out;
  ${CardArea}:hover & {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

interface CardColoredLineProps {
  borderColor?: BorderColor;
}

export const CardColoredLine = styled.div<CardColoredLineProps>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  border-top: 4px solid ${(props) => (props.borderColor ? colors[props.borderColor] : 'transparent')};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  ${CardArea}:hover & {
    display: none;
  }
`;

export const CardTag = styled.span`
  position: relative;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${colors.grey10};
  font-family: 'Red Hat Text', 'Verdana, sans-serif';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${colors.black};
  white-space: nowrap;
`;

export const CardHoverArrow = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  background: ${colors.white};
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
