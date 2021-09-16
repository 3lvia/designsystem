import styled from 'styled-components';

export const colors = {
  elviaCharge: '#29d305',
  elviaOn: '#ffffff',
  elviaOff: '#000000',
  outline: '#0064fa',
};

export const RadioFilterGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const RadioFilterLabel = styled.label`
  border-radius: 32px;
  padding: 4px 12px;
  border: ${(props: { isSelected: boolean }) => (`1px solid ${props.isSelected ? colors.elviaOff : 'transparent'}`)};
  
  &:hover:not(:disabled) {
    cursor: pointer;
    border:${(props: { isSelected: boolean }) => (`1px solid ${props.isSelected ? colors.elviaOff : colors.elviaCharge}`)};
  }
  &:focus-within {
    outline: 2px solid ${colors.outline};
    outline-offset: 2px;
  }
`

export const RadioFilterInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const RadioFilterTitle = styled.div`
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  text-transform: 'unset';
  letter-spacing: 'unset';
  font-style: unset;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
`;
