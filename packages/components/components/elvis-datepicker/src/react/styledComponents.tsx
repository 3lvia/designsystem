import styled, { css } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  elviaGreen: getColor('green'),
  grey05: getColor('grey-05'),
  grey10: getColor('grey-10'),
  disabled: getColor('disabled'),
  error: getColor('error'),
};

const typography = {
  textLabel: getTypographyCss('text-label'),
  textInput: getTypographyCss('text-md'),
};

interface BaseProps {
  isCompact: boolean;
}

interface DatePickerLabelProps extends BaseProps {
  fullWidth: boolean;
}

export const DatePickerLabel = styled.label<DatePickerLabelProps>`
  display: inline-block;
  position: relative;
  padding-top: ${(props) => (props.isCompact ? '8px' : '0px')};
  padding-bottom: 24px;
  box-sizing: border-box;
  text-align: left;

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;

      ${Input}, ${InputContainer} {
        width: 100%;
      }
    `}
`;

interface LabelProps extends BaseProps {
  hasOptionalText?: boolean;
}

export const LabelText = styled.div<LabelProps>`
  ${typography.textLabel}
  margin-bottom: 5px;

  ${(props) => {
    if (props.isCompact) {
      return css`
        font-size: 0.625rem;
        background-color: ${colors.elviaWhite};
        position: absolute;
        margin-left: 7px;
        top: 0;
        padding: 0 3px;
        z-index: 1;
        line-height: 100%;
      `;
    }
    return '';
  }}

  ${(props) =>
    props.hasOptionalText &&
    css`
      &::after {
        content: ' (valgfri)';
        font-weight: 400;
      }
    `}
`;

interface InputContainerProps extends BaseProps {
  disabled: boolean;
  isActive: boolean;
  isInvalid: boolean;
}

const setActiveBorder = (props: InputContainerProps) => {
  return css`
    border: 2px solid ${props.isInvalid ? colors.error : colors.elviaGreen};
    padding: ${props.isCompact ? '0px 3px 0px 7px' : '0px 7px 0px 15px'};
  `;
};

export const InputContainer = styled.div<InputContainerProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: ${(props) => (props.isCompact ? '0px 4px 0px 8px' : '0px 8px 0px 16px')};
  border: 1px solid ${colors.elviaBlack};
  height: ${(props) => (props.isCompact ? '34px' : '48px')};
  border-radius: 4px;
  cursor: text;
  transition: border-color 150ms;

  &:focus-within {
    ${setActiveBorder}
  }

  ${(props) => {
    if (props.isInvalid) {
      return setActiveBorder(props);
    }

    if (props.disabled) {
      return css`
        cursor: not-allowed;
        border-color: ${colors.disabled};
      `;
    }

    if (props.isActive) {
      return setActiveBorder(props);
    }
    return '';
  }}
`;

export const Input = styled.input<Partial<BaseProps>>`
  ${typography.textInput}
  width: 5.4rem;
  min-width: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: inherit;

  &:disabled {
    color: ${colors.disabled};
  }

  ${(props) => {
    if (props.isCompact) {
      return css`
        font-size: 14px;
      `;
    }
    return '';
  }}
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
  transition: background-color 100ms;

  &:not([disabled]):hover {
    background: ${colors.elviaGreen};
  }

  &[disabled] {
    cursor: inherit;
  }
`;
