import styled, { css } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export interface BaseProps {
  isCompact?: boolean;
}

interface DatePickerLabelProps extends BaseProps {
  fullWidth?: boolean;
}

export const FormFieldContainer = styled.label<DatePickerLabelProps>`
  display: inline-block;
  position: relative;
  padding-top: ${(props) => (props.isCompact ? '0.5rem' : '0px')};
  padding-bottom: 1.5rem;
  box-sizing: border-box;
  text-align: left;

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;

      ${FormFieldInput}, ${FormFieldInputContainer} {
        width: 100%;
      }
    `}
`;

interface LabelProps extends BaseProps {
  hasOptionalText?: boolean;
}

export const FormFieldLabel = styled.div<LabelProps>`
  ${getTypographyCss('text-label')}
  margin-bottom: 5px;

  ${(props) => {
    if (props.isCompact) {
      return css`
        font-size: 0.625rem;
        background-color: ${getColor('elvia-on')};
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
  isDisabled?: boolean;
  isActive?: boolean;
  isInvalid?: boolean;
}

const setActiveBorder = (props: InputContainerProps) => {
  return css`
    border: 2px solid ${props.isInvalid ? getColor('error') : getColor('elvia-charge')};
    padding: ${props.isCompact ? '0px 3px 0px 7px' : '0px 7px 0px 15px'};
  `;
};

export const FormFieldInputContainer = styled.div<InputContainerProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: ${(props) => (props.isCompact ? '0px 4px 0px 8px' : '0px 8px 0px 16px')};
  border: 1px solid ${getColor('elvia-off')};
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

    if (props.isDisabled) {
      return css`
        cursor: not-allowed;
        border-color: ${getColor('disabled')};
      `;
    }

    if (props.isActive) {
      return setActiveBorder(props);
    }
    return '';
  }}
`;

export const FormFieldInput = styled.input.attrs(() => ({ type: 'text' }))<Partial<BaseProps>>`
  ${getTypographyCss('text-md')}
  min-width: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: inherit;

  &:disabled {
    color: ${getColor('disabled')};
  }

  ${(props) =>
    props.isCompact &&
    css`
      font-size: 14px;
    `};
`;
