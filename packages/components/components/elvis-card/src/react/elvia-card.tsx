import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ElviaTypography from '@elvia/elvis-typography';

export interface CardProps {
  label?: string;
  description?: string;
  content: string | HTMLElement;
  webcomponent: any;
}

// const colors = {
//   elviaBlack: '#000',
//   elviaWhite: '#fff',
//   elviaCharge: '#29d305',
//   elviaBlue: '#006DDB',
// };

const typography = {
  textMd: ElviaTypography['text-md'],
};

const CardArea = styled.div`
  position: relative;
  display: block;
  width: 152px;
  height: 128px;
  ${typography.textMd}
  color: blue;
  text-align: center;
  border: 1px solid #e9e9e9;
`;

const CardLabel = styled.div`
  color: red;
`;

const CardDescription = styled.div`
  color: green;
`;

const CardContent = styled.div`
  color: yellow;
`;

const Card: FC<CardProps> = ({ label, description, content, webcomponent }) => {
  const cardContent = useRef<HTMLDivElement>(null);
  const cardTitle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (cardContent.current && webcomponent.getSlot('description')) {
      cardContent.current.innerHTML = '';
      cardContent.current.appendChild(webcomponent.getSlot('description'));
    }

    if (cardTitle.current && webcomponent.getSlot('label')) {
      cardTitle.current.innerHTML = '';
      cardTitle.current.appendChild(webcomponent.getSlot('label'));
    }
  }, [webcomponent]);

  return (
    <CardArea>
      {content && <CardContent>{content}</CardContent>}
      {label && <CardLabel>{label}</CardLabel>}
      {description && <CardDescription>{description}</CardDescription>}
    </CardArea>
  );
};

export default Card;
