import styled, { css } from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss, TypographyName } from '@elvia/elvis-typography';
interface StepperContainerProps {
  type: string;
}
export const StepperContainer = styled.div<StepperContainerProps>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: ${({ type }) => (type === 'vertical' ? '4px' : 'initial')};
`;

interface StepsProps {
  type: string;
}
export const Steps = styled.div<StepsProps>`
  display: flex;
  flex-direction: ${({ type }) => (type === 'vertical' ? 'column' : 'row')};
  gap: 4px;
  align-items: ${({ type }) => (type === 'vertical' ? 'start' : 'center')};
`;

interface StepProps {
  type: string;
  isActive?: boolean;
}
export const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: ${({ type }) => (type === 'vertical' ? 'column' : 'row')};
  align-items: ${({ type }) => (type === 'vertical' ? 'start' : 'center')};
  gap: 4px;
`;

interface StepLineProps {
  type: string;
  isSelected?: boolean;
  isActive?: boolean;
}

export const StepLine = styled.div<StepLineProps>`
  display: grid;
  width: 58px;
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
    `}
`;

export const StepHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

interface StepNumberProps {
  isError?: boolean;
  isCompleted?: boolean;
  isActive: boolean;
  isDisabled?: boolean;
}

export const StepNumber = styled.div<StepNumberProps>`
  ${getTypographyCss('title-xs')}
  display: grid;
  width: 32px;
  height: 32px;
  border: 2px solid
    ${({ isActive, isError, isDisabled }) =>
      getThemeColor(
        isActive
          ? 'border-selected-1'
          : isError
          ? 'signal-error'
          : isDisabled
          ? 'border-disabled-1'
          : 'icon-stroke',
      )};
  border-radius: 50%;
  color: ${({ isDisabled }) => getThemeColor(isDisabled ? 'text-disabled-1' : 'text-1')};
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
        background-color: white;
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
        background-color: white;
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
      @media (hover: hover), all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        @content;
      }
      &:hover {
        border-color: ${getThemeColor('border-disabled-1')};
        cursor: not-allowed;
      }
    `}
`;

interface StepperContentProps {
  type: string;
}
export const StepperContent = styled.div<StepperContentProps>`
  display: block;
  justify-content: start;
  ${({ type }) =>
    type === 'vertical' &&
    css`
      padding: 28px 30px;
    `}
`;

export const StepperContentWrapper = styled.div`
  display: flex;
  margin: 0 15px;
`;

interface StepperTitleProps {
  type: string;
  isActive?: boolean;
  typography?: TypographyName;
}
export const StepperTitle = styled.div<StepperTitleProps>`
  ${({ typography }) => (typography ? getTypographyCss(typography) : getTypographyCss('title-sm'))}
  display: flex;
  justify-content: center;
  margin: 32px 0;
  cursor: pointer;
  ${({ type, isActive, typography }) =>
    type === 'vertical' &&
    css`
      ${isActive && typography
        ? getTypographyCss(typography)
        : isActive
        ? getTypographyCss('title-sm')
        : getTypographyCss('text-md')}
      margin: 0 0;
    `}
`;

export const StepperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;
