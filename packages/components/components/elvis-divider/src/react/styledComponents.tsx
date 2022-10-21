import styled, { css } from 'styled-components';
import { DividerType, DividerTypography, DividerOrientation } from './elvia-divider.types';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  grey10: getColor('grey-10'),
  grey20: getColor('grey-20'),
  grey90: getColor('grey-90'),
};

const decideBorderColor = (isInverted: boolean, type: DividerType) => {
  if (!isInverted) {
    if (type === 'title') {
      return colors.elviaBlack;
    } else {
      return colors.grey10;
    }
  } else {
    if (type === 'title') {
      return colors.elviaWhite;
    } else {
      return colors.grey90;
    }
  }
};

type DividerAreaProps = {
  type: DividerType;
  isInverted: boolean;
  orientation: DividerOrientation;
};

export const DividerArea = styled.div<DividerAreaProps>`
  display: block;
  margin: 0;
  width: ${(props) => (props.type === 'simple' && props.orientation === 'vertical' ? '1px' : '100%')};
  height: ${(props) =>
    props.type === 'simple' && props.orientation === 'vertical'
      ? '100%'
      : props.type === 'title'
      ? 'unset'
      : '1px'};
  border-left: ${(props) =>
    props.type === 'simple' && props.orientation === 'vertical' ? `1px solid` : 'none'};
  border-bottom: ${(props) =>
    props.type !== 'curved' && props.orientation === 'horizontal' ? `1px solid` : 'none'};
  border-color: ${(props) => decideBorderColor(props.isInverted, props.type)};
  text-align: left;

  ${(props) =>
    props.type === 'curved' &&
    css`
      height: 4vw;
      position: relative;
      overflow: hidden;
      background-color: inherit;
      &::after {
        content: '';
        border: 2px solid;
        border-color: ${props.isInverted ? colors.grey90 : colors.grey20};
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

type DividerTitleProps = {
  typography: DividerTypography;
  isInverted: boolean;
};

export const DividerTitle = styled.div<DividerTitleProps>`
  ${(props) =>
    props.typography === 'medium' ? getTypographyCss('title-md') : getTypographyCss('title-caps')};
  color: ${(props) => (props.isInverted ? colors.elviaWhite : colors.elviaBlack)};
  padding-bottom: ${(props) => (props.typography === 'medium' ? '24px' : '8px')};
  * {
    margin: 0px;
    ${(props) =>
      props.typography === 'medium' ? getTypographyCss('title-md') : getTypographyCss('title-caps')};
    color: ${(props) => (props.isInverted ? colors.elviaWhite : colors.elviaBlack)};
  }
`;
