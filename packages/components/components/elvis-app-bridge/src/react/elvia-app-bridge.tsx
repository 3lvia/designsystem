import { newTab } from '@elvia/elvis-assets-icons';
import { ContextMenu } from '@elvia/elvis-context-menu/react';
import { IconWrapper, TertiaryButton } from '@elvia/elvis-toolbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import React, { useState } from 'react';

import { AppIcon } from './AppIcon';
import { AppBridgeProps } from './elvia-app-bridge.types';
import { getLinks } from './getLinks';
import { getActiveApp } from './utils';

export const AppBridge: React.FC<AppBridgeProps> = function ({ className, inlineStyle, targetId, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = getLinks(targetId);
  const activeApp = getActiveApp();

  return (
    <ContextMenu
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      trigger={
        <Tooltip
          trigger={
            <TertiaryButton size={'small'} isActive={isOpen} aria-haspopup="menu" aria-expanded={isOpen}>
              Åpne i
              <IconWrapper icon={newTab} size="xs" />
            </TertiaryButton>
          }
          content={'Åpne målpunktet i en annen applikasjon'}
        />
      }
      content={
        <div>
          <div className="ewc-context-menu__list-group">
            {links
              .filter((link) => !link.url.includes(activeApp))
              .map((link) => (
                <a
                  style={{
                    gap: '16px',
                  }}
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppIcon iconLetters={link.iconInfo.iconLetters} rotation={link.iconInfo.rotation} />
                  {link.name}
                </a>
              ))}
          </div>
        </div>
      }
      className={className}
      style={{ ...inlineStyle }}
      {...rest}
    />
  );
};

export default AppBridge;
