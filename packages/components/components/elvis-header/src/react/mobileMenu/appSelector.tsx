import React, { useState } from 'react';
import { IconWrapper } from '@elvia/elvis-toolbox';
import arrowRight from '@elvia/elvis-assets-icons/dist/icons/arrowRightCircleColor';
import arrowRightFilled from '@elvia/elvis-assets-icons/dist/icons/arrowRightCircleFilledColor';
import { AppSelectorTrigger, TextMicro, TextSmallStrong } from './mobileMenuStyles';

interface Props {
  appTitle?: string;
  onClick: () => void;
}

export const AppSelector: React.FC<Props> = ({ appTitle, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AppSelectorTrigger
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <TextSmallStrong>Velg applikasjon</TextSmallStrong>
        <TextMicro>{appTitle}</TextMicro>
      </div>
      <IconWrapper icon={isHovered ? arrowRightFilled : arrowRight} size="sm" />
    </AppSelectorTrigger>
  );
};
