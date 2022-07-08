import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { AccordionLabelPosition, AccordionSize, AccordionType } from './elvia-accordion.types';
import { getTypographyCss } from '@elvia/elvis-typography';

const colors = {
  elviaBlack: getColor('black'),
};

const typography = {
  textMd: getTypographyCss('text-md'),
  textSm: getTypographyCss('text-sm'),
  textMicro: getTypographyCss('text-micro'),
};

export const AccordionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

export type AccordionButtonAreaProps = {
  labelPosition: AccordionLabelPosition;
  type: AccordionType;
};

export const AccordionButtonArea = styled.div<AccordionButtonAreaProps>`
  display: inline-flex;
  justify-content: ${(props: { labelPosition: AccordionLabelPosition }) =>
    decideLabelPosition(props.labelPosition)};
  flex-direction: row;
  margin-top: ${(props: { type: string }) => (props.type !== 'overflow' ? '0' : '16px')};
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

type AccordionButtonProps = {
  size: AccordionSize;
  isFullWidth: boolean;
  isContentOpen: boolean;
  hasBoldLabel: boolean;
  openDetailText: string | undefined;
  openLabel: string;
  closeLabel: string;
  onClick: any;
};

export const AccordionButton = styled.button<AccordionButtonProps>`
  border: none;
  background: transparent;
  display: flex;
  padding: 0;
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: ${(props: { hasBoldLabel: boolean; openDetailText: string | undefined }) =>
    !props.hasBoldLabel && props.openDetailText === undefined ? '400' : '500'};
  font-size: ${(props: { size: AccordionSize }) => decideButtonFontSize(props.size)};
  line-height: ${(props: { size: AccordionSize }) => (props.size === 'small' ? '16px' : '24px')};
  text-align: left;
  cursor: pointer;
  color: ${colors.elviaBlack};
  width: ${(props: { isFullWidth: boolean }) => (props.isFullWidth ? '100%' : 'auto')};
  justify-content: ${(props: { isFullWidth: boolean }) => (props.isFullWidth ? 'space-between' : 'inherit')};
  align-items: center;

  i {
    transition: transform 300ms;
    transform: ${(props: { isContentOpen: boolean }) =>
      (props.isContentOpen && ' rotate(180deg)') || (props.isContentOpen === false && ' rotate(0deg)')};
  }
`;

type AccordionLabelProps = {
  openLabel: string;
  isStartAligned: boolean | undefined;
  isFullWidth: boolean | undefined;
};

export const AccordionLabel = styled.div<AccordionLabelProps>`
  display: ${(props: { openLabel: string }) => (props.openLabel ? 'flex' : 'none')};
  flex-direction: row;
  align-items: baseline;
  margin-left: ${(props: { isStartAligned: boolean | undefined; isFullWidth: boolean | undefined }) =>
    props.isStartAligned && !props.isFullWidth ? '8px' : '0px'};
  margin-right: ${(props: { isStartAligned: boolean | undefined; isFullWidth: boolean | undefined }) =>
    props.isStartAligned && !props.isFullWidth ? '0px' : '8px'};
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

type AccordionDetailTextProps = {
  size: string;
};

export const AccordionDetailText = styled.div<AccordionDetailTextProps>`
  ${(props: { size: string }) => decideDetailTextSize(props.size)};
  display: flex;
  text-align: left;
  color: ${colors.elviaBlack};
  margin-left: 8px;
`;

const decideContentMarginTop = (contentOpen: boolean, type: AccordionType, size: AccordionSize): string => {
  if (type === 'overflow') {
    return '0px';
  }
  if (contentOpen) {
    if (size === 'large') {
      return '24px';
    } else {
      return '16px';
    }
  }
  return '0';
};

const decideContentMaxHeight = (
  contentOpen: boolean,
  type: AccordionType,
  overflowHeight?: number,
): string => {
  if (type === 'normal') {
    if (contentOpen) {
      return '10000px';
    } else {
      return '0px';
    }
  }
  if (type === 'overflow') {
    if (contentOpen) {
      return '10000px';
    } else {
      return overflowHeight ? `${overflowHeight}px` : 'calc(2em * 1.2)';
    }
  }

  return 'none';
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
const decideContentOverflowY = (contentOpen: boolean, type: AccordionType): string => {
  if (contentOpen && type === 'overflow') {
    return 'hidden';
  }
  return 'auto';
};
const decideContentTransition = (contentOpen: boolean, type: AccordionType): string => {
  if (type === 'overflow') {
    if (contentOpen) {
      return 'max-height 2s ease-in';
    } else {
      return 'none';
    }
  }
  return 'all 0.3s ease-out';
};

type AccordionContentProps = {
  isContentOpen: boolean;
  type: AccordionType;
  size: AccordionSize;
  overflowHeight?: number;
  hasContent?: boolean;
};

export const AccordionContent = styled.div<AccordionContentProps>`
  display: block;
  background: transparent;
  font-size: 16px;
  line-height: inherit;
  margin-top: ${(props: {
    isContentOpen: boolean;
    type: AccordionType;
    size: AccordionSize;
    hasContent?: boolean;
  }) => decideContentMarginTop(props.isContentOpen, props.type, props.size)};
  pointer-events: ${(props: { isContentOpen: boolean }) => (props.isContentOpen ? 'auto' : 'none')};
  height: auto;
  max-height: ${(props: { isContentOpen: boolean; type: AccordionType; overflowHeight?: number }) =>
    decideContentMaxHeight(props.isContentOpen, props.type, props.overflowHeight)};
  opacity: ${(props: { isContentOpen: boolean; type: AccordionType }) =>
    decideContentOpacity(props.isContentOpen, props.type)};
  overflow-y: ${(props: { isContentOpen: boolean; type: AccordionType }) =>
    decideContentOverflowY(props.isContentOpen, props.type)};
  transition: ${(props: { isContentOpen: boolean; type: AccordionType }) =>
    decideContentTransition(props.isContentOpen, props.type)};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
