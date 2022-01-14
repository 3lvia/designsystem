import styled from 'styled-components';
import { DividerType, DividerTypography, DividerOrientation } from './elvia-divider.types';
import { getColor } from '@elvia/elvis-colors';

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

const decideBorderOrientation = (type: DividerType, orientation: DividerOrientation) => {
  if (type === 'simple' && orientation === 'vertical') {
    return 'border-left';
  }
  return 'border-bottom';
};

type DividerAreaProps = {
  type: DividerType;
  isInverted: boolean;
  orientation: DividerOrientation;
};

export const DividerArea = styled.div<DividerAreaProps>`
  display: block;
  margin: 0;
  width: ${(props: { type: DividerType; orientation: DividerOrientation }) =>
    props.type === 'simple' && props.orientation === 'vertical' ? '1px' : '100%'};
  height: ${(props: { type: DividerType; orientation: DividerOrientation }) =>
    props.type === 'simple' && props.orientation === 'vertical'
      ? '100%'
      : props.type === 'title'
      ? 'unset'
      : '1px'};
  ${(props: { type: DividerType; orientation: DividerOrientation }) =>
    decideBorderOrientation(props.type, props.orientation)}: ${(props: { type: DividerType }) =>
    props.type === 'curved' ? 'none' : '1px solid'};
  border-color: ${(props: { isInverted: boolean; type: DividerType }) =>
    decideBorderColor(props.isInverted, props.type)};
  text-align: left;

  ${(props: { type: DividerType; isInverted: boolean }) =>
    props.type === 'curved' &&
    `height: 4vw;
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
      }`};
`;

type DividerTitleProps = {
  typography: DividerTypography;
  isInverted: boolean;
};

export const DividerTitle = styled.div<DividerTitleProps>`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 700;
  line-height: ${(props: { typography: DividerTypography }) =>
    props.typography === 'medium' ? '28px' : '17px'};
  font-size: ${(props: { typography: DividerTypography }) =>
    props.typography === 'medium' ? '30px' : '14px'};
  color: ${(props: { isInverted: boolean }) => (props.isInverted ? colors.elviaWhite : colors.elviaBlack)};
  text-transform: ${(props: { typography: DividerTypography }) =>
    props.typography === 'medium' ? 'unset' : 'uppercase'};
  letter-spacing: ${(props: { typography: DividerTypography }) =>
    props.typography === 'medium' ? 'unset' : '0.8px'};
  padding-bottom: ${(props: { typography: DividerTypography }) =>
    props.typography === 'medium' ? '24px' : '8px'};
  font-style: unset;
  * {
    margin: 0px;
    font-family: 'Red Hat Display', Verdana, sans-serif;
    font-weight: 700;
    line-height: ${(props: { typography: DividerTypography }) =>
      props.typography === 'medium' ? '28px' : '17px'};
    font-size: ${(props: { typography: DividerTypography }) =>
      props.typography === 'medium' ? '30px' : '14px'};
    color: ${(props: { isInverted: boolean }) => (props.isInverted ? colors.elviaWhite : colors.elviaBlack)};
    text-transform: ${(props: { typography: DividerTypography }) =>
      props.typography === 'medium' ? 'unset' : 'uppercase'};
    letter-spacing: ${(props: { typography: DividerTypography }) =>
      props.typography === 'medium' ? 'unset' : '0.8px'};
    font-style: unset;
  }
`;
