import styled from 'styled-components';
import { DividerType, DividerTypography } from './elvia-divider';

const ElviaColors = {
  elviaOn: '#ffffff',
  elviaOff: '#000000',
  grey10: '#e9e9e9',
  grey20: '#d3d3d3',
  grey90: '#3B3B3B',
};

const decideBorderColor = (isInverted: boolean, type: string) => {
  if (!isInverted) {
    if (type === 'title') {
      return ElviaColors.elviaOff;
    } else {
      return ElviaColors.grey10;
    }
  } else {
    if (type === 'title') {
      return ElviaColors.elviaOn;
    } else {
      return ElviaColors.grey90;
    }
  }
};

type DividerArea = {
  type: DividerType;
  isInverted: boolean;
};

export const DividerArea = styled.div<DividerArea>`
  display: block;
  margin: 0;
  width: 100%;
  border-bottom: ${(props: { type: string }) => (props.type === 'curved' ? 'none' : '1px solid')};
  border-color: ${(props: { isInverted: boolean; type: string }) =>
    decideBorderColor(props.isInverted, props.type)};
  text-align: left;

  ${(props: { type: string; isInverted: boolean }) =>
    props.type === 'curved' &&
    `height: 4vw;
      position: relative;
      overflow: hidden;
      background-color: inherit;
      &::after {
        content: '';
        border: 2px solid;
        border-color: ${props.isInverted ? ElviaColors.grey90 : ElviaColors.grey20};
        border-radius: 100%;
        position: absolute;
        bottom: 0;
        margin: auto;
        height: 775%;
        width: 150%;
        left: -25%;
      }`};
`;

type DividerTitle = {
  typography: DividerTypography;
  isInverted: boolean;
};

export const DividerTitle = styled.div<DividerTitle>`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 700;
  line-height: ${(props: { typography: string }) => (props.typography === 'medium' ? '28px' : '17px')};
  font-size: ${(props: { typography: string }) => (props.typography === 'medium' ? '30px' : '14px')};
  color: ${(props: { isInverted: boolean }) =>
    props.isInverted ? ElviaColors.elviaOn : ElviaColors.elviaOff};
  text-transform: ${(props: { typography: string }) =>
    props.typography === 'medium' ? 'unset' : 'uppercase'};
  letter-spacing: ${(props: { typography: string }) => (props.typography === 'medium' ? 'unset' : '0.8px')};
  padding-bottom: ${(props: { typography: string }) => (props.typography === 'medium' ? '24px' : '8px')};
  font-style: unset;
  * {
    margin: 0px;
    font-family: 'Red Hat Display', Verdana, sans-serif;
    font-weight: 700;
    line-height: ${(props: { typography: string }) => (props.typography === 'medium' ? '28px' : '17px')};
    font-size: ${(props: { typography: string }) => (props.typography === 'medium' ? '30px' : '14px')};
    color: ${(props: { isInverted: boolean }) =>
      props.isInverted ? ElviaColors.elviaOn : ElviaColors.elviaOff};
    text-transform: ${(props: { typography: string }) =>
      props.typography === 'medium' ? 'unset' : 'uppercase'};
    letter-spacing: ${(props: { typography: string }) => (props.typography === 'medium' ? 'unset' : '0.8px')};
    font-style: unset;
  }
`;
