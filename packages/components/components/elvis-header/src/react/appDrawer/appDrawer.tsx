import { IconWrapper, useConnectedOverlay } from '@elvia/elvis-toolbox';
import React, { useEffect, useRef } from 'react';
import { TriggerButton } from '../styledComponents';
import { SpinContainer, AppTitle } from './appDrawerStyles';
import { AppOverlay } from './appOverlay';
import arrowDown from '@elvia/elvis-assets-icons/dist/icons/arrowDown';

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
        ref={connectedElementRef}
        onClick={() => setIsShowing((prevIsShowing) => !prevIsShowing)}
      >
        <AppTitle>{appTitle}</AppTitle>
        <SpinContainer rotated={isShowing}>
          <IconWrapper size="xs" icon={arrowDown} />
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
