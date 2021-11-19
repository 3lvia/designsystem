import styled from 'styled-components';
import * as ElviaColors from '@elvia/elvis-colors';

const colors = {
  elviaCharge: ElviaColors.default['primary-colors']['green'].color,
  elviaOn: ElviaColors.default['primary-colors']['white'].color,
  elviaOff: ElviaColors.default['primary-colors']['black'].color,
  elviaGrey30: ElviaColors.default['grey-colors']['grey-30'].color,
};

export const DropdownWrapper = styled.span`
  display: block;
  position: relative;
  text-align: left;
  box-sizing: border-box;
  cursor: ${(props: { isDisabled: boolean }) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  &:focus-within {
    .ewc-dropdown__control {
      border: 2px solid ${colors.elviaCharge};
      padding: 0px;
      outline: 2px solid #0064fa;
      outline-offset: 2px;
    }
  }
`;

export const DropdownLabel = styled.label`
  position: ${(props: { isCompact: boolean }) => props.isCompact && 'absolute'};
  top:${(props: { isCompact: boolean }) => props.isCompact && '-5px'};
  left:${(props: { isCompact: boolean }) => props.isCompact && '8px'};
  background:${(props: { isCompact: boolean }) => props.isCompact && colors.elviaOn};
  padding${(props: { isCompact: boolean }) => props.isCompact && '0 3px'};
  z-index: ${(props: { isCompact: boolean }) => props.isCompact && '1'};
  display: flex;
  margin-bottom: 4px;
  font-size: ${(props: { isCompact: boolean }) => (props.isCompact ? '10px' : '16px')};
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-weight: 500;
  font-style: unset;
  line-height: ${(props: { isCompact: boolean }) => (props.isCompact ? '10px' : '23px')};
  letter-spacing: unset;
  text-transform: unset;
  color: ${colors.elviaOff};
  text-align: left;
`;

type DropdownIndicatorIcon = {
  isDisabled: boolean;
  isCompact: boolean;
  menuIsOpen: boolean;
};

export const DropdownIndicatorIcon = styled.i<DropdownIndicatorIcon>`
  background-image: ${(props: { isDisabled: boolean }) =>
    !props.isDisabled
      ? `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.389 5.869a1.328 1.328 0 011.878 0L12 15.6l9.733-9.732a1.328 1.328 0 011.878 1.878L13.443 17.915h-.001a2.04 2.04 0 01-2.885 0L.39 7.747a1.328 1.328 0 010-1.878z' fill='black'/%3e%3c/svg%3e")`
      : `url("data:image/svg+xml,%3csvg width='24' height='24' fill='%23BDBDBD' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.389 5.869a1.328 1.328 0 011.878 0L12 15.6l9.733-9.732a1.328 1.328 0 011.878 1.878L13.443 17.915h-.001a2.04 2.04 0 01-2.885 0L.39 7.747a1.328 1.328 0 010-1.878z' fill='%23BDBDBD'/%3e%3c/svg%3e")`};
  height: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '20px')};
  width: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '20px')};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  transform: ${(props: { menuIsOpen: boolean }) => (props.menuIsOpen ? 'rotate(180deg)' : 'none')};
  transition: 'transform 250ms';
`;

export const ErrorMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;
export const ErrorMessageIcon = styled.i`
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='%23EE0701' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)' fill='%23EE0701'%3e%3cpath d='M12 23.999c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5z'/%3e%3cpath d='M16.5 17.249a.743.743 0 01-.53-.22L12 13.06l-3.97 3.97a.744.744 0 01-1.06 0 .752.752 0 010-1.061l3.97-3.97-3.97-3.97a.743.743 0 01-.22-.53c0-.2.078-.389.22-.53a.743.743 0 01.53-.22c.2 0 .389.078.53.22l3.97 3.97 3.97-3.97a.744.744 0 011.06 0c.142.141.22.33.22.53s-.078.389-.22.53l-3.97 3.97 3.97 3.97a.752.752 0 010 1.061.746.746 0 01-.53.219z'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath d='M0 0h24v24H0V0z' fill='%23EE0701'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
  height: 16px;
  width: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
`;
export const ErrorMessageText = styled.span`
  font-family: 'Red Hat Text', Verdana;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
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
  background-color: #000;
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
    background-color: #000;
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
  background-color: #000;
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
  background-color: #000;
  border-radius: 15px;
  transform: translateX(10px) rotate(-55deg);
  transform-origin: left bottom;
}`;
  }
  return '';
};

type DropdownCheckboxMark = {
  isCompact: boolean;
  isSelected: boolean;
};

export const DropdownCheckboxMark = styled.span<DropdownCheckboxMark>`
  box-sizing: border-box;
  min-width: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '24px')};
  min-height: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '24px')};
  max-width: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '24px')};
  max-height: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px' : '24px')};
  border-radius: 3px;
  border: 1px solid ${colors.elviaOff};
  background: #fff;
  position: relative;
  ${(props: { isCompact: boolean; isSelected: boolean }) =>
    decideCheckMarkCompactAndSelectedStyle(props.isCompact, props.isSelected)}
`;

export const DropdownCheckboxLabel = styled.span`
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: ${(props: { isCompact: boolean }) => (props.isCompact ? '14px' : '16px')};
  margin-left: 8px;
  line-height: ${(props: { isCompact: boolean }) => (props.isCompact ? '16px;' : '24px')};
  width: fit-content;
`;
