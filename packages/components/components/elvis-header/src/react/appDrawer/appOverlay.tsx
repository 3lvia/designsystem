import { Overlay, useFocusTrap } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState } from 'react';
import { AppLink, AppListContainer, Icon, IconContainer, IconLetters } from './appDrawerStyles';
import { appList } from './appList';

interface Props {
  onClose: () => void;
}

export const AppOverlay = React.forwardRef<HTMLDivElement, Props>(({ onClose }, ref) => {
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const listContainerRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [activeUrl, setActiveUrl] = useState('');
  const [domain, setDomain] = useState('elvia.io/');
  const linkItems = appList;

  useEffect(() => {
    if (listContainerRef.current) {
      trapFocus(listContainerRef);
    }
  }, [listContainerRef]);

  useEffect(() => {
    const urlParts = location.href.split('.').reverse();

    // E.g. elvia.io
    if (urlParts[1]) {
      setDomain(`${urlParts[1]}.${urlParts[0]}`);
    }
    setActiveUrl(urlParts[urlParts.length - 1].split('//')[1]);

    return () => releaseFocusTrap();
  }, []);

  return (
    <Overlay ref={ref} onClose={onClose} startFade={fadeOut}>
      <AppListContainer ref={listContainerRef}>
        {linkItems.map((link) => (
          <AppLink
            target="_blank"
            href={`https://${link.url}.${domain}`}
            key={link.name}
            isActive={activeUrl === link.url}
            onClick={() => setFadeOut(true)}
          >
            <IconContainer>
              <Icon dangerouslySetInnerHTML={{ __html: link.icon }} />
              <IconLetters>{link.iconLetters}</IconLetters>
            </IconContainer>
            {link.name}
          </AppLink>
        ))}
      </AppListContainer>
    </Overlay>
  );
});

AppOverlay.displayName = 'AppOverlayComponent';
