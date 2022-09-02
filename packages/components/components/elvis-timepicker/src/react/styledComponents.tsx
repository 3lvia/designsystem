import styled from 'styled-components';

import { getColor } from '@elvia/elvis-colors';

export const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  elviaGreen: getColor('green'),
  grey05: getColor('grey-05'),
  grey10: getColor('grey-10'),
};

export const TimePickerContainer = styled.div`
  text-align: left;
  box-sizing: border-box;
  font-family: Red Hat Text, Verdana, sans-serif;
  font-size: 16px;
  line-height: 22px;
`;

export const TimePickerLabel = styled.label`
  display: inline-block;
`;

export const LabelText = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
  font-style: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  font-family: inherit;
  line-height: inherit;
  color: ${colors.elviaBlack};
`;

export const InputContainer = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 4px 8px 4px 16px;
  border: 1px solid ${colors.elviaBlack};
  border-radius: 4px;
  cursor: text;

  &:hover,
  &:focus-within {
    border: 2px solid ${colors.elviaGreen};
    padding: 3px 7px 3px 15px;
  }
`;

export const Input = styled.input`
  width: 46px;
  min-width: 0;
  padding: 0;
  border: none;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: 400;
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
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colors.elviaGreen};
  }
`;
