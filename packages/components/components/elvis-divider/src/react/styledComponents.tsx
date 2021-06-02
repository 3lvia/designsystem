import styled from 'styled-components';

const ElviaColors = {
  elviaOn: '#ffffff',
  elviaOff: '#000000',
  grey10: '#e9e9e9',
  grey20: '#d3d3d3',
  grey80: '#515151',
  grey70: '#676767',
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
      return ElviaColors.grey80;
    }
  }
};

export const DividerArea = styled.div`
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
        border-color: ${props.isInverted ? ElviaColors.grey70 : ElviaColors.grey20};
        border-radius: 100%;
        position: absolute;
        bottom: 0;
        margin: auto;
        height: 775%;
        width: 150%;
        left: -25%;
      }`};
`;

export const DividerTitle = styled.div`
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
`;
