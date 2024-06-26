import { getShadow, getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Hr } from '../styledComponents';

export const MenuContainer = styled.div`
  background-color: ${getThemeColor('background-overlay-3')};
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  box-shadow: ${getShadow('medium')};
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 0 8px;
`;

export const Username = styled.div`
  ${getTypographyCss('text-sm-strong')}
`;

export const Email = styled.div`
  ${getTypographyCss('text-sm')}
`;

export const MenuHr = styled(Hr)`
  margin-top: 32px;
  margin-bottom: 16px;
`;

export const Footer = styled.div`
  margin-left: auto;
`;

export const ImageContainer = styled.div<{ thumbnail?: boolean }>`
  width: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  grid-column: 1 / 1;
  grid-row: 1 / -1;
  aspect-ratio: 1;

  ${({ thumbnail }) =>
    thumbnail &&
    css`
      width: 32px;
    `};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const DesktopMenuSlot = styled.div`
  :not(:empty) {
    width: 100%;
    margin-top: 32px;
  }
`;
