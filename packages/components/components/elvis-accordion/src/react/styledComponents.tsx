import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { AccordionLabelPosition, AccordionSize, AccordionType } from './elvia-accordion.types';

const colors = {
  elviaBlack: getColor('black'),
};

export const AccordionArea = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
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
  width: 100%;
  margin-top: ${(props: { type: string }) => (props.type !== 'overflow' ? '0' : '16px')};
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
  openDetailText: string;
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
  font-weight: ${(props: { hasBoldLabel: boolean; openDetailText: string }) =>
    props.hasBoldLabel || props.openDetailText !== undefined ? '700' : '500'};
  font-size: ${(props: { size: AccordionSize }) => decideButtonFontSize(props.size)};
  line-height: ${(props: { size: AccordionSize }) => (props.size === 'small' ? '16px' : '24px')};
  text-align: left;
  cursor: pointer;
  color: ${colors.elviaBlack};
  width: 100%;
  justify-content: ${(props: { isFullWidth: boolean }) => (props.isFullWidth ? 'space-between' : 'inherit')};

  i {
    margin-left: ${(props: { openLabel: string; closeLabel: string }) => {
      if (props.openLabel !== '' || props.closeLabel !== '') {
        return '8px;';
      }
      return '0px;';
    }};
    transition: transform 300ms;
    transform: ${(props: { isContentOpen: boolean }) =>
      (props.isContentOpen && ' rotate(180deg)') || (props.isContentOpen === false && ' rotate(0deg)')};
  }
`;

// type AccordionDetailTextProps = {

// };
export const AccordionDetailText = styled.span`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
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
};

export const AccordionContent = styled.div<AccordionContentProps>`
  display: block;
  background: transparent;
  width: 100%;
  font-size: 16px;
  line-height: inherit;
  margin-top: ${(props: { isContentOpen: boolean; type: AccordionType; size: AccordionSize }) =>
    decideContentMarginTop(props.isContentOpen, props.type, props.size)};
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
