import React from 'react';
import { IconWrapper } from '@elvia/elvis-toolbox';
import arrowRight from '@elvia/elvis-assets-icons/dist/icons/arrowRightCircleColor';
import { AppSelectorTrigger, TextMicro, TextSmallStrong } from './mobileMenuStyles';

interface Props {
  appTitle?: string;
  onClick: () => void;
}

export const AppSelector: React.FC<Props> = ({ appTitle, onClick }) => {
  return (
    <AppSelectorTrigger onClick={onClick}>
      <div>
        <TextSmallStrong>Velg applikasjon</TextSmallStrong>
        <TextMicro>{appTitle}</TextMicro>
      </div>
      <IconWrapper icon={arrowRight} size="sm" />
    </AppSelectorTrigger>
  );
};
