import styled, { css, keyframes } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

const DEFAULT_FONT_SIZE = 16;
const rem = (px: number) => `${px / DEFAULT_FONT_SIZE}rem`;

const colors = {
  charge: getColor('elvia-charge'),
  white: getColor('white'),
  black: getColor('black'),
  grey80: getColor('grey-80'),
  disabled: getColor('disabled'),
  focusOutline: getColor('focus-outline'),
};

const typography = {
  textMdStrong: getTypographyCss('text-md-strong'),
  textMd: getTypographyCss('text-md'),
  textSm: getTypographyCss('text-sm'),
};

interface DropdownWrapperProps {
  isDisabled?: boolean;
  isFullWidth?: boolean;
}

export const DropdownWrapper = styled.span<DropdownWrapperProps>`
  display: block;
  position: relative;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  padding-top: 8px;
  ${(props) => (props.isFullWidth ? null : 'max-width: 448px')};
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  &:focus-within {
    .ewc-dropdown__control {
      border: 2px solid ${colors.charge};
      padding: 0px;
      outline: 2px solid ${colors.focusOutline};
      outline-offset: 2px;
    }
  }
`;

interface DropdownLabelProps {
  isCompact?: boolean;
}

export const DropdownLabel = styled.label<DropdownLabelProps>`
  position: ${(props) => props.isCompact && 'absolute'};
  top: ${(props) => props.isCompact && '0'};
  left: ${(props) => props.isCompact && '8px'};
  background: ${(props) => props.isCompact && colors.white};
  padding: ${(props) => props.isCompact && '0 3px'};
  z-index: ${(props) => props.isCompact && '1'};
  display: flex;
  margin-bottom: 4px;
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-weight: 500;
  line-height: ${(props) => (props.isCompact ? '10px' : '23px')};
  font-size: ${(props) => (props.isCompact ? rem(10) : rem(16))};
  color: ${colors.black};
  text-align: left;
`;

export const DropdownErrorMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const DropdownErrorMessageText = styled.span`
  ${typography.textSm}
  font-style: normal;
  letter-spacing: 0px;
  text-align: left;
  margin-left: 8px;
  width: 100%;
`;

export const DropdownCheckbox = styled.label`
  display: flex;
  align-items: center;
  width: fit-content;
  box-sizing: border-box;
  text-align: left;
  pointer-events: none;
  outline: none;
  // IE specific
  @media screen and (-ms-high-contrast: none) {
    width: 100%;
  }
`;

const generateCheckmarkBeforeElement = (params: {
  top: string;
  left: string;
  height: string;
  width: string;
  transform: string;
  transformOrigin: string;
  backgroundColor: string;
}) => {
  return css`
    &::before {
      content: '';
      position: absolute;
      top: ${params.top};
      left: ${params.left};
      height: ${params.height};
      width: ${params.width};
      background-color: ${params.backgroundColor};
      border-radius: 15px;
      transform: ${params.transform};
      transform-origin: ${params.transformOrigin};
    }
  `;
};

const generateCheckmarkAfterElement = (params: {
  bottom: string;
  left: string;
  height: string;
  width: string;
  transform: string;
  transformOrigin: string;
  backgroundColor: string;
}) => {
  return css`
    &::after {
      content: '';
      position: absolute;
      bottom: ${params.bottom};
      left: ${params.left};
      height: ${params.height};
      width: ${params.width};
      background-color: ${params.backgroundColor};
      border-radius: 15px;
      transform: ${params.transform};
      transform-origin: ${params.transformOrigin};
    }
  `;
};

const decideCheckMarkCompactAndSelectedStyle = (
  isCompact?: boolean,
  isSelecteed?: boolean,
  isSelectAllWithPartialSelected?: boolean,
  isDisabled?: boolean,
) => {
  // Make compact line for "select all"-option when not everything is selected
  if (isCompact && isSelectAllWithPartialSelected) {
    return css`
      background-color: ${colors.charge};
      ${generateCheckmarkBeforeElement({
        top: 'calc(50% - 1px)',
        left: '-24%',
        height: '2px',
        width: '40%',
        transform: 'translateX(8px)',
        transformOrigin: '(left bottom)',
        backgroundColor: isDisabled ? colors.disabled : colors.black,
      })}
    `;
  }
  // Make normal line for "select all"-option when not everything is selected
  if (!isCompact && isSelectAllWithPartialSelected) {
    return css`
      background-color: ${colors.charge};
      ${generateCheckmarkBeforeElement({
        top: 'calc(50% - 1px)',
        left: '-10%',
        height: '2px',
        width: '50%',
        transform: 'translateX(8px)',
        transformOrigin: '(left bottom)',
        backgroundColor: isDisabled ? colors.disabled : colors.black,
      })}
    `;
  }
  // Make compact checkmark
  if (isCompact && isSelecteed) {
    return css`
      background-color: ${colors.charge};
      ${generateCheckmarkBeforeElement({
        top: '50%',
        left: '-45%',
        height: '39%',
        width: '2px',
        transform: 'translateX(10px) rotate(-45deg)',
        transformOrigin: '[left bottom]',
        backgroundColor: isDisabled ? colors.disabled : colors.black,
      })}
      ${generateCheckmarkAfterElement({
        bottom: '40%',
        left: '-45%',
        height: '2px',
        width: '80%',
        transform: 'translateX(10px) rotate(-55deg)',
        transformOrigin: '[left bottom]',
        backgroundColor: isDisabled ? colors.disabled : colors.black,
      })}
    `;
  }
  // Make normal checkmark
  if (!isCompact && isSelecteed) {
    return css`
      background-color: ${colors.charge};
      ${generateCheckmarkBeforeElement({
        top: '55%',
        left: '-9%',
        height: '30%',
        width: '2px',
        transform: 'translateX(8px) rotate(-45deg)',
        transformOrigin: '(left bottom)',
        backgroundColor: isDisabled ? colors.disabled : colors.black,
      })}
      ${generateCheckmarkAfterElement({
        bottom: '15%',
        left: '-4%',
        height: '2px',
        width: '83%',
        transform: 'translateX(10px) rotate(-55deg)',
        transformOrigin: 'left bottom',
        backgroundColor: isDisabled ? colors.disabled : colors.black,
      })}
    `;
  }
  return css``;
};

interface DropdownCheckboxMarkProps {
  isCompact?: boolean;
  isSelected?: boolean;
  isSelectAllWithPartialSelected?: boolean;
  isDisabled?: boolean;
}

export const DropdownCheckboxMark = styled.span<DropdownCheckboxMarkProps>`
  box-sizing: border-box;
  min-width: ${(props) => (props.isCompact ? '16px' : '24px')};
  min-height: ${(props) => (props.isCompact ? '16px' : '24px')};
  max-width: ${(props) => (props.isCompact ? '16px' : '24px')};
  max-height: ${(props) => (props.isCompact ? '16px' : '24px')};
  border-radius: 3px;
  border: 1px solid ${(props) => (props.isDisabled ? colors.disabled : colors.black)};
  background: ${colors.white};
  position: relative;
  ${(props) =>
    decideCheckMarkCompactAndSelectedStyle(
      props.isCompact,
      props.isSelected,
      props.isSelectAllWithPartialSelected,
      props.isDisabled,
    )}
`;

interface DropdownCheckboxLabelProps {
  isCompact?: boolean;
}

export const DropdownCheckboxLabel = styled.span<DropdownCheckboxLabelProps>`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-style: normal;
  font-size: ${(props) => (props.isCompact ? rem(14) : rem(16))};
  margin-left: 8px;
  line-height: ${(props) => (props.isCompact ? '16px;' : '24px')};
  width: fit-content;
`;

export const DropdownSingleValueOverflowWrapper = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownOptionWithStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

interface DropdownMenuLoadMorebuttonProps {
  isLoading?: boolean;
  isCompact?: boolean;
}

export const DropdownMenuLoadMoreButton = styled.button<DropdownMenuLoadMorebuttonProps>`
  width: 100%;
  height: ${(props) => (props.isCompact ? '32px' : '40px')};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  border: none;
  background: ${colors.white};
  ${(props) =>
    props.isLoading
      ? css`
          cursor: wait;
        `
      : css`
          cursor: pointer;
        `}
`;

export const DropdownMenuLoadMoreButtonContent = styled.span`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  padding-bottom: 2px;

  border-bottom: 2px solid transparent;
  ${DropdownMenuLoadMoreButton}:hover &:not([data-loading='true']) {
    border-color: ${colors.charge};
  }
`;

export const DropdownMenuLoadMoreButtonText = styled.span`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem(14)};
  line-height: 16px;
`;

const spinningKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface DropdownMenuLoadMoreButtonIconProps {
  isLoading?: boolean;
}
export const DropdownMenuLoadMoreButtonIcon = styled.div<DropdownMenuLoadMoreButtonIconProps>`
  ${(props) =>
    props.isLoading &&
    css`
      animation: ${spinningKeyframes} 1s linear infinite;
      animation-direction: reverse;
    `}
`;
