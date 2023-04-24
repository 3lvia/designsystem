import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const BoxArea = styled.div`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
`;

export const BoxColoredLine = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 4px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: ${getColor('elvia-charge')};
`;

export const BoxTitle = styled.div`
  ${getTypographyCss('title-caps')}
  font-style: normal;
  color: ${getColor('black')};
  margin: 0px;
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
  border: 2px solid ${getColor('grey-05')};
  background: ${getColor('white')};
  text-align: left;
  color: ${getColor('black')};
  padding: 40px;
  @media (max-width: 767px) {
    padding: 24px;
  }
`;
