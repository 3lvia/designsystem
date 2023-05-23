import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export type Size = 'sm' | 'md' | 'lg';
export interface ButtonProps {
  isActive: boolean;
  size: Size;
}

const getTypography = (size: Size) => {
  switch (size) {
    case 'sm': {
      return css`
        ${getTypographyCss('text-sm')};
        line-height: 1.15;
      `;
    }
    case 'md': {
      return css`
        ${getTypographyCss('text-md')};
        line-height: 1.25;
      `;
    }
    default: {
      return css`
        ${getTypographyCss('text-lg')};
        font-size: 1.125rem;
        line-height: 1;
      `;
    }
  }
};

const ButtonBase = styled.button.attrs(() => ({ type: 'button' }))<Partial<ButtonProps>>`
  ${({ size }) => getTypography(size ?? 'md')};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  white-space: nowrap;

  &:disabled {
    cursor: default;
  }

  &:not(:disabled) {
    cursor: pointer;

    &::selection {
      background-color: ${getThemeColor('background-selected-1')};
    }
  }
`;

const getButtonHeight = (size?: Size) => {
  switch (size) {
    case 'lg': {
      return '48px';
    }
    case 'md': {
      return '40px';
    }
    default: {
      return '32px';
    }
  }
};

const getButtonPadding = (size?: Size) => {
  switch (size) {
    case 'lg': {
      return '0 calc(32px - 1px)';
    }
    case 'md': {
      return '0 calc(24px - 1px)';
    }
    default: {
      return '0 calc(16px - 1px)';
    }
  }
};

export const PrimaryButton = styled(ButtonBase)`
  height: ${({ size }) => getButtonHeight(size ?? 'md')};
  border: 1px solid
    ${({ isActive }) => (isActive ? getThemeColor('border-selected-1') : getThemeColor('text-1'))};
  padding: ${({ size }) => getButtonPadding(size ?? 'md')};
  background-color: ${({ isActive }) =>
    isActive ? getThemeColor('background-selected-1') : getThemeColor('text-1')};
  color: ${({ isActive }) => (isActive ? getThemeColor('text-1') : getThemeColor('static-white'))};
  transition: transform 100ms;
  border-radius: 99px;

  &:not(:disabled) {
    &:hover {
      background-color: ${getThemeColor('background-hover-1')};
      border-color: ${getThemeColor('border-hover-1')};
      color: ${getThemeColor('text-1')};
    }

    &:active {
      border-color: transparent;
      background-clip: padding-box;
    }
  }

  &:disabled {
    border-color: ${getThemeColor('border-disabled-1')};
    background-color: ${getThemeColor('background-disabled-1')};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${({ isActive }) => (isActive ? getThemeColor('background-selected-1') : 'transparent')};
  color: ${getThemeColor('text-1')};

  &:disabled {
    background-color: transparent;
    border-color: ${getThemeColor('border-disabled-1')};
    color: ${getThemeColor('text-disabled-1')};
  }
`;

export const TertiaryButton = styled(ButtonBase)`
  border: none;
  background: transparent;
  position: relative;
  padding: 0;
  height: ${({ size }) => (size === 'sm' ? '1.5rem' : '2rem')};

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ isActive }) =>
      isActive ? getThemeColor('background-selected-1') : 'transparent'};
    transform: scaleY(1);
    transform-origin: center bottom;
    transition: background-color 60ms, transform 100ms;
  }

  &:not(:disabled) {
    &:hover:after {
      background-color: ${getThemeColor('background-hover-1')};
    }

    &:active:after {
      transform: scaleY(0.5);
    }
  }

  &:disabled {
    color: ${getThemeColor('background-disabled-1')};
  }
`;
