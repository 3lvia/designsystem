import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled from '@emotion/styled';
import React from 'react';

const IconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  overflow: hidden;
  object-fit: fill;
`;

const Icon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const IconLetters = styled.div`
  ${getTypographyCss('text-sm-strong')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getThemeColor('static-white')};

  position: relative;
  height: 100%;
`;

export const AppIcon: React.FC<{
  rotation: number;
  iconLetters: string;
}> = ({ rotation, iconLetters }) => {
  return (
    <IconContainer>
      <Icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          fill="none"
          transform={`rotate(${rotation})`}
        >
          <path fill="#262626" d="M40 20a20 20 0 1 1-40 0 20 20 0 0 1 40 0Z" />
          <path
            fill={getThemeColor('brand-accent')}
            d="M2.9 30.38a126.98 126.98 0 0 1 34.17.04 19.98 19.98 0 0 1-34.17-.04Z"
          />
        </svg>
      </Icon>
      <IconLetters>{iconLetters}</IconLetters>
    </IconContainer>
  );
};
