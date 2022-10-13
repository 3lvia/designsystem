import styled, { css, keyframes } from 'styled-components';
import { getTypographyCss } from '@elvia/elvis-typography';
import { getColor } from '@elvia/elvis-colors';
import { CardType, BorderColor } from './elvia-card.types';

const colors = {
  black: getColor('black'),
  white: getColor('white'),
  charge: getColor('elvia-charge'),
  grey80: getColor('grey-80'),
  grey10: getColor('grey-10'),
  grey05: getColor('grey-05'),
  green: getColor('green'),
  'blue-berry': getColor('blue-berry'),
  blueBerry: getColor('blue-berry'),
  red: getColor('red'),
  orange: getColor('orange'),
};

const globalMinWidthSimple = 150;
const globalMaxWidthSimple = 250;
const globalMinWidthDetail = 250;
const globalMaxWidthDetail = 400;

const decideCardAreaWidths = (type: CardType, minWidth?: number, maxWidth?: number) => {
  let cssValue = '';
  if (type === 'simple') {
    cssValue += minWidth
      ? `min-width: ${Math.max(minWidth, globalMinWidthSimple)}px;`
      : `min-width: ${globalMinWidthSimple}px;`;
    cssValue += maxWidth
      ? `max-width: ${Math.min(maxWidth, globalMaxWidthSimple)}px;`
      : `max-width: ${globalMaxWidthSimple}px;`;
  } else {
    cssValue += minWidth
      ? `min-width: ${Math.max(minWidth, globalMinWidthDetail)}px;`
      : `min-width: ${globalMinWidthDetail}px;`;
    cssValue += maxWidth
      ? `max-width: ${Math.min(maxWidth, globalMaxWidthDetail)}px;`
      : `max-width: ${globalMaxWidthDetail}px;`;
  }
  return cssValue;
};

interface CardAreaProps {
  type: CardType;
  hasBorder: boolean;
  width: string;
  height: string;
  minWidth?: number;
  maxWidth?: number;
}

export const CardArea = styled.div<CardAreaProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.type === 'simple' ? 'center' : 'flex-start')};
  position: relative;
  background: ${colors.white};
  box-sizing: border-box;

  padding: 24px;
  ${(props) => decideCardAreaWidths(props.type, props.minWidth, props.maxWidth)};
  ${(props) => css`
    width: ${props.width};
    height: ${props.height};
  `}
  ${(props) =>
    props.type === 'simple' &&
    css`
      aspect-ratio: 1 / 1;
    `}

  border-radius: 8px;
  border: ${(props) => (props.hasBorder ? `1px solid ${colors.grey10}` : 'none')};

  &:hover {
    border: 2px solid ${colors.charge};
    padding: ${(props) => (props.hasBorder ? '23px' : '22px')};
    cursor: pointer;
  }
`;

interface CardContentProps {
  type: CardType;
}

export const CardContent = styled.div<CardContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.type === 'simple' ? 'center' : 'flex-start')};
  align-items: ${(props) => (props.type === 'simple' ? 'center' : 'flex-start')};
  ${(props) =>
    props.type === 'detail' &&
    css`
      gap: 8px;
    `}
  width: fit-content;
`;

interface CardHeadingProps {
  type: CardType;
}

export const CardHeading = styled.h3<CardHeadingProps>`
  width: fit-content;
  margin: 0;
  ${(props) => (props.type === 'simple' ? getTypographyCss('text-sm-strong') : getTypographyCss('title-xs'))};
  text-align: ${(props) => (props.type === 'simple' ? 'center' : 'left')};
  color: ${colors.black};
  display: flexbox;
  overflow: hidden;
  -webkit-line-clamp: ${(props) => (props.type === 'simple' ? 1 : 2)};
  line-clamp: ${(props) => (props.type === 'simple' ? 1 : 2)};
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
`;

interface CardDescriptionProps {
  type: CardType;
  maxDescriptionLines: number;
}

export const CardDescription = styled.p<CardDescriptionProps>`
  padding: 0;
  margin: 0;
  ${(props) => (props.type === 'simple' ? getTypographyCss('text-micro') : getTypographyCss('text-sm'))};
  text-align: ${(props) => (props.type === 'simple' ? 'center' : 'left')};
  color: ${colors.black};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${(props) => props.maxDescriptionLines};
  line-clamp: ${(props) => props.maxDescriptionLines};
`;

export const CardIcon = styled.div`
  ${getTypographyCss('title-lg')}
  text-align: center;
  color: ${colors.black};
  white-space: nowrap;
  width: fit-content;

  transition: transform 0.3s ease-in-out;
  -webkit-transition: transform 0.3s ease-in-out;
  ${CardArea}:hover & {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

interface CardColoredLineContainerProps {
  hasBorder?: boolean;
}

export const CardColoredLineContainer = styled.div<CardColoredLineContainerProps>`
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  top: ${(props) => (props.hasBorder ? '-1px' : '0')};
  left: ${(props) => (props.hasBorder ? '-1px' : '0')};
  height: ${(props) => (props.hasBorder ? 'calc(100% + 2px)' : '100%')};
  width: ${(props) => (props.hasBorder ? 'calc(100% + 2px)' : '100%')};
  border-radius: inherit;
  border: ${(props) => (props.hasBorder ? '1px solid transparent' : '0')};
  pointer-events: none;
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
  margin-top: 8px;
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

const CardHoverArrowHoverKeyframe = keyframes`
  0% {
    transform: translateX(-10px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const CardHoverArrow = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle, ${colors.white} 20%, transparent 100%);
  opacity: 0;
  ${CardArea}:hover & {
    animation: ${CardHoverArrowHoverKeyframe} 300ms ease forwards;
  }
`;

interface CardCornerIconProps {
  hasBorder?: boolean;
}

export const CardCornerIcon = styled.div<CardCornerIconProps>`
  position: absolute;
  right: 16px;
  top: 16px;
  ${CardArea}:hover & {
    ${(props) =>
      props.hasBorder
        ? css`
            right: 15px;
            top: 15px;
          `
        : css`
            right: 14px;
            top: 14px;
          `}
  }
`;
