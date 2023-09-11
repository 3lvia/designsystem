import { getThemeColor, getThemeColorContrast } from '@elvia/elvis-colors';
import styled, { css } from 'styled-components';

export type Size = 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'large';
export interface ButtonProps {
  $isActive: boolean;
  $size: Size;
}

const getTypography = (size: Size) => {
  switch (size) {
    case 'small':
    case 'sm': {
      return css`
        font-family: 'Red Hat Display', Verdana, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 115%;
      `;
    }
    case 'medium':
    case 'md': {
      return css`
        font-family: 'Red Hat Display', Verdana, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 125%;
      `;
    }
    default: {
      return css`
        font-family: 'Red Hat Display', Verdana, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
      `;
    }
  }
};

const ButtonBase = styled.button.attrs({ type: 'button' })<Partial<ButtonProps>>`
  ${({ $size }) => getTypography($size ?? 'md')};
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
    case 'large':
    case 'lg': {
      return '48px';
    }
    case 'medium':
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
    case 'large':
    case 'lg': {
      return '0 calc(32px - 1px)';
    }
    case 'medium':
    case 'md': {
      return '0 calc(24px - 1px)';
    }
    default: {
      return '0 calc(16px - 1px)';
    }
  }
};

export const PrimaryButton = styled(ButtonBase)`
  height: ${({ $size }) => getButtonHeight($size ?? 'md')};
  border: 1px solid
    ${({ $isActive }) => ($isActive ? getThemeColor('border-selected-1') : getThemeColor('text-1'))};
  padding: ${({ $size }) => getButtonPadding($size ?? 'md')};
  background-color: ${({ $isActive }) =>
    $isActive ? getThemeColor('background-selected-1') : getThemeColor('text-1')};
  color: ${({ $isActive }) => ($isActive ? getThemeColor('text-1') : getThemeColorContrast('text-1'))};
  transition: transform 100ms;
  border-radius: 99px;

  &:not(:disabled) {
    &:hover {
      background-color: ${getThemeColor('background-hover-1')};
      border-color: ${getThemeColor('border-hover-1')};
      color: ${getThemeColorContrast('background-hover-1')};
    }

    &:active {
      border-color: transparent;
      background-clip: padding-box;
    }
  }

  &:disabled {
    border-color: transparent;
    background-color: ${getThemeColor('background-disabled-2')};
    cursor: not-allowed;
    color: ${getThemeColor('text-disabled-2')};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${({ $isActive }) =>
    $isActive ? getThemeColor('background-selected-1') : 'transparent'};
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
  height: ${({ $size }) => ($size === 'sm' || $size === 'small' ? '1.5rem' : '2rem')};
  color: ${getThemeColor('text-1')};

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ $isActive }) =>
      $isActive ? getThemeColor('background-selected-1') : 'transparent'};
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
