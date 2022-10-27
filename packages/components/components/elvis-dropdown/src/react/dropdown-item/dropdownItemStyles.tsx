import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled from 'styled-components';

interface DropdownItemProps {
  isActive?: boolean;
  isCompact?: boolean;
}

export const DropdownItemStyles = styled.button.attrs(() => ({
  role: 'option',
}))<DropdownItemProps>`
  ${getTypographyCss('text-md')};
  display: flex;
  padding: 10px 16px;
  gap: 16px;
  border: none;
  margin: 0;
  width: 100%;
  background-color: ${(props) => (props.isActive ? getColor('grey-10') : getColor('elvia-on'))};

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      background-color: ${getColor('grey-05')};
    }
  }
`;
