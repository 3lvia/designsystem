import { getThemeColor } from '@elvia/elvis-colors';
import { device } from '@elvia/elvis-toolbox';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

const borderOffset = '8px';

export const ThemeContainer = styled.fieldset`
  margin-bottom: 32px;
  margin-top: 24px;
  width: 100%;

  @media ${device.gtMobile} {
    margin-top: 32px;
  }
`;

export const ThemeLabel = styled.legend`
  ${getTypographyCss('text-sm-strong')};
  margin-bottom: 8px;
`;

export const ThemeListContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const ThemeButton = styled.button<{ isActive: boolean }>`
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    display: block;
    border: 2px solid ${getThemeColor('border-1')};
    position: absolute;
    top: calc(${borderOffset} / 2 * -1);
    left: calc(${borderOffset} / 2 * -1);
    width: calc(100% + ${borderOffset});
    height: calc(100% + ${borderOffset});
    box-sizing: border-box;
    border: 2px solid ${getThemeColor('border-hover-1')};
    border-radius: calc(8px + ${borderOffset} / 2);
    opacity: 0;
    transform: scale(0.9);
    transition: 0.15s all ease;
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1);
  }

  svg {
    vertical-align: top;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      &::after {
        border-color: ${getThemeColor('border-1')};
        opacity: 1;
        transform: scale(1);
      }
    `}
`;
