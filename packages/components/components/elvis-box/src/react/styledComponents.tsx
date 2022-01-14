import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypography } from '@elvia/elvis-typography';

const colors = {
  elviaCharge: getColor('elvia-charge'),
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  grey10: getColor('grey-10'),
};

const typography = {
  titleCaps: getTypography('title-caps'),
};

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
  background: ${colors.elviaCharge};
`;

export const BoxTitle = styled.div`
  ${typography.titleCaps}
  font-style: normal;
  color: ${colors.elviaBlack};
  margin: 0px;
  margin-left: 8px;
  margin-bottom: 8px;
  * {
    ${typography.titleCaps}
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
  border: ${(props: { hasBorder: boolean }) => props.hasBorder === true && `1px solid ${colors.grey10}`};
  background: ${colors.elviaWhite};
  text-align: left;
  color: ${colors.elviaBlack};
  padding: 40px;
  @media (max-width: 767px) {
    padding: 24px;
  }
`;
