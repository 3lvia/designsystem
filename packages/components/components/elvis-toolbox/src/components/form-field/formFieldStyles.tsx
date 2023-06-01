import styled, { css } from 'styled-components';

import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { FormFieldError } from './errorStyles';

export type FormFieldSizes = 'small' | 'medium';

const setActiveBorder = (size?: FormFieldSizes) => {
  return css`
    border: 2px solid ${getThemeColor('border-selected-1')};
    padding: ${size === 'small' ? '0 3px 0 7px' : '0 7px 0 15px'};
  `;
};

export const FormFieldInputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px 0 16px;
  color: ${getThemeColor('text-1')};
  border: 1px solid ${getThemeColor('border-1')};
  background: ${getThemeColor('background-element-1')};
  height: 48px;
  border-radius: 4px;
  cursor: text;
  transition: border-color 150ms;
  .e-table && {
    border: 1px solid ${getThemeColor('border-6')};
    background: transparent;
  }
`;

export interface FormFieldContainerProps {
  isFullWidth?: boolean;
  size?: FormFieldSizes;
  isActive?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  hasErrorPlaceholder?: boolean;
}

/**
 *
 * @example
 * <FormFieldContainer size="small" isFullWidth isActive isInvalid isDisabled>
 *   <FormFieldLabel hasOptionalText>Label text</FormFieldLabel>
 *   <FormFieldInputContainer>
 *     <FormFieldInput />
 *   </FormFieldInputContainer>
 * </FormFieldContainer>
 *
 * @since 5.4.0
 */
export const FormFieldContainer = styled.label<FormFieldContainerProps>`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  text-align: left;

  ${({ hasErrorPlaceholder }) =>
    hasErrorPlaceholder &&
    css`
      padding-bottom: 1.5rem;
    `}

  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      width: 100%;

      ${FormFieldInput}, ${FormFieldInputContainer} {
        width: 100%;
      }
    `}

  ${({ size }) => {
    if (size === 'small') {
      return css`
        padding-top: 0.5rem;

        ${FormFieldLabel} {
          font-size: 0.625rem;
          background-color: ${getThemeColor('background-1')};
          position: absolute;
          margin-left: 7px;
          top: 0;
          padding: 0 3px;
          z-index: 1;
          line-height: 100%;
        }

        ${FormFieldInputContainer} {
          padding: 0 4px 0 8px;
          height: 32px;
        }

        ${FormFieldInput} {
          font-size: 0.875rem;
        }

        ${FormFieldError} {
          ${getTypographyCss('text-micro')}
        }
      `;
    }

    return css`
      padding-top: 0;
    `;
  }}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      && ${FormFieldInputContainer} {
         {
          cursor: not-allowed;
          border-color: ${getThemeColor('border-disabled-1')};
        }
      }
    `};

  ${({ isInvalid, size }) =>
    isInvalid &&
    css`
      ${FormFieldInputContainer} {
        ${setActiveBorder(size)};
        border-color: ${getThemeColor('signal-error')};
      }
    `};

  ${({ isActive, size }) =>
    isActive &&
    css`
      ${FormFieldInputContainer} {
        ${setActiveBorder(size)}
      }
    `}

  ${FormFieldInputContainer}:focus-within {
    ${(props) => setActiveBorder(props.size)}
  }
`;

interface LabelProps {
  hasOptionalText?: boolean;
}

export const FormFieldLabel = styled.div<LabelProps>`
  ${getTypographyCss('text-label')}
  margin-bottom: 5px;

  ${(props) =>
    props.hasOptionalText &&
    css`
      &::after {
        content: ' (valgfri)';
        font-weight: 400;
      }
    `}
`;

export const FormFieldInput = styled.input.attrs(() => ({ type: 'text' }))`
  ${getTypographyCss('text-md')}
  min-width: 0;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  cursor: inherit;

  &:disabled {
    color: ${getThemeColor('text-disabled-1')};
  }
`;
