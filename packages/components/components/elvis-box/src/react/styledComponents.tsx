import styled from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const BoxArea = styled.div`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
`;

export const BoxColoredLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: ${getThemeColor('border-selected-1')};
`;

export const BoxTitle = styled.div`
  ${getTypographyCss('title-caps')}
  font-style: normal;
  color: ${getThemeColor('text-1')};
  margin: 0;
  margin-left: 8px;
  margin-bottom: 8px;
  * {
    ${getTypographyCss('title-caps')}
    font-style: normal;
    text-transform: uppercase;
    margin: 0;
  }
`;

export const BoxContent = styled.div`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid ${getThemeColor('border-5')};
  background: ${getThemeColor('background-element-5')};
  text-align: left;
  color: ${getThemeColor('text-1')};
  padding: 40px;
  @media (max-width: 767px) {
    padding: 24px;
  }
`;
