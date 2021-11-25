import styled from 'styled-components';
import ElviaColors from '@elvia/elvis-colors';

const colors = {
  elviaCharge: ElviaColors['primary-colors']['green'].color,
  elviaOff: ElviaColors['primary-colors']['black'].color,
  outline: ElviaColors['internal-colors']['focus-outline'].color,
};

export const RadioFilterGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const RadioFilterLabel = styled.label`
  border-radius: 32px;
  padding: 4px 12px;
  border: ${(props: { isSelected: boolean }) =>
    `1px solid ${props.isSelected ? colors.elviaOff : 'transparent'}`};
  cursor: pointer;

  &:hover:not(:disabled) {
    border: ${(props: { isSelected: boolean }) =>
      `1px solid ${props.isSelected ? colors.elviaOff : colors.elviaCharge}`};
  }
  &:focus-within {
    outline: 2px solid ${colors.outline};
    outline-offset: 2px;
  }
  margin: 0 8px 8px 0;
`;

export const RadioFilterInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const RadioFilterTitle = styled.span`
  font-family: 'Red Hat Display', verdana, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`;
