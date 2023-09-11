import React from 'react';
import { appList, getActiveApp, getCurrentDomain } from '../elviaApps';
import { AppListContainer, AppLink, IconContainer, Icon, IconLetters } from './appListStyles';

interface Props {
  onLinkClick?: () => void;
}

export const AppList: React.FC<Props> = ({ onLinkClick }) => {
  const activeUrl = getActiveApp('url');
  const domain = getCurrentDomain();

  return (
    <AppListContainer>
      {appList.map((link) => (
        <AppLink
          href={`https://${link.url}.${domain}`}
          key={link.name}
          $isActive={activeUrl === link.url}
          onClick={onLinkClick}
        >
          <IconContainer>
            <Icon dangerouslySetInnerHTML={{ __html: link.icon }} />
            <IconLetters>{link.iconLetters}</IconLetters>
          </IconContainer>
          {link.name}
        </AppLink>
      ))}
    </AppListContainer>
  );
};
