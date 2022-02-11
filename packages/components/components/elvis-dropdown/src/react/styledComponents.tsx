import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypography } from '@elvia/elvis-typography';

const colors = {
  elviaCharge: getColor('elvia-charge'),
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  elviaFocusOutline: getColor('focus-outline'),
};

const typography = {
  textMdStrong: getTypography('text-md-strong'),
  textMd: getTypography('text-md'),
  textSm: getTypography('text-sm'),
};

export const DropdownWrapper = styled.span`
  display: block;
  position: relative;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  max-width: 448px;
  cursor: ${(props: { isDisabled: boolean }) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  &:focus-within {
    .ewc-dropdown__control {
      border: 2px solid ${colors.elviaCharge};
      padding: 0px;
      outline: 2px solid ${colors.elviaFocusOutline};
      outline-offset: 2px;
    }
  }
`;

export const DropdownLabel = styled.label`
  position: ${(props: { isCompact: boolean }) => props.isCompact && 'absolute'};
  top:${(props: { isCompact: boolean }) => props.isCompact && '-5px'};
  left:${(props: { isCompact: boolean }) => props.isCompact && '8px'};
  background:${(props: { isCompact: boolean }) => props.isCompact && colors.elviaWhite};
  padding${(props: { isCompact: boolean }) => props.isCompact && '0 3px'};
  z-index: ${(props: { isCompact: boolean }) => props.isCompact && '1'};
  display: flex;
  margin-bottom: 4px;
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-weight: 500;
  font-size: ${(props: { isCompact: boolean }) => (props.isCompact ? '10px' : '16px')};
  line-height: ${(props: { isCompact: boolean }) => (props.isCompact ? '10px' : '23px')};
  color: ${colors.elviaBlack};
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

const decideCheckMarkCompactAndSelectedStyle = (isCompact: boolean, isSelecteed: boolean) => {
  if (isCompact && isSelecteed) {
    return `
  background-color: ${colors.elviaCharge};
  &::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -45%;
  height: 39%;
  width: 2px;
  background-color: ${colors.elviaBlack};
  border-radius: 15px;
  transform: translateX(10px) rotate(-45deg);
  transform-origin: [left bottom];
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 40%;
    left: -45%;
    height: 2px;
    width: 80%;
    background-color: ${colors.elviaBlack};
    border-radius: 15px;
    transform: translateX(10px) rotate(-55deg);
    transform-origin: [left bottom];
  }`;
  }
  if (!isCompact && isSelecteed) {
    return `
  background-color: ${colors.elviaCharge};
&::before {
  content: '';
  position: absolute;
  top: 55%;
  left: -9%;
  height: 30%;
  width: 2px;
  background-color: ${colors.elviaBlack};
  border-radius: 15px;
  transform: translateX(8px) rotate(-45deg);
  transform-origin: (left bottom);
  }
&::after {
  content: '';
  position: absolute;
  bottom: 15%;
  left: -4%;
  height: 2px;
  width: 83%;
  background-color: ${colors.elviaBlack};
  border-radius: 15px;
  transform: translateX(10px) rotate(-55deg);
  transform-origin: left bottom;
}`;
  }
  return '';
};

type DropdownCheckboxMarkProps = {
  isCompact: boolean;
  isSelected: boolean;
};

export const DropdownCheckboxMark = styled.span<DropdownCheckboxMarkProps>`
  box-sizing: border-box;
  min-width: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '24px')};
  min-height: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '24px')};
  max-width: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '24px')};
  max-height: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '24px')};
  border-radius: 3px;
  border: 1px solid ${colors.elviaBlack};
  background: ${colors.elviaWhite};
  position: relative;
  ${(props: { isCompact: boolean; isSelected: boolean }) =>
    decideCheckMarkCompactAndSelectedStyle(props.isCompact, props.isSelected)}
`;

export const DropdownCheckboxLabel = styled.span`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-style: normal;
  font-size: ${(props: { isCompact: boolean }) => (props.isCompact ? '14px' : '16px')};
  margin-left: 8px;
  line-height: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px;' : '24px')};
  width: fit-content;
`;
