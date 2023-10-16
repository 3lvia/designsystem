import styled, { keyframes } from 'styled-components';
import { getTypographyCss } from '@elvia/elvis-typography';
import { getThemeColor } from '@elvia/elvis-colors';
import {
  CardType,
  BorderColors,
  CardAreaProps,
  CardContentProps,
  CardHeadingProps,
  CardDescriptionProps,
  CardColoredLineProps,
} from './elvia-card.types';

const borderColors: BorderColors = {
  none: 'transparent',
  green: getThemeColor('signal-positive'),
  'blue-berry': getThemeColor('data-3'),
  blueBerry: getThemeColor('data-3'),
  blue: getThemeColor('data-3'),
  red: getThemeColor('signal-danger'),
  orange: getThemeColor('signal-warning'),
};

const simpleMinWidth = 150;
const simpleMaxWidth = 250;
const detailMinWidth = 250;
const detailMaxWidth = 600;

const getCardAreaMinWidth = (type: CardType, minWidth?: number) => {
  if (type === 'simple') {
    return `${minWidth ? Math.max(minWidth, simpleMinWidth) : simpleMinWidth}px`;
  }
  return `${minWidth ? Math.max(minWidth, detailMinWidth) : detailMinWidth}px`;
};

const getCardAreaMaxWidth = (type: CardType, maxWidth?: number) => {
  if (type === 'simple') {
    return `${maxWidth ? Math.min(maxWidth, simpleMaxWidth) : simpleMaxWidth}px`;
  }
  return `${maxWidth ? Math.min(maxWidth, detailMaxWidth) : detailMaxWidth}px`;
};

export const CardArea = styled.article<CardAreaProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ type }) => (type === 'simple' ? 'center' : 'flex-start')};
  justify-content: ${({ type }) => (type === 'simple' ? 'center' : 'flex-start')};
  position: relative;
  background: ${getThemeColor('background-element-1')};
  box-sizing: border-box;

  padding: 22px;
  min-width: ${({ type, minWidth }) => getCardAreaMinWidth(type, minWidth)};
  max-width: ${({ type, maxWidth }) => getCardAreaMaxWidth(type, maxWidth)};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  aspect-ratio: ${({ type, height }) => type === 'simple' && height === undefined && '1 / 1'};

  border-radius: 8px;
  border: 2px solid ${getThemeColor('border-4')};

  &:hover {
    border: 2px solid ${getThemeColor('border-hover-1')};
    cursor: pointer;
  }
`;

export const CardContent = styled.div<CardContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ type }) => (type === 'simple' ? 'center' : 'flex-start')};
  align-items: ${({ type }) => (type === 'simple' ? 'center' : 'flex-start')};
  gap: ${({ type }) => type === 'detail' && '8px'};
  width: fit-content;
`;

const getHeadingLineClamp = (type: CardType, maxLines?: number) => {
  if (maxLines) {
    return maxLines;
  }
  return type === 'simple' ? 1 : 2;
};

export const CardHeading = styled.h3<CardHeadingProps>`
  width: fit-content;
  margin: 0;
  ${({ type }) => getTypographyCss(type === 'simple' ? 'text-sm-strong' : 'title-xs')};
  text-align: ${({ type }) => (type === 'simple' ? 'center' : 'left')};
  color: ${getThemeColor('text-1')};
  display: flexbox;
  overflow: hidden;
  -webkit-line-clamp: ${({ type, maxHeadingLines }) => getHeadingLineClamp(type, maxHeadingLines)};
  line-clamp: ${({ type, maxHeadingLines }) => getHeadingLineClamp(type, maxHeadingLines)};
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
`;

export const CardDescription = styled.p<CardDescriptionProps>`
  padding: 0;
  margin: 0;
  ${({ type }) => getTypographyCss(type === 'simple' ? 'text-micro' : 'text-sm')};
  text-align: ${({ type }) => (type === 'simple' ? 'center' : 'left')};
  color: ${getThemeColor('text-1')};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ maxDescriptionLines }) => maxDescriptionLines};
  line-clamp: ${({ maxDescriptionLines }) => maxDescriptionLines};
`;

export const CardIcon = styled.div`
  ${getTypographyCss('title-lg')}
  text-align: center;
  color: ${getThemeColor('text-1')};
  white-space: nowrap;
  width: fit-content;

  transition: transform 0.3s ease-in-out;
  -webkit-transition: transform 0.3s ease-in-out;
  ${CardArea}:hover & {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

export const CardColoredLineContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  height: calc(100% + 2px);
  width: calc(100% + 2px);
  border-radius: inherit;
  pointer-events: none;
`;

export const CardColoredLine = styled.div<CardColoredLineProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-top: 4px solid ${({ borderColor }) => (borderColor ? borderColors[borderColor] : 'transparent')};
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
  background: ${getThemeColor('background-element-3')};
  font-family: 'Red Hat Text', 'Verdana, sans-serif';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${getThemeColor('text-1')};
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
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${getThemeColor('background-element-4')};
  opacity: 0;
  ${CardArea}:hover & {
    animation: ${CardHoverArrowHoverKeyframe} 300ms ease forwards;
  }
`;

export const CardCornerIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
`;
