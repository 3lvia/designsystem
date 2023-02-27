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
  background: ${getThemeColor('state-on')};
`;

export const BoxTitle = styled.div`
  ${getTypographyCss('title-caps')}
  font-style: normal;
  color: ${getThemeColor('text-primary')};
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

type BoxContentProps = {
  hasBorder: boolean;
};

export const BoxContent = styled.div<BoxContentProps>`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: ${({ hasBorder }) => (hasBorder ? `1px solid ${getThemeColor('background-accent')}` : 'none')};
  background: ${getThemeColor('background-overlay')};
  text-align: left;
  color: ${getThemeColor('text-primary')};
  padding: 40px;
  @media (max-width: 767px) {
    padding: 24px;
  }
`;
