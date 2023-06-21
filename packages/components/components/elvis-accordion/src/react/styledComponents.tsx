import styled, { css } from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import {
  AccordionLabelPosition,
  AccordionSize,
  AccordionSpacingContent,
  AccordionType,
} from './elvia-accordion.types';
import { getTypographyCss, TypographyName } from '@elvia/elvis-typography';

const bezierCurve = 'cubic-bezier(0.71, 0, 0.31, 1)';

export const AccordionArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const decideLabelPosition = (prop: AccordionLabelPosition) => {
  if (prop === 'center') {
    return 'center';
  }
  if (prop === 'right') {
    return 'flex-end';
  }
  if (prop === 'left') {
    return 'start';
  }

  return 'flex-start';
};

export interface AccordionButtonAreaProps {
  labelPosition: AccordionLabelPosition;
  type: AccordionType;
}

export const AccordionButtonArea = styled.div<AccordionButtonAreaProps>`
  display: flex;
  justify-content: ${({ labelPosition }) => decideLabelPosition(labelPosition)};
  flex-direction: row;
  width: 100%;
`;

const decideButtonFontSize = (size: AccordionSize) => {
  switch (size) {
    case 'small':
      return '14';
    case 'large':
      return '20';
    case 'medium':
    default:
      return '16';
  }
};

interface AccordionButtonProps {
  isFullWidth: boolean;
  isOpenState: boolean;
  currType: AccordionType;
  size: AccordionSize;
  hasBoldLabel: boolean;
  openDetailText?: string;
  typography?: TypographyName;
}

export const AccordionButton = styled.button<AccordionButtonProps>`
  border: none;
  background: transparent;
  display: flex;
  padding: 0;
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: ${({ hasBoldLabel, openDetailText }) =>
    !hasBoldLabel && openDetailText === undefined ? '400' : '500'};
  font-size: ${({ size }) => `${decideButtonFontSize(size)}px`};
  line-height: ${({ size }) => (size === 'small' ? '16px' : '24px')};
  ${({ typography }) => typography && getTypographyCss(typography)}
  text-align: left;
  cursor: pointer;
  color: ${getThemeColor('text-1')};
  width: ${({ isFullWidth, currType }) => (isFullWidth && currType === 'normal' ? '100%' : 'auto')};
  justify-content: ${({ isFullWidth, currType }) =>
    isFullWidth && currType === 'normal' ? 'space-between' : 'inherit'};
  align-items: center;

  svg {
    transform: rotate(0deg);
    transition: transform 0.2s ease-out;

    ${({ isOpenState }) =>
      isOpenState &&
      css`
        transform: rotate(180deg);
      `};
  }
`;

interface AccordionLabelProps {
  hasLabel: boolean;
  isStartAligned: boolean | undefined;
  isFullWidth: boolean | undefined;
}

export const AccordionLabel = styled.div<AccordionLabelProps>`
  display: ${({ hasLabel }) => (hasLabel ? 'flex' : 'none')};
  flex-direction: row;
  align-items: baseline;
  margin-left: ${({ isStartAligned, isFullWidth }) => (isStartAligned && !isFullWidth ? '8px' : '0')};
  margin-right: ${({ isStartAligned, isFullWidth }) => (isStartAligned && !isFullWidth ? '0' : '8px')};
`;

export const AccordionLabelText = styled.div`
  display: flex;
`;

const decideDetailTextSize = (size: AccordionSize): string => {
  if (size === 'small') {
    return getTypographyCss('text-micro');
  } else if (size === 'large') {
    return getTypographyCss('text-md');
  } else {
    return getTypographyCss('text-sm');
  }
};

interface AccordionDetailTextProps {
  size: AccordionSize;
  openDetailText: string | undefined;
}

export const AccordionDetailText = styled.div<AccordionDetailTextProps>`
  ${({ size }) => decideDetailTextSize(size)};
  display: flex;
  text-align: left;
  color: ${getThemeColor('text-1')};
  margin-left: ${({ openDetailText }) => (openDetailText !== undefined ? '8px;' : '0;')};
`;

const decideContentMarginTop = (
  type: AccordionType,
  hasContent: boolean,
  spacingAboveContent: AccordionSpacingContent,
): string => {
  if (type === 'overflow' || !hasContent) {
    return '0';
  }
  return spacingAboveContent;
};

const decideContentMaxHeight = (
  contentOpen: boolean,
  type: AccordionType,
  contentHeight: number,
  overflowHeight?: number,
): string => {
  if (contentOpen) {
    return `${contentHeight}px`;
  } else {
    if (type === 'overflow') {
      return overflowHeight ? `${overflowHeight}px` : 'calc(2em * 1.3)';
    }
    return '0';
  }
};

const decideContentOpacity = (contentOpen: boolean, type: AccordionType): string => {
  if (contentOpen || type === 'overflow') {
    return '1';
  }
  return '0';
};

const decideContentTransitionDuration = (contentHeight: number): string => {
  const pixelsPerSecond = 1000;
  const minDuration = 0.2;
  const maxDuration = 0.7;
  const transitionDuration = contentHeight / pixelsPerSecond;
  return `${Math.max(minDuration, Math.min(transitionDuration, maxDuration))}s`;
};

interface AccordionContentProps {
  isOpenState: boolean;
  type: AccordionType;
  spacingAboveContent: AccordionSpacingContent;
  spacingBelowContent: AccordionSpacingContent;
  overflowHeight?: number;
  contentHeight: number;
  hasContent: boolean;
}

export const AccordionContent = styled.div<AccordionContentProps>`
  display: ${({ hasContent }) => (hasContent ? 'block' : 'none')};
  visibility: ${({ type, isOpenState }) => (type === 'normal' && !isOpenState ? `hidden` : `visible`)};
  background: transparent;
  font-size: 16px;
  line-height: inherit;
  margin-top: ${({ type, hasContent, spacingAboveContent }) =>
    decideContentMarginTop(type, hasContent, spacingAboveContent)};
  margin-bottom: ${({ type, spacingBelowContent }) => (type === 'overflow' ? spacingBelowContent : 0)};
  pointer-events: ${({ isOpenState }) => (isOpenState ? 'auto' : 'none')};
  max-height: ${({ isOpenState, type, contentHeight, overflowHeight }) =>
    decideContentMaxHeight(isOpenState, type, contentHeight, overflowHeight)};
  width: 100%;
  opacity: ${({ isOpenState, type }) => decideContentOpacity(isOpenState, type)};
  overflow-y: hidden;
  transition: all ${({ contentHeight }) => decideContentTransitionDuration(contentHeight)} ${bezierCurve};
  transition-property: opacity, max-height, visibility;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`;
