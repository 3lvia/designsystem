import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled from '@emotion/styled';

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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: ${getThemeColor('brand-accent')};
`;

export const BoxHeading = styled.div`
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
  border-radius: 8px;
  border: 2px solid ${getThemeColor('border-5')};
  background: ${getThemeColor('background-element-4')};
  text-align: left;
  color: ${getThemeColor('text-1')};
  padding: 40px;
  @media (max-width: 767px) {
    padding: 24px;
  }
`;
