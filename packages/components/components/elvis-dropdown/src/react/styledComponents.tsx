import styled from 'styled-components';

const ElviaColors = {
  elviaCharge: '#29d305',
  elviaOn: '#ffffff',
  elviaOff: '#000000',
};

export const DropdownWrapperTEST = styled.span`
  display: block;
  position: relative;
  text-align: left;
  box-sizing: border-box;
  cursor: ${(props: { isDisabled: boolean }) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  &:focus-within {
    .ewc-dropdown__control {
      border: 2px solid ${ElviaColors.elviaCharge};
      padding: 0px;
      outline: 2px solid #0064fa;
      outline-offset: 2px;
    }
  }
`;
