import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { css } from 'styled-components';

export const SpinContainer = styled.div<{ rotated: boolean }>`
  transition: transform 0.2s ease;

  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(180deg);
    `};
`;

export const AppListContainer = styled.div`
  background-color: ${getColor('elvia-on')};
  border-radius: 8px;
  max-height: 80vh;
  overflow: auto;
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 32px 8px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
`;

export const Icon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  filter: grayscale(1) brightness(0.8);
  transition: filter 300ms ease;
  transition-delay: 100ms;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const IconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;
  object-fit: fill;
`;

export const IconLetters = styled.div`
  ${getTypographyCss('text-md-strong')};
  font-size: 18px;
  color: ${getColor('elvis-on')};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  -webkit-text-stroke: 1px ${getColor('elvis-on')};
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
  height: 100%;
`;

export const AppLink = styled.a<{ isActive: boolean }>`
  ${getTypographyCss('text-micro')}
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s ease;

  ${({ isActive }) =>
    isActive &&
    css`
      ${getTypographyCss('text-micro-strong')};

      ${IconLetters} {
        -webkit-text-stroke-width: 0;
        color: ${getColor('elvia-on')};
      }

      ${Icon} {
        filter: none;
      }
    `};

  &:hover {
    transform: scale(1.1);

    ${Icon} {
      filter: none;
    }
  }
`;
