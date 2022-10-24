import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled from 'styled-components';

interface ButtonProps {
  isActive: boolean;
}

export const TertiaryButton = styled.button<Partial<ButtonProps>>`
  ${getTypographyCss('text-sm')};
  font-weight: 500;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  margin: 0;
  padding: 0;
  line-height: 1.3;
  cursor: default;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) => (props.isActive ? getColor('elvia-charge') : 'transparent')};
    transform: scaleY(1);
    transform-origin: center bottom;
    transition: background-color 60ms, transform 100ms;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover:after {
      background-color: ${getColor('green')};
    }
  }

  &:active:after {
    transform: scaleY(0.5);
  }

  &:disabled {
    color: ${getColor('disabled')};
  }
`;
