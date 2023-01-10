import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled from 'styled-components';

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

export const AppLink = styled.a<{ isActive: boolean }>`
  ${getTypographyCss('text-micro')}
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.18s ease;

  ${({ isActive }) => isActive && getTypographyCss('text-micro-strong')};

  &:hover {
    transform: scale(1.1);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;
  object-fit: fill;

  > * {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: scale(0.9);
    background-color: ${getColor('grey-90')};
    border-radius: 50%;
    z-index: 0;
  }
`;
