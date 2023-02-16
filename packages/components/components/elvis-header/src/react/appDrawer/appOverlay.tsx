import { Overlay, useFocusTrap } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef, useState } from 'react';
import { AppList } from '../appList/appList';
import { AppListContainer } from './appDrawerStyles';

interface Props {
  onClose: () => void;
}

export const AppOverlay = React.forwardRef<HTMLDivElement, Props>(({ onClose }, ref) => {
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (listContainerRef.current) {
      trapFocus(listContainerRef);
    }
  }, [listContainerRef]);

  useEffect(() => {
    return () => releaseFocusTrap();
  }, []);

  return (
    <Overlay ref={ref} onClose={onClose} startFade={fadeOut}>
      <AppListContainer ref={listContainerRef}>
        <AppList onLinkClick={() => setFadeOut(true)} />
      </AppListContainer>
    </Overlay>
  );
});

AppOverlay.displayName = 'AppOverlayComponent';
