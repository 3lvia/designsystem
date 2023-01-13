import { Icon } from '@elvia/elvis-icon/react';
import { useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef } from 'react';
import { TriggerButton } from '../styledComponents';
import { SpinContainer, AppTitle } from './appDrawerStyles';
import { AppOverlay } from './appOverlay';

interface Props {
  appTitle?: string;
  onMenuToggle: (isOpen: boolean) => void;
}

export const AppDrawer: React.FC<Props> = ({ appTitle, onMenuToggle }) => {
  const connectedElementRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'left-inside',
    verticalPosition: 'bottom',
    alignWidths: false,
  });

  useEffect(() => {
    onMenuToggle(isShowing);
  }, [isShowing]);

  return (
    <>
      <TriggerButton
        isActive={isShowing}
        data-testid="app-title"
        ref={connectedElementRef}
        onClick={() => setIsShowing(true)}
      >
        <AppTitle>{appTitle}</AppTitle>
        <SpinContainer rotated={isShowing}>
          <Icon size="xs" name="arrowDown" />
        </SpinContainer>
      </TriggerButton>
      {isShowing && (
        <AppOverlay
          onClose={() => {
            setIsShowing(false);
            connectedElementRef.current?.focus();
          }}
          ref={popoverRef}
        />
      )}
    </>
  );
};
