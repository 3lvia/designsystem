import styled from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  elviaGreen: getColor('green'),
  grey05: getColor('grey-05'),
  grey10: getColor('grey-10'),
  grey30: getColor('grey-30'),
};

const typography = {
  textLabel: getTypographyCss('text-label'),
  textInput: getTypographyCss('text-md'),
};

export const TimePickerContainer = styled.div`
  text-align: left;
  box-sizing: border-box;
`;

export const TimePickerLabel = styled.label`
  display: inline-block;
`;

export const LabelText = styled.div`
  ${typography.textLabel}
  margin-bottom: 5px;
`;

interface InputContainerProps {
  disabled: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  display: inline-flex;
  gap: 8px;
  padding: 4px 8px 4px 16px;
  border: 1px solid ${colors.elviaBlack};
  border-radius: 4px;
  cursor: text;

  ${(props) =>
    props.disabled
      ? `
    cursor: not-allowed;
    border-color: ${colors.grey30};
  `
      : `
  &:hover,
  &:focus-within {
    border: 2px solid ${colors.elviaGreen};
    padding: 3px 7px 3px 15px;
  }
  `}
`;

export const Input = styled.input`
  ${typography.textInput}
  width: 46px;
  min-width: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: inherit;
`;

interface IconButtonProps {
  size?: 'medium' | 'small';
  active?: boolean;
}

export const IconButton = styled.button<IconButtonProps>`
  width: ${(props) => (props.size === 'medium' ? '40px' : '32px')};
  height: ${(props) => (props.size === 'medium' ? '40px' : '32px')};
  border: none;
  background: ${(props) => (props.active ? colors.elviaGreen : 'transparent')};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not([disabled]):hover {
    background-color: ${colors.elviaGreen};
  }

  &[disabled] {
    cursor: inherit;
  }
`;
