import { Overlay } from '@elvia/elvis-toolbox';
import React, { useEffect, useState } from 'react';
import { AppLink, AppListContainer, ImageContainer } from './appDrawerStyles';
import { appList } from './appList';

interface Props {
  onClose: () => void;
}

export const AppOverlay = React.forwardRef<HTMLDivElement, Props>(({ onClose }, ref) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [activeUrl, setActiveUrl] = useState('');
  const [domain, setDomain] = useState('elvia.io/');
  const linkItems = appList;

  useEffect(() => {
    const urlParts = location.href.split('.').reverse();

    // E.g. elvia.io
    if (urlParts[1]) {
      setDomain(`${urlParts[1]}.${urlParts[0]}`);
    }
    setActiveUrl(() => urlParts[urlParts.length - 1].split('//')[1]);
  }, []);

  return (
    <Overlay ref={ref} onClose={onClose} startFade={fadeOut}>
      <AppListContainer>
        {linkItems.map((link) => (
          <AppLink
            target="_blank"
            href={`https://${link.url}.${domain}`}
            key={link.name}
            isActive={activeUrl === link.url}
            onClick={() => setFadeOut(true)}
          >
            <ImageContainer dangerouslySetInnerHTML={{ __html: link.icon }} />
            {link.name}
          </AppLink>
        ))}
      </AppListContainer>
    </Overlay>
  );
});

AppOverlay.displayName = 'AppOverlayComponent';
