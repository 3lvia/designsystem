import arrowRight from '@elvia/elvis-assets-icons/dist/icons/arrowRightCircleColor';
import arrowRightFilled from '@elvia/elvis-assets-icons/dist/icons/arrowRightCircleFilledColor';
import { IconWrapper } from '@elvia/elvis-toolbox';
import React, { useState } from 'react';

import { Labels } from '../elviaHeader.types';
import { AppSelectorTrigger, TextMicro, TextSmallStrong } from './mobileMenuStyles';

interface Props {
  labels: Labels;
  appTitle?: string;
  onClick: () => void;
}

export const AppSelector: React.FC<Props> = ({ labels, appTitle, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AppSelectorTrigger
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <TextSmallStrong>{labels.selectAppLabel}</TextSmallStrong>
        <TextMicro>{appTitle}</TextMicro>
      </div>
      <IconWrapper icon={isHovered ? arrowRightFilled : arrowRight} size="sm" />
    </AppSelectorTrigger>
  );
};
