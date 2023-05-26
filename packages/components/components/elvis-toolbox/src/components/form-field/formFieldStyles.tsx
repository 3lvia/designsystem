import styled, { css } from 'styled-components';

import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { FormFieldError } from './errorStyles';

const setActiveBorder = (isCompact?: boolean, hasSuffix?: boolean) => {
  let paddingValue: string;

  if (isCompact) {
    paddingValue = '0 3px 0 7px';
  } else {
    paddingValue = hasSuffix ? '0 15px' : '0 7px 0 15px';
  }

  return css`
    border: 2px solid ${getThemeColor('border-selected-1')};
    padding: ${paddingValue};
  `;
};

export const FormFieldInputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px 0 16px;
  border: 1px solid ${getThemeColor('text-1')};
  height: 48px;
  border-radius: 4px;
  cursor: text;
  transition: border-color 150ms;
`;

export interface FormFieldContainerProps {
  isFullWidth?: boolean;
  isCompact?: boolean;
  isActive?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  hasSuffix?: boolean;
  hasErrorPlaceholder?: boolean;
}

/**
 *
 * @example
 * <FormFieldContainer isCompact isFullWidth isActive isInvalid isDisabled hasSuffix>
 *   <FormFieldLabel hasOptionalText>Label text</FormFieldLabel>
 *   <FormFieldInputContainer>
 *     <FormFieldInput />
 *     <FormFieldInputSuffixText>Suffix text</FormFieldInputSuffixText>
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

  ${({ hasSuffix, isCompact }) =>
    hasSuffix &&
    css`
      ${FormFieldInputContainer} {
        padding: 0 16px;

        ${isCompact &&
        css`
          gap: 4px;
        `}
      }
    `}

  ${({ isCompact }) => {
    if (isCompact) {
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

      ${FormFieldInputSuffixText} {
        color: ${getThemeColor('text-disabled-1')};
        -webkit-text-fill-color: ${getThemeColor('text-disabled-1')};
      }
    `};

  ${({ isInvalid, isCompact, hasSuffix }) =>
    isInvalid &&
    css`
      ${FormFieldInputContainer} {
        ${setActiveBorder(isCompact, hasSuffix)};
        border-color: ${getThemeColor('signal-error')};
      }
    `};

  ${({ isActive, isCompact, hasSuffix }) =>
    isActive &&
    css`
      ${FormFieldInputContainer} {
        ${setActiveBorder(isCompact, hasSuffix)}
      }
    `}

  ${FormFieldInputContainer}:focus-within {
    ${({ isCompact, hasSuffix }) => setActiveBorder(isCompact, hasSuffix)}
  }
`;

interface LabelProps {
  hasOptionalText?: boolean;
}

export const FormFieldLabel = styled.div<LabelProps>`
  ${getTypographyCss('text-label')}
  margin-bottom: 5px;

  ${({ hasOptionalText }) =>
    hasOptionalText &&
    css`
      &::after {
        content: ' (valgfri)';
        font-weight: 400;
      }
    `}
`;

export const FormFieldInputSuffixText = styled.span`
  ${getTypographyCss('text-micro-light')}
  user-select: none;
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
    -webkit-text-fill-color: ${getThemeColor('text-disabled-1')};
  }
`;
