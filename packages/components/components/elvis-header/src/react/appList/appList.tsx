import React from 'react';
import { appList, getActiveApp, getCurrentDomain } from '../elviaApps';
import { AppListContainer, AppLink, IconContainer, Icon, IconLetters } from './appListStyles';
import { getThemeColor } from '@elvia/elvis-colors';

interface Props {
  onLinkClick?: () => void;
}

export const AppList: React.FC<Props> = ({ onLinkClick }) => {
  const activeUrl = getActiveApp('url');
  const domain = getCurrentDomain();

  return (
    <AppListContainer>
      {appList.map(({ url, name, rotation, iconLetters }) => (
        <AppLink
          href={`https://${url}.${domain}`}
          key={name}
          isActive={activeUrl === url}
          onClick={onLinkClick}
        >
          <IconContainer>
            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
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
          {name}
        </AppLink>
      ))}
    </AppListContainer>
  );
};
