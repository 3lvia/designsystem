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

  &:disabled {
    cursor: default;
  }

  &:not(:disabled) {
    cursor: pointer;

    &::selection {
      background-color: ${getThemeColor('state-on')};
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
  height: ${({ size }) => getButtonHeight(size)};
  border: 1px solid
    ${({ isActive }) => (isActive ? getThemeColor('state-on') : getThemeColor('text-primary'))};
  padding: ${({ size }) => getButtonPadding(size)};
  background-color: ${({ isActive }) =>
    isActive ? getThemeColor('state-on') : getThemeColor('text-primary')};
  color: ${({ isActive }) => (isActive ? getThemeColor('text-primary') : getThemeColor('state-on'))};
  transition: transform 100ms;
  border-radius: 99px;

  &:not(:disabled) {
    &:hover {
      background-color: ${getThemeColor('state-hover-green')};
      border-color: ${getThemeColor('state-hover-green')};
      color: ${getThemeColor('text-primary')};
    }

    &:active {
      border-color: transparent;
      background-clip: padding-box;
    }
  }

  &:disabled {
    border-color: ${getThemeColor('state-disabled')};
    background-color: ${getThemeColor('state-disabled')};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${({ isActive }) => (isActive ? getThemeColor('state-on') : 'transparent')};
  color: ${getThemeColor('text-primary')};

  &:disabled {
    background-color: transparent;
    border-color: ${getThemeColor('state-disabled')};
    color: ${getThemeColor('state-disabled')};
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
    background-color: ${({ isActive }) => (isActive ? getThemeColor('state-on') : 'transparent')};
    transform: scaleY(1);
    transform-origin: center bottom;
    transition: background-color 60ms, transform 100ms;
  }

  &:not(:disabled) {
    &:hover:after {
      background-color: ${getThemeColor('state-hover-green')};
    }

    &:active:after {
      transform: scaleY(0.5);
    }
  }

  &:disabled {
    color: ${getThemeColor('state-disabled')};
  }
`;
