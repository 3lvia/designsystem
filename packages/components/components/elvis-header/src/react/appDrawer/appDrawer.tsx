import arrowDown from '@elvia/elvis-assets-icons/dist/icons/arrowDown';
import { IconWrapper, useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { useRef } from 'react';

import { TriggerButton } from '../styledComponents';
import { AppTitle, SpinContainer } from './appDrawerStyles';
import { AppOverlay } from './appOverlay';

interface Props {
  appTitle?: string;
}

export const AppDrawer: React.FC<Props> = ({ appTitle }) => {
  const connectedElementRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'left-inside',
    verticalPosition: 'bottom',
    alignWidths: false,
  });

  const toggleAppDrawer = () => {
    setIsShowing((prevIsShowing) => !prevIsShowing);
  };

  return (
    <>
      <TriggerButton isActive={isShowing} ref={connectedElementRef} onClick={() => toggleAppDrawer()}>
        <AppTitle>{appTitle}</AppTitle>
        <SpinContainer rotated={isShowing}>
          <IconWrapper size="xs" icon={arrowDown} />
        </SpinContainer>
      </TriggerButton>
      {isShowing && (
        <AppOverlay
          onClose={() => {
            toggleAppDrawer();
            connectedElementRef.current?.focus();
          }}
          ref={popoverRef}
        />
      )}
    </>
  );
};
