import styled, { css } from 'styled-components';

import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { FormFieldError } from './errorStyles';

const setActiveBorder = (isCompact?: boolean) => {
  return css`
    border: 2px solid ${getColor('elvia-charge')};
    padding: ${isCompact ? '0px 3px 0px 7px' : '0px 7px 0px 15px'};
  `;
};

export const FormFieldInputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0px 8px 0px 16px;
  border: 1px solid ${getColor('elvia-off')};
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
  hasErrorPlaceholder?: boolean;
}

/**
 *
 * @example
 * <FormFieldContainer isCompact isFullWidth isActive isInvalid isDisabled>
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

  ${({ isCompact }) => {
    if (isCompact) {
      return css`
        padding-top: 0.5rem;

        ${FormFieldLabel} {
          font-size: 0.625rem;
          background-color: ${getColor('elvia-on')};
          position: absolute;
          margin-left: 7px;
          top: 0;
          padding: 0 3px;
          z-index: 1;
          line-height: 100%;
        }

        ${FormFieldInputContainer} {
          padding: 0px 4px 0px 8px;
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
      padding-top: 0px;
    `;
  }}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      && ${FormFieldInputContainer} {
         {
          cursor: not-allowed;
          border-color: ${getColor('disabled')};
        }
      }
    `};

  ${({ isInvalid, isCompact }) =>
    isInvalid &&
    css`
      ${FormFieldInputContainer} {
        ${setActiveBorder(isCompact)};
        border-color: ${getColor('error')};
      }
    `};

  ${({ isActive, isCompact }) =>
    isActive &&
    css`
      ${FormFieldInputContainer} {
        ${setActiveBorder(isCompact)}
      }
    `}

  ${FormFieldInputContainer}:focus-within {
    ${(props) => setActiveBorder(props.isCompact)}
  }
`;

export interface LabelProps {
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
    color: ${getColor('disabled')};
  }
`;
