import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled from 'styled-components';
import { Hr, TertiaryButton } from '../styledComponents';

export const MenuContainer = styled.div`
  background-color: ${getColor('elvia-on')};
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);
`;

export const MenuTitle = styled.div`
  ${getTypographyCss('text-sm-strong')}
  margin-bottom: 8px;
`;

export const AppTitle = styled.h1`
  ${getTypographyCss('title-caps')}
  margin: 0;
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 0 8px;
`;

export const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fafafa;
  grid-row: 1 / -1;
  align-self: center;
`;

export const Username = styled.div`
  ${getTypographyCss('text-sm-strong')}
`;

export const Email = styled.div`
  ${getTypographyCss('text-sm')}
`;

export const MenuHr = styled(Hr)`
  margin: 24px 0 16px;
`;

export const MenuButton = styled(TertiaryButton)`
  margin-left: auto;
  font-weight: 500;
`;
