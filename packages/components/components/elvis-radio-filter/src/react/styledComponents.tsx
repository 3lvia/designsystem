import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';

export const RadioFilterGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
`;

interface RadioFilterLabelProps {
  isSelected: boolean;
}

export const RadioFilterLabel = styled.label<RadioFilterLabelProps>`
  display: grid;
  place-items: center;
  border-radius: 32px;
  padding: 4px 12px;
  border: ${({ isSelected }) => `1px solid ${isSelected ? getColor('black') : 'transparent'}`};
  cursor: pointer;
  position: relative;

  &:hover:not(:disabled) {
    border-color: ${({ isSelected }) => `${isSelected ? getColor('black') : getColor('elvia-charge')}`};
  }
  &:focus-within {
    outline: 2px solid ${getColor('focus-outline')};
    outline-offset: 2px;
  }
  white-space: nowrap;
  margin: 0;
`;

export const RadioFilterInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  margin: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 32px;
`;

export const RadioFilterTitle = styled.span`
  font-family: 'Red Hat Display', verdana, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`;
