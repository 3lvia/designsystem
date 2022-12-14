import styled, { css } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

interface TriggerContainerProps {
  overlayIsOpen: boolean;
}

interface PopoverTypographyProps {
  isStringOnly: boolean;
  hasCloseButton: boolean;
}

export const PopoverContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;

export const PopoverContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 32px;
  background-color: ${getColor('elvia-on')};
  color: ${getColor('elvia-off')};
  text-align: left;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  white-space: normal;
`;

export const TriggerContainer = styled.div<TriggerContainerProps>`
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;

  div {
    display: flex;
  }

  ${(props) =>
    props.overlayIsOpen &&
    css`
      z-index: 999999;
    `};
`;

export const PopoverTypography = styled.div<PopoverTypographyProps>`
  ${getTypographyCss('text-sm')}
  ${({ isStringOnly, hasCloseButton }) =>
    isStringOnly &&
    hasCloseButton &&
    css`
      padding-right: 8px;
    `}
`;

export const Heading = styled.h3`
  ${getTypographyCss('text-sm-strong')}
  margin: 0;
  padding: 0;
  padding-bottom: 8px;
  margin-right: 16px;
  text-align: left;
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;
