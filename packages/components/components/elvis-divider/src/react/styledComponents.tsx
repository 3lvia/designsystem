import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DividerOrientation, DividerType, DividerTypography } from './elvia-divider.types';

type DividerAreaProps = {
  type: DividerType;
  orientation: DividerOrientation;
};

export const DividerArea = styled.div<DividerAreaProps>`
  display: block;
  margin: 0;
  width: ${({ type, orientation }) => (type === 'simple' && orientation === 'vertical' ? '1px' : '100%')};
  height: ${({ type, orientation }) =>
    type === 'simple' && orientation === 'vertical' ? '100%' : type === 'heading' ? 'unset' : '1px'};
  border-left: ${({ type, orientation }) =>
    type === 'simple' && orientation === 'vertical' ? `1px solid` : 'none'};
  border-bottom: ${({ type, orientation }) =>
    type !== 'curved' && orientation === 'horizontal' ? `1px solid` : 'none'};
  border-color: ${({ type }) => (type === 'heading' ? getThemeColor('border-1') : getThemeColor('border-2'))};
  text-align: left;

  ${({ type }) =>
    type === 'curved' &&
    css`
      height: 4vw;
      position: relative;
      overflow: hidden;
      background-color: inherit;
      &::after {
        content: '';
        border: 2px solid;
        border-color: ${getThemeColor('border-3')};
        border-radius: 100%;
        position: absolute;
        bottom: 0;
        margin: auto;
        height: 775%;
        width: 150%;
        left: -25%;
      }
    `};
`;

type DividerHeadingProps = {
  typography: DividerTypography;
};

export const DividerHeading = styled.div<DividerHeadingProps>`
  ${({ typography }) =>
    typography === 'medium' ? getTypographyCss('title-md') : getTypographyCss('title-caps')};
  color: ${getThemeColor('text-1')};
  padding-bottom: ${({ typography }) => (typography === 'medium' ? '24px' : '8px')};
  * {
    margin: 0;
    ${({ typography }) =>
      typography === 'medium' ? getTypographyCss('title-md') : getTypographyCss('title-caps')};
    color: ${getThemeColor('text-1')};
  }
`;
