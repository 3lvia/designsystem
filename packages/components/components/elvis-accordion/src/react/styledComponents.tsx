import styled, { css } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import {
  AccordionLabelPosition,
  AccordionSize,
  AccordionSpacingContent,
  AccordionType,
} from './elvia-accordion.types';
import { getTypographyCss, TypographyName } from '@elvia/elvis-typography';

const bezierCurve = 'cubic-bezier(0.71, 0, 0.31, 1)';

const colors = {
  elviaBlack: getColor('black'),
};

const typography = {
  textMd: getTypographyCss('text-md'),
  textSm: getTypographyCss('text-sm'),
  textMicro: getTypographyCss('text-micro'),
};

export const AccordionWrapper = styled.div`
  display: flex;
  width: 100%;
`;

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
  justify-content: ${(props) => decideLabelPosition(props.labelPosition)};
  flex-direction: row;
  width: 100%;
`;

const decideButtonFontSize = (prop: AccordionSize) => {
  if (prop === 'small') {
    return '14px';
  }
  if (prop === 'medium') {
    return '16px';
  }
  if (prop === 'large') {
    return '20px';
  }
  return '16px';
};

interface AccordionButtonProps {
  isFullWidth: boolean;
  isOpenState: boolean;
  currType: AccordionType;
  size: AccordionSize;
  hasBoldLabel: boolean;
  openDetailText: string | undefined;
  openLabel: string;
  closeLabel: string;
  typography?: TypographyName;
  onClick: any;
}

export const AccordionButton = styled.button<AccordionButtonProps>`
  border: none;
  background: transparent;
  display: flex;
  padding: 0;
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: ${(props) => (!props.hasBoldLabel && props.openDetailText === undefined ? '400' : '500')};
  font-size: ${(props) => decideButtonFontSize(props.size)};
  line-height: ${(props) => (props.size === 'small' ? '16px' : '24px')};
  ${(props) => props.typography && getTypographyCss(props.typography)}
  text-align: left;
  cursor: pointer;
  color: ${colors.elviaBlack};
  width: ${(props) => (props.isFullWidth && props.currType === 'normal' ? '100%' : 'auto')};
  justify-content: ${(props) =>
    props.isFullWidth && props.currType === 'normal' ? 'space-between' : 'inherit'};
  align-items: center;

  i {
    transform: rotate(0deg);
    transition: transform 0.2s ease-out;

    ${(props) =>
      props.isOpenState &&
      css`
        transform: rotate(180deg);
      `};
  }
`;

interface AccordionLabelProps {
  hasLabel: boolean;
  openLabel: string;
  isStartAligned: boolean | undefined;
  isFullWidth: boolean | undefined;
}

export const AccordionLabel = styled.div<AccordionLabelProps>`
  display: ${(props) => (props.openLabel && props.hasLabel ? 'flex' : 'none')};
  flex-direction: row;
  align-items: baseline;
  margin-left: ${(props) => (props.isStartAligned && !props.isFullWidth ? '8px' : '0px')};
  margin-right: ${(props) => (props.isStartAligned && !props.isFullWidth ? '0px' : '8px')};
`;

export const AccordionLabelText = styled.div`
  display: flex;
`;

const decideDetailTextSize = (size: string): string => {
  if (size === 'small') {
    return typography.textMicro;
  } else if (size === 'large') {
    return typography.textMd;
  } else {
    return typography.textSm;
  }
};

interface AccordionDetailTextProps {
  size: string;
  openDetailText: string | undefined;
}

export const AccordionDetailText = styled.div<AccordionDetailTextProps>`
  ${(props) => decideDetailTextSize(props.size)};
  display: flex;
  text-align: left;
  color: ${colors.elviaBlack};
  margin-left: ${(props) => (props.openDetailText !== undefined ? '8px;' : '0px;')};
`;

const decideContentMarginTop = (
  type: AccordionType,
  hasContent: boolean,
  spacingAboveContent: AccordionSpacingContent,
): string => {
  if (type === 'overflow' || !hasContent) {
    return '0px';
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
  if (contentOpen) {
    return '1';
  }
  if (!contentOpen && type === 'overflow') {
    return '1';
  }
  return '0';
};

const decideContentTransitionSpeed = (contentHeight: number): string => {
  const pixelsPerSecond = 1000;
  const minSpeed = 0.2;
  const maxSpeed = 0.7;
  const transitionSpeed = contentHeight / pixelsPerSecond;
  return `${Math.max(minSpeed, Math.min(transitionSpeed, maxSpeed))}s`;
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
  display: ${(props) => (props.hasContent ? 'block' : 'none')};
  background: transparent;
  font-size: 16px;
  line-height: inherit;
  margin-top: ${(props) => decideContentMarginTop(props.type, props.hasContent, props.spacingAboveContent)};
  margin-bottom: ${(props) => (props.type === 'overflow' ? props.spacingBelowContent : 0)};
  pointer-events: ${(props) => (props.isOpenState ? 'auto' : 'none')};
  max-height: ${(props) =>
    decideContentMaxHeight(props.isOpenState, props.type, props.contentHeight, props.overflowHeight)};
  width: 100%;
  opacity: ${(props) => decideContentOpacity(props.isOpenState, props.type)};
  overflow-y: hidden;
  transition: all ${(props) => decideContentTransitionSpeed(props.contentHeight)} ${bezierCurve};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`;
