import { getThemeColor } from '@elvia/elvis-colors';
import { IconWrapper } from '@elvia/elvis-toolbox';
import { TypographyName, getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

import {
  AccordionLabelPosition,
  AccordionSize,
  AccordionSpacingContent,
  AccordionType,
} from './elvia-accordion.types';

interface AccordionAreaProps {
  normalSpacing?: AccordionSpacingContent;
  overflowSpacing?: AccordionSpacingContent;
  isOverflow: boolean;
}

export const AccordionArea = styled.div<AccordionAreaProps>`
  display: flex;
  flex-direction: ${({ isOverflow }) => (isOverflow ? 'column-reverse' : 'column')};
  gap: ${({ normalSpacing, overflowSpacing, isOverflow }) => {
    if (isOverflow) {
      return overflowSpacing ?? '8px';
    } else {
      return normalSpacing ?? '8px';
    }
  }};
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

export const AccordionButtonArea = styled.div<{ labelPosition: AccordionLabelPosition }>`
  display: flex;
  justify-content: ${({ labelPosition }) => decideLabelPosition(labelPosition)};
  flex-direction: row;
  width: 100%;
`;

interface AccordionButtonProps {
  isFullWidth: boolean;
  isOpenState: boolean;
  accordionType: AccordionType;
  reverseLayout: boolean;
}

export const StyledIconWrapper = styled(IconWrapper)``;

export const AccordionButton = styled.button<AccordionButtonProps>`
  border: none;
  background: transparent;
  display: flex;
  padding: 0;
  text-align: left;
  cursor: pointer;
  color: ${getThemeColor('text-1')};
  width: ${({ isFullWidth, accordionType }) => (isFullWidth && accordionType === 'normal' ? '100%' : 'auto')};
  justify-content: ${({ isFullWidth, accordionType }) =>
    isFullWidth && accordionType === 'normal' ? 'space-between' : 'inherit'};
  flex-direction: ${({ reverseLayout }) => (reverseLayout ? 'row-reverse' : 'row')};
  gap: 8px;
  align-items: center;
  user-select: text;

  ${StyledIconWrapper} {
    transform: rotate(0deg);
    transition: transform 0.2s ease-out;

    ${({ isOpenState }) =>
      isOpenState &&
      css`
        transform: rotate(180deg);
      `};
  }
`;

export const AccordionLabel = styled.div<{ hasLabel: boolean; isFullWidth: boolean | undefined }>`
  display: ${({ hasLabel }) => (hasLabel ? 'flex' : 'none')};
  flex-direction: row;
  align-items: baseline;
  ${({ isFullWidth }) => isFullWidth && 'flex-grow: 1;'}
`;

const decideTypography = (size: AccordionSize) => {
  switch (size) {
    case 'small':
      return css`
        ${getTypographyCss('text-interactive-sm')}
        line-height: 16px;
      `;
    case 'large':
      return css`
        ${getTypographyCss('text-interactive-lg')}
        font-size: 20px;
      `;
    case 'medium':
    default:
      return getTypographyCss('text-interactive-md');
  }
};

interface AccordionTextProps {
  size: AccordionSize;
  typography?: TypographyName;
  isFullWidth: boolean;
  hasDetailText: boolean;
}

export const AccordionLabelText = styled.div<AccordionTextProps>`
  display: flex;
  ${({ typography, size }) => (typography ? getTypographyCss(typography) : decideTypography(size))}
  ${({ isFullWidth, hasDetailText }) => isFullWidth && !hasDetailText && 'flex-grow: 1;'}
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

export const AccordionDetailText = styled.div<{ size: AccordionSize; openDetailText: string | undefined }>`
  ${({ size }) => decideDetailTextSize(size)};
  display: flex;
  text-align: left;
  color: ${getThemeColor('text-1')};
  margin-left: ${({ openDetailText }) => (openDetailText !== undefined ? '8px;' : '0;')};
`;

export const AccordionContent = styled.div`
  overflow-x: auto;
`;

const decideContentTransitionDuration = (contentHeight: number): string => {
  const pixelsPerSecond = 1000;
  const minDuration = 0.2;
  const maxDuration = 0.7;
  const transitionDuration = contentHeight / pixelsPerSecond;
  return `${Math.max(minDuration, Math.min(transitionDuration, maxDuration))}s`;
};

export const AccordionHeightAnimator = styled.div<{
  contentHeight: number;
  isOpen: boolean;
  isOverflow: boolean;
}>`
  overflow: hidden;
  opacity: ${({ isOpen, isOverflow }) => (isOpen || isOverflow ? 1 : 0)};
  transition: ${({ contentHeight }) =>
    `all ${decideContentTransitionDuration(contentHeight)} cubic-bezier(0.71, 0, 0.31, 1)`};
  transition-property: height, opacity;
`;
