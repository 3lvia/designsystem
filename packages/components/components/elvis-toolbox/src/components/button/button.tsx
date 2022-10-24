import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

type Size = 'sm' | 'md' | 'lg';
interface ButtonProps {
  isActive: boolean;
  size: Size;
}

const getTypography = (size: Size) => {
  if (size === 'sm') {
    return css`
      ${getTypographyCss('text-sm')};
      line-height: 1.15;
    `;
  } else if (size === 'md') {
    return css`
      ${getTypographyCss('text-md')};
      line-height: 1.25;
    `;
  } else {
    return css`
      ${getTypographyCss('text-lg')};
      font-size: 1.125rem;
      line-height: 1;
    `;
  }
};

const ButtonBase = styled.button.attrs(() => ({ type: 'button' }))<Partial<ButtonProps>>`
  ${(props) => getTypography(props.size ?? 'md')};
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
      background-color: ${getColor('elvia-charge')};
    }
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  height: ${(props) => (props.size === 'lg' ? '3rem' : props.size === 'md' ? '2.5rem' : '2rem')};
  border: 1px solid ${(props) => (props.isActive ? getColor('elvia-charge') : getColor('elvia-off'))};
  padding: ${(props) =>
    props.size === 'lg'
      ? '0 calc(2rem - 1px)'
      : props.size === 'md'
      ? '0 calc(1.5rem - 1px)'
      : '0 calc(1rem - 1px)'};
  background-color: ${(props) => (props.isActive ? getColor('elvia-charge') : getColor('elvia-off'))};
  color: ${(props) => (props.isActive ? getColor('elvia-off') : getColor('elvia-on'))};
  transition: transform 100ms;
  border-radius: 99px;

  &:not(:disabled) {
    &:hover {
      background-color: ${getColor('elvia-charge')};
      border-color: ${getColor('elvia-charge')};
      color: ${getColor('elvia-off')};
    }

    &:active {
      border-color: transparent;
      background-clip: padding-box;
    }
  }

  &:disabled {
    border-color: ${getColor('disabled')};
    background-color: ${getColor('disabled')};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${(props) => (props.isActive ? getColor('elvia-charge') : 'transparent')};
  color: ${getColor('elvia-off')};

  &:disabled {
    background-color: transparent;
    border-color: ${getColor('disabled')};
    color: ${getColor('disabled')};
  }
`;

export const TertiaryButton = styled(ButtonBase)`
  border: none;
  background: transparent;
  position: relative;
  padding: 0;
  height: ${(props) => (props.size === 'sm' ? '1.5rem' : '2rem')};

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) => (props.isActive ? getColor('elvia-charge') : 'transparent')};
    transform: scaleY(1);
    transform-origin: center bottom;
    transition: background-color 60ms, transform 100ms;
  }

  &:not(:disabled) {
    &:hover:after {
      background-color: ${getColor('elvia-charge')};
    }

    &:active:after {
      transform: scaleY(0.5);
    }
  }

  &:disabled {
    color: ${getColor('disabled')};
  }
`;
