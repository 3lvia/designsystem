import styled from 'styled-components';
import { getTypographyCss } from '@elvia/elvis-typography';

import { listButtonHeight } from './buttonHeight';
import { getShadow, getThemeColor } from '@elvia/elvis-colors';

const typography = {
  numberPickerTitle: getTypographyCss('text-sm'),
  numberButton: getTypographyCss('text-md'),
};

export const OverlayContainer = styled.div<{ $hasSecondPicker: boolean }>`
  background-color: ${getThemeColor('background-overlay-1')};
  border-radius: 4px;
  box-shadow: ${getShadow('medium')};
  display: flex;
  width: ${({ $hasSecondPicker }) => ($hasSecondPicker ? '180px' : '120px')};
`;

export const NumberPickerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NumberPickerTitle = styled.h4`
  ${typography.numberPickerTitle}
  margin: 0;
  height: 40px;
  display: flex;
  align-items: center;
`;

export const HorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid ${getThemeColor('border-2')};
  border-width: 0 0 1px 0;
  margin: 0;
`;

export const NumberList = styled.div`
  overflow: auto;
  height: ${listButtonHeight * 5}px;
  width: 100%;
  scroll-snap-type: y mandatory;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${listButtonHeight}px;
  position: sticky;
  background: ${getThemeColor('background-overlay-1')};
  border-radius: 4px;

  &:first-of-type {
    top: 0;
  }

  &:last-of-type {
    bottom: 0;
  }
`;

interface NumberButtonProps {
  $isSelected: boolean;
}

export const NumberButton = styled.button<NumberButtonProps>`
  ${typography.numberButton}
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  height: 48px;
  background: ${({ $isSelected }) => ($isSelected ? getThemeColor('background-selected-2') : 'transparent')};
  scroll-snap-align: center;
  cursor: pointer;

  &:hover {
    background: ${getThemeColor('background-hover-2')};
  }
`;
