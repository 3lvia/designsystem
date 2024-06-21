import { getThemeColor, getThemeColorContrast } from '@elvia/elvis-colors';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

export type Size = 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'large';
export interface ButtonProps {
  isActive: boolean;
  size: Size;
  isLoading?: boolean;
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

const loadingAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
`;

const ButtonBaseStyle = styled.button<Partial<ButtonProps>>`
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

  ${({ isLoading }) =>
    isLoading
      ? css`
          display: inline-block;
          cursor: progress;

          span {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 100%;
            animation: ${loadingAnimation} 1s infinite ease-in-out both;
          }

          span:nth-of-type(1) {
            animation-delay: -0.32s;
          }

          span:nth-of-type(2) {
            animation-delay: -0.16s;
          }
        `
      : css`
          &:not(:disabled) {
            cursor: pointer;

            &::selection {
              background-color: ${getThemeColor('background-selected-1')};
            }
          }
        `}
`;

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => (
    <ButtonBaseStyle ref={ref} type="button" {...props}>
      {children}
    </ButtonBaseStyle>
  ),
);

ButtonBase.displayName = 'ButtonBase';

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
  height: ${({ size }) => getButtonHeight(size ?? 'md')};
  border: 1px solid
    ${({ isActive }) => (isActive ? getThemeColor('border-selected-1') : getThemeColor('text-1'))};
  padding: ${({ size }) => getButtonPadding(size ?? 'md')};
  background-color: ${({ isActive }) =>
    isActive ? getThemeColor('background-selected-1') : getThemeColor('text-1')};
  color: ${({ isActive }) => (isActive ? getThemeColor('text-1') : getThemeColorContrast('text-1'))};
  transition: transform 100ms;
  border-radius: 99px;

  ${({ isLoading }) =>
    isLoading
      ? css`
          span {
            background-color: var(--e-color-text-4);
          }
        `
      : css`
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
        `}

  &:disabled {
    border-color: transparent;
    background-color: ${getThemeColor('background-disabled-2')};
    cursor: not-allowed;
    color: ${getThemeColor('text-disabled-2')};
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

  ${({ isLoading }) =>
    isLoading &&
    css`
      span {
        background-color: var(--e-color-text-1);
      }
    `}
`;

export const TertiaryButton = styled(ButtonBase)`
  border: none;
  background: transparent;
  position: relative;
  padding: 0;
  height: ${({ size }) => (size === 'sm' || size === 'small' ? '1.5rem' : '2rem')};
  color: ${getThemeColor('text-1')};

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
    transition:
      background-color 60ms,
      transform 100ms;
  }

  ${({ isLoading }) =>
    isLoading
      ? css`
          span {
            background-color: var(--e-color-text-1);
          }
        `
      : css`
          &:not(:disabled) {
            &:hover:after {
              background-color: ${getThemeColor('background-hover-1')};
            }

            &:active:after {
              transform: scaleY(0.5);
            }
          }
        `}

  &:disabled {
    color: ${getThemeColor('background-disabled-1')};
  }
`;
