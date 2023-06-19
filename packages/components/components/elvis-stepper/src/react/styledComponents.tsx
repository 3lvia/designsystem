import styled, { css } from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss, TypographyName } from '@elvia/elvis-typography';
import { StepperType } from './elvia-stepper.types';
interface StepperContainerProps {
  type?: StepperType;
}
export const StepperContainer = styled.div<StepperContainerProps>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: ${({ type }) => (type === 'vertical' ? '4px' : 'initial')};
  width: 100%;
  max-width: 400px;
`;

export const StatusMessage = styled.div`
  position: absolute !important;
  overflow: hidden !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  border: 0 !important;
  margin: -1px !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
`;

interface StepsProps {
  type?: StepperType;
}
export const Steps = styled.ul<StepsProps>`
  display: flex;
  flex-direction: ${({ type }) => (type === 'vertical' ? 'column' : 'row')};
  gap: 4px;
  align-items: ${({ type }) => (type === 'vertical' ? 'start' : 'center')};
  justify-content: center;
  padding: unset;
`;

interface StepProps {
  type: StepperType;
  isActive?: boolean;
  isLast: boolean;
}
export const Step = styled.li<StepProps>`
  display: flex;
  flex-direction: ${({ type }) => (type === 'vertical' ? 'column' : 'row')};
  align-items: ${({ type }) => (type === 'vertical' ? 'start' : 'center')};
  gap: 4px;
  flex: ${({ isLast }) => (isLast ? 0 : 1)};
  width: 100%;
`;

interface StepLineProps {
  type?: StepperType;
  isSelected: boolean;
  isActive?: boolean;
}

export const StepLine = styled.div<StepLineProps>`
  display: grid;
  flex: 1;
  height: 2px;
  border-radius: 50px;
  margin: 0;
  background-color: ${({ isSelected }) =>
    getThemeColor(isSelected ? 'border-selected-2' : 'border-disabled-1')};
  place-items: center;

  ${({ type, isActive }) =>
    type === 'vertical' &&
    css`
      height: ${isActive ? 'auto' : '12px'};
      width: 2px;
      flex: none;
    `}
`;
interface StepLineDashedProps {
  type?: StepperType;
}
export const StepLineDashed = styled.div<StepLineDashedProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  flex: 1;

  ${({ type }) =>
    type === 'vertical' &&
    css`
      height: 30px;
      width: unset;
      flex-direction: column;
      align-items: flex-start;
    `}
`;

export const LineDash = styled.div<StepLineDashedProps>`
  display: inline;
  flex: 1;
  height: 2px;
  margin: 0;
  border-radius: 50px;
  background: ${getThemeColor('border-disabled-1')};

  ${({ type }) =>
    type === 'vertical' &&
    css`
      display: flex;
      width: 2px;
      height: unset;
    `}
`;

export const StepHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

interface StepNumberProps {
  isActive: boolean;
  isError?: boolean;
  isCompleted?: boolean;
  isDisabled?: boolean;
}

const getStepNumberBorderColor = ({ isActive, isError, isDisabled }: StepNumberProps) => {
  if (isActive) {
    return getThemeColor('border-selected-1');
  } else if (isError) {
    return getThemeColor('signal-error');
  } else if (isDisabled) {
    return getThemeColor('border-disabled-1');
  } else {
    return getThemeColor('icon-stroke');
  }
};

export const StepNumber = styled.button<StepNumberProps>`
  ${getTypographyCss('title-xs')}
  display: grid;
  width: 32px;
  height: 32px;
  border: 2px solid ${(props) => getStepNumberBorderColor(props)};
  border-radius: 100%;
  background-color: transparent;
  color: ${({ isDisabled }) => getThemeColor(isDisabled ? 'text-disabled-1' : 'text-1')};
  padding: 0;
  ${({ isCompleted }) =>
    isCompleted &&
    css`
      background-color: ${getThemeColor('icon-filled-background')};
      position: relative;
      color: transparent;
      &::before {
        position: absolute;
        top: 12px;
        left: 2px;
        width: 2px;
        height: 8px;
        border-radius: 15px;
        content: '';
        background-color: ${getThemeColor('icon-filled-foreground')};
        transform: translateX(10px) rotate(-43deg);
        transform-origin: left bottom;
      }

      &::after {
        position: absolute;
        top: 4px;
        left: 1px;
        width: 2px;
        height: 15px;
        border-radius: 15px;
        content: '';
        background-color: ${getThemeColor('icon-filled-foreground')};
        transform: translateX(10px) rotate(43deg);
        transform-origin: left bottom;
      }
    `}
  cursor: pointer;
  place-items: center;
  user-select: none;

  &:hover {
    border-color: ${getThemeColor('border-hover-1')};
  }
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      &:hover {
        border-color: ${getThemeColor('border-disabled-1')};
        cursor: not-allowed;
      }
    `}
`;

interface StepperContentProps {
  type: StepperType;
}
export const StepperContent = styled.div<StepperContentProps>`
  display: block;
  justify-content: start;
  flex: 1;
  ${({ type }) =>
    type === 'vertical' &&
    css`
      padding: 32px 0 48px 32px;
    `}
`;

export const StepperContentWrapper = styled.div`
  display: flex;
  margin: 0 15px;
  width: 100%;
`;

const getStepTitleTypography = ({ type, isActive, typography }: StepperTitleProps) => {
  if (isActive || type !== 'vertical') {
    return getTypographyCss(typography ?? 'title-sm');
  } else {
    return getTypographyCss('text-md');
  }
};

interface StepperTitleProps {
  type: StepperType;
  isActive?: boolean;
  typography?: TypographyName;
  isDisabled?: boolean;
}
export const StepperTitle = styled.div<StepperTitleProps>`
  ${(props) => getStepTitleTypography(props)}
  display: flex;
  justify-content: center;
  margin: 32px 0;
  ${({ type }) =>
    type === 'vertical' &&
    css`
      margin: 0;
      cursor: pointer;
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      @media (hover: hover), all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        @content;
      }
      &:hover {
        cursor: not-allowed;
      }
    `}
`;

export const StepperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  gap: 8px;
`;
