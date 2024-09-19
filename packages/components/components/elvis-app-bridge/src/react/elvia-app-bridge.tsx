import { newTab } from '@elvia/elvis-assets-icons';
import { ContextMenu } from '@elvia/elvis-context-menu/react';
import { IconWrapper, TertiaryButton } from '@elvia/elvis-toolbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import React, { useState } from 'react';

import { AppIcon, EmptyIconPlaceholder } from './AppIcon';
import { AppBridgeProps } from './elvia-app-bridge.types';
import { getLinks } from './getLinks';
import { getCurrentApp } from './utils';

export const AppBridge: React.FC<AppBridgeProps> = function ({
  className,
  inlineStyle,
  targetId,
  activeApps,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);

  const links = getLinks(targetId);
  const currentApp = getCurrentApp();

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
              .filter((link) => !link.url.includes(currentApp))
              .filter((link) => !activeApps || activeApps.includes(link.name.toLowerCase()))
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
                  {link.iconInfo ? (
                    <AppIcon iconLetters={link.iconInfo.iconLetters} rotation={link.iconInfo.rotation} />
                  ) : (
                    <EmptyIconPlaceholder />
                  )}
                  {link.name}
                </a>
              ))}
          </div>
        </div>
      }
      className={className}
      inlineStyle={{ ...inlineStyle }}
      {...rest}
    />
  );
};

export default AppBridge;
